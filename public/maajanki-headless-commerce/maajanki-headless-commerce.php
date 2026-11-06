<?php
/**
 * Plugin Name: Maajanki Headless Commerce Integration
 * Plugin URI: https://maajankiwebtech.com/
 * Description: Secure REST API bridge connecting Next.js headless frontend with WooCommerce digital products, orders, Razorpay payments, and on-demand cache revalidation.
 * Version: 1.0.0
 * Author: Ashish Kumar (Maajanki Web Tech LLP)
 * Author URI: https://blog.maajankiwebtech.com/
 * License: GPL v2 or later
 * Text Domain: maajanki-commerce
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Maajanki_Headless_Commerce {

    const NAMESPACE = 'maajanki/v1';
    const SECRET_OPTION = 'maajanki_integration_secret';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
        add_action('woocommerce_order_status_completed', [$this, 'on_order_completed'], 10, 1);
        add_action('save_post', [$this, 'on_content_save'], 10, 3);
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);
    }

    /**
     * Admin Settings Menu
     */
    public function add_admin_menu() {
        add_options_page(
            'Maajanki Headless Commerce',
            'Headless Commerce',
            'manage_options',
            'maajanki-headless-commerce',
            [$this, 'render_settings_page']
        );
    }

    public function register_settings() {
        register_setting('maajanki_settings_group', self::SECRET_OPTION);
    }

    public function render_settings_page() {
        $secret = get_option(self::SECRET_OPTION, '');
        ?>
        <div class="wrap">
            <h1>Maajanki Headless Commerce Settings</h1>
            <p>Configure shared secret keys for authenticated communication with your Next.js frontend.</p>
            <form method="post" action="options.php">
                <?php settings_fields('maajanki_settings_group'); ?>
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Integration Secret (HMAC)</th>
                        <td>
                            <input type="password" name="<?php echo esc_attr(self::SECRET_OPTION); ?>" value="<?php echo esc_attr($secret); ?>" class="regular-text" />
                            <p class="description">Must match <code>WORDPRESS_INTEGRATION_SECRET</code> in Next.js <code>.env.local</code>.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register REST API Routes under /wp-json/maajanki/v1/
     */
    public function register_routes() {
        // Create pending order with server-side price validation
        register_rest_route(self::NAMESPACE, '/checkout/orders', [
            'methods' => 'POST',
            'callback' => [$this, 'handle_create_order'],
            'permission_callback' => [$this, 'verify_request_signature'],
        ]);

        // Complete verified order (after Razorpay payment verification)
        register_rest_route(self::NAMESPACE, '/checkout/orders/(?P<id>\d+)/complete', [
            'methods' => 'POST',
            'callback' => [$this, 'handle_complete_order'],
            'permission_callback' => [$this, 'verify_request_signature'],
        ]);

        // Get single order status & authorized download links
        register_rest_route(self::NAMESPACE, '/orders/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'handle_get_order'],
            'permission_callback' => [$this, 'verify_request_signature'],
        ]);
    }

    /**
     * Verify HMAC SHA-256 Request Signature to prevent replay & forgery attacks
     */
    public function verify_request_signature($request) {
        $secret = get_option(self::SECRET_OPTION, '');
        if (empty($secret)) {
            // If secret is not set yet in WP settings, allow request if user has manage_woocommerce capability
            return current_user_can('manage_woocommerce');
        }

        $signature = $request->get_header('x-maajanki-signature');
        $timestamp = $request->get_header('x-maajanki-timestamp');

        if (empty($signature) || empty($timestamp)) {
            return new WP_Error('missing_signature', 'Authentication headers missing', ['status' => 401]);
        }

        // Prevent replay attacks older than 5 minutes (300 seconds)
        if (abs(time() - intval($timestamp)) > 300) {
            return new WP_Error('timestamp_expired', 'Request timestamp expired', ['status' => 401]);
        }

        $payload = $timestamp . '.' . $request->get_body();
        $expected_signature = hash_hmac('sha256', $payload, $secret);

        if (!hash_equals($expected_signature, $signature)) {
            return new WP_Error('invalid_signature', 'Invalid request signature', ['status' => 401]);
        }

        return true;
    }

    /**
     * Create Pending WooCommerce Order with Authoritative Prices
     */
    public function handle_create_order($request) {
        if (!function_exists('wc_create_order')) {
            return new WP_Error('wc_missing', 'WooCommerce is not active', ['status' => 500]);
        }

        $params = $request->get_json_params();
        $customer = $params['customer'] ?? [];
        $items = $params['items'] ?? [];

        if (empty($customer['email']) || empty($items) || !is_array($items)) {
            return new WP_Error('invalid_data', 'Customer email and line items are required', ['status' => 400]);
        }

        $order = wc_create_order();

        // Server-side authoritative price reconstruction (Never trust client prices)
        foreach ($items as $item) {
            $product_id = intval($item['id'] ?? 0);
            $quantity = max(1, intval($item['quantity'] ?? 1));
            $product = wc_get_product($product_id);

            if ($product && $product->is_purchasable()) {
                $order->add_product($product, $quantity);
            }
        }

        // Set Customer Details
        $order->set_address([
            'first_name' => sanitize_text_field($customer['fullName'] ?? ''),
            'email'      => sanitize_email($customer['email'] ?? ''),
            'phone'      => sanitize_text_field($customer['phone'] ?? ''),
            'company'    => sanitize_text_field($customer['company'] ?? ''),
        ], 'billing');

        $order->set_payment_method('razorpay');
        $order->set_payment_method_title('Razorpay (UPI, Cards, Netbanking)');
        $order->calculate_totals();
        $order->update_status('pending', 'Order initiated via Next.js headless checkout.');

        return rest_ensure_response([
            'success'   => true,
            'order_id'  => $order->get_id(),
            'order_key' => $order->get_order_key(),
            'total'     => floatval($order->get_total()),
            'currency'  => $order->get_currency(),
        ]);
    }

    /**
     * Complete Order after Razorpay Verification
     */
    public function handle_complete_order($request) {
        $order_id = intval($request['id']);
        $params = $request->get_json_params();
        $payment_id = sanitize_text_field($params['razorpay_payment_id'] ?? '');

        $order = wc_get_order($order_id);
        if (!$order) {
            return new WP_Error('not_found', 'Order not found', ['status' => 404]);
        }

        if ($order->is_paid()) {
            return rest_ensure_response(['success' => true, 'message' => 'Order already completed']);
        }

        // Store payment metadata idempotently
        $order->update_meta_data('_razorpay_payment_id', $payment_id);
        $order->payment_complete($payment_id);
        $order->add_order_note('Payment verified via Next.js Razorpay Server Integration. Payment ID: ' . $payment_id);

        return rest_ensure_response([
            'success'   => true,
            'order_id'  => $order->get_id(),
            'status'    => $order->get_status(),
            'downloads' => $this->get_order_downloads($order),
        ]);
    }

    /**
     * Get Order Details & Secure Download Links
     */
    public function handle_get_order($request) {
        $order_id = intval($request['id']);
        $order = wc_get_order($order_id);

        if (!$order) {
            return new WP_Error('not_found', 'Order not found', ['status' => 404]);
        }

        return rest_ensure_response([
            'order_id'   => $order->get_id(),
            'status'     => $order->get_status(),
            'total'      => $order->get_total(),
            'currency'   => $order->get_currency(),
            'date'       => $order->get_date_created()->format('c'),
            'downloads'  => $order->is_paid() ? $this->get_order_downloads($order) : [],
        ]);
    }

    private function get_order_downloads($order) {
        $downloads = [];
        if (function_exists('wc_get_customer_available_downloads')) {
            $raw_downloads = $order->get_downloadable_items();
            foreach ($raw_downloads as $d) {
                $downloads[] = [
                    'download_id'   => $d['download_id'],
                    'product_name'  => $d['product_name'],
                    'download_name' => $d['download_name'],
                    'download_url'  => $d['download_url'],
                    'downloads_remaining' => $d['downloads_remaining'],
                    'access_expires'      => $d['access_expires'],
                ];
            }
        }
        return $downloads;
    }

    /**
     * Fire Next.js Webhook on Content Update / Publish
     */
    public function on_content_save($post_id, $post, $update) {
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }

        $tag = ($post->post_type === 'product') ? 'products' : 'wordpress';
        $webhook_url = 'https://blog.maajankiwebtech.com/api/revalidate?secret=maajanki-revalidate-secret&tag=' . $tag . '&slug=' . $post->post_name;

        wp_remote_get($webhook_url, [
            'timeout'  => 5,
            'blocking' => false, // Non-blocking asynchronous dispatch
        ]);
    }

    public function on_order_completed($order_id) {
        // Trigger customer email notification automatically via WooCommerce Core
    }
}

new Maajanki_Headless_Commerce();
