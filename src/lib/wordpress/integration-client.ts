import crypto from "crypto";

const WORDPRESS_URL = process.env.WORDPRESS_URL || "https://cms.maajankiwebtech.com";
const INTEGRATION_SECRET = process.env.WORDPRESS_INTEGRATION_SECRET || "maajanki-integration-secret-change-me";

/**
 * Generate HMAC SHA-256 signature for server-to-server authenticated calls to WordPress
 */
export function generateWordPressSignature(payload: string, timestamp: number): string {
  const data = `${timestamp}.${payload}`;
  return crypto.createHmac("sha256", INTEGRATION_SECRET).update(data).digest("hex");
}

/**
 * Send an authenticated request to /wp-json/maajanki/v1/
 */
export async function sendAuthenticatedToWordPress(
  endpoint: string,
  method: "GET" | "POST" = "POST",
  body?: any
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const payloadString = body ? JSON.stringify(body) : "";
  const signature = generateWordPressSignature(payloadString, timestamp);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-maajanki-timestamp": timestamp.toString(),
    "x-maajanki-signature": signature,
  };

  const res = await fetch(`${WORDPRESS_URL}/wp-json/maajanki/v1${endpoint}`, {
    method,
    headers,
    body: body ? payloadString : undefined,
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
