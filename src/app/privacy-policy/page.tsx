import FaqSection, { FAQItem } from "@/components/FaqSection";
import { Mail, ShieldCheck, Lock, Eye, Cookie, FileText, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | MJ Digital",
  description:
    "Learn how MJ Digital collects, processes, and protects your personal data, transaction records, and analytics across our digital platform.",
  alternates: { canonical: "/privacy-policy" },
};

const privacyFaqs: FAQItem[] = [
  {
    question: "Does MJ Digital sell or monetize user data?",
    answer:
      "No. We never sell, rent, monetize, or trade any customer contact details, browsing logs, or transaction information with any third-party advertisers.",
  },
  {
    question: "How are payment credentials and card details handled?",
    answer:
      "All financial transactions are handled exclusively by PCI-DSS certified payment processors (Razorpay). We never capture, view, or store raw credit/debit card numbers or UPI PINs on our servers.",
  },
  {
    question: "How can I request complete erasure of my personal information?",
    answer:
      "You have the right under applicable data protection regulations to request an export or complete deletion of your customer profile by emailing info@maajankiwebtech.com.",
  },
];

const sections = [
  { id: "overview", label: "1. Overview & Scope" },
  { id: "collection", label: "2. Information We Collect" },
  { id: "payments", label: "3. Payment & Transactions" },
  { id: "cookies", label: "4. Cookies & Web Analytics" },
  { id: "usage", label: "5. How Data Is Used" },
  { id: "security", label: "6. Data Security & Storage" },
  { id: "rights", label: "7. User Rights & Data Erasure" },
  { id: "contact-desk", label: "8. Grievance & Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-3">
            LEGAL COMPLIANCE &amp; TRANSPARENCY
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14213D] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wider">
            Effective Date: May 2026 • MJ Digital
          </p>
        </div>
      </div>

      {/* ── Two-Column Layout ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="bg-[#F7F8FC] border border-gray-200 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-[#14213D] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#DC2564]" />
                <span>Policy Contents</span>
              </p>
              <nav className="space-y-1">
                {sections.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-xs font-medium text-gray-600 hover:text-[#DC2564] hover:bg-white px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Legal Content */}
          <main className="lg:col-span-9 space-y-10 text-sm leading-relaxed text-gray-700">
            {/* Section 1 */}
            <section id="overview" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">1. Overview &amp; Scope</h2>
              <p>
                At <strong>MJ Digital</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we are committed to safeguarding the privacy of visitors, readers, and digital product customers across our website (<strong>blog.maajankiwebtech.com</strong> and associated properties).
              </p>
              <p>
                This Privacy Policy articulates what personal information we collect, how it is utilized to facilitate digital delivery, your legal entitlements, and the stringent security protocols we enforce to protect your confidentiality.
              </p>
            </section>

            {/* Section 2 */}
            <section id="collection" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">2. Information We Collect</h2>
              <p>
                We only collect data strictly necessary to fulfill editorial subscriptions, digital software delivery, and customer inquiries:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Customer Order Details:</strong> Full name, billing email address, phone number, and optional GSTIN submitted during checkout for commercial invoicing.</li>
                <li><strong>Account &amp; License History:</strong> Records of purchased digital assets, license keys generated, and download timestamps.</li>
                <li><strong>Newsletter &amp; Comments:</strong> Email address and names provided when subscribing to weekly technical digests or leaving public article comments.</li>
                <li><strong>Technical Telemetry:</strong> Anonymized IP addresses, browser specifications, and referral pathways to maintain server health and prevent DDoS abuse.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="payments" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">3. Payment &amp; Transactions</h2>
              <p>
                All digital transactions are processed securely through certified third-party payment gateways, notably <strong>Razorpay</strong>.
              </p>
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-gray-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  <strong>Zero-Card Storage Policy:</strong> MJ Digital never captures, handles, or stores sensitive credit/debit card numbers, CVVs, net banking credentials, or UPI PINs. All financial exchanges occur within tokenized, bank-grade encrypted channels.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="cookies" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">4. Cookies &amp; Web Analytics</h2>
              <p>
                We use strictly functional cookies to keep track of your shopping cart contents during checkout and anonymous analytics cookies (Google Analytics / Cloudflare) to observe aggregate traffic trends.
              </p>
              <p>
                You may disable cookies at any time via your browser preferences without losing access to editorial articles, although digital checkout requires session cookies to function properly.
              </p>
            </section>

            {/* Section 5 */}
            <section id="usage" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">5. How Data Is Used</h2>
              <p>Collected information is used strictly to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Instantly deliver purchased source code files, eBooks, and license tokens.</li>
                <li>Generate and dispatch legally compliant GST tax invoices.</li>
                <li>Provide customer and technical troubleshooting regarding digital products.</li>
                <li>Prevent fraudulent transactions and protect platform integrity.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="security" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">6. Data Security &amp; Storage</h2>
              <p>
                We enforce comprehensive 256-bit TLS/SSL encryption across all public endpoints. Access to customer billing records is restricted strictly to authorized administrative personnel through multi-factor authentication.
              </p>
            </section>

            {/* Section 7 */}
            <section id="rights" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">7. User Rights &amp; Data Erasure</h2>
              <p>
                You have the permanent right to review, update, or request the permanent deletion of your customer information from our database. To initiate an audit or erasure request, email our compliance officer.
              </p>
            </section>

            {/* Section 8 */}
            <section id="contact-desk" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">8. Grievance &amp; Contact Desk</h2>
              <p>
                For questions regarding this policy or data processing practices, please contact our compliance desk:
              </p>
              <div className="bg-[#F7F8FC] border border-gray-200 p-5 rounded-2xl space-y-1 text-xs">
                <p className="font-bold text-[#14213D]">Grievance Officer: Ashish Kumar</p>
                <p>MJ Digital</p>
                <p>India</p>
                <p>Email: <a href="mailto:info@maajankiwebtech.com" className="text-[#DC2564] font-bold hover:underline">info@maajankiwebtech.com</a></p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* ── FAQs Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F8FC] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Privacy &amp; Data Protection FAQs"
            subtitle="Common questions regarding privacy rights, cookies, and payment transaction security."
            items={privacyFaqs}
          />
        </div>
      </section>
    </div>
  );
}
