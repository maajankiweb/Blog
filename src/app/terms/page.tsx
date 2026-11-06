import FaqSection, { FAQItem } from "@/components/FaqSection";
import { FileText, ShieldAlert, Scale, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | MJ Digital",
  description:
    "Read the terms, conditions, and licensing agreements governing the use of MJ Digital digital publishing, code starter kits, and software downloads.",
  alternates: { canonical: "/terms" },
};

const termsFaqs: FAQItem[] = [
  {
    question: "What licensing rights are granted with purchased digital templates?",
    answer:
      "All commercial starter kits and templates purchased on Maajanki include a perpetual, non-exclusive license to build unlimited personal and commercial client projects.",
  },
  {
    question: "May I re-distribute or re-sell the raw starter kit source code?",
    answer:
      "No. Re-selling, sublicensing, sharing in public repositories, or repackaging raw templates into competing starter kit products is strictly prohibited under our commercial terms.",
  },
  {
    question: "Are code snippets in blog articles free to use?",
    answer:
      "Yes. Technical snippets and architectural patterns published in our editorial articles are freely available for educational and production implementation under MIT attribution guidelines.",
  },
];

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "ip-licenses", label: "2. Intellectual Property & Licenses" },
  { id: "commercial-use", label: "3. Permitted & Prohibited Uses" },
  { id: "payments-pricing", label: "4. Payments, Pricing & Taxes" },
  { id: "digital-delivery", label: "5. Digital Delivery & Access" },
  { id: "disclaimers", label: "6. Warranty & Limitation of Liability" },
  { id: "jurisdiction", label: "7. Governing Law & Jurisdiction" },
  { id: "contact", label: "8. Contact Information" },
];

export default function TermsPage() {
  return (
    <div className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-3">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14213D] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wider">
            Last Updated: May 2026 • MJ Digital
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
                <span>Agreement Sections</span>
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
            <section id="acceptance" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">1. Acceptance of Terms</h2>
              <p>
                By visiting, browsing, registering for an account, or purchasing digital assets on <strong>blog.maajankiwebtech.com</strong>, you explicitly accept and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these terms, you must refrain from accessing our services or downloading digital products.
              </p>
            </section>

            {/* Section 2 */}
            <section id="ip-licenses" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">2. Intellectual Property &amp; Product Licenses</h2>
              <p>
                All original software, starter kits, documentation, articles, graphic assets, and architectural code authored by <strong>MJ Digital</strong> are protected by Indian and international copyright laws.
              </p>
              <p>
                When you purchase a digital product, you are granted a worldwide, non-exclusive, non-transferable, perpetual commercial license to use the codebase to construct end products for yourself or your paying clients.
              </p>
            </section>

            {/* Section 3 */}
            <section id="commercial-use" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">3. Permitted &amp; Prohibited Uses</h2>
              <div className="space-y-2">
                <p className="font-bold text-[#14213D]">You ARE permitted to:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Use the source code in unlimited commercial client websites or applications.</li>
                  <li>Modify, customize, and extend the codebase to suit your specific project needs.</li>
                  <li>Combine the codebase with other open-source or proprietary libraries.</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <p className="font-bold text-[#DC2564]">You are STRICTLY PROHIBITED from:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Redistributing, sublicensing, reselling, or sharing the raw starter kit source code ZIP files.</li>
                  <li>Publishing the source code in unencrypted public GitHub/GitLab repositories.</li>
                  <li>Creating a competing template marketplace or boilerplate product based on our code.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="payments-pricing" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">4. Payments, Pricing &amp; Taxes</h2>
              <p>
                All prices are stated in Indian Rupees (INR ₹) unless indicated otherwise. Payments are settled securely via <strong>Razorpay</strong> (supporting UPI, Credit/Debit Cards, Net Banking, and Wallets).
              </p>
              <p>
                Applicable Goods and Services Tax (GST) is calculated and disclosed during checkout. Official GST-compliant tax invoices are issued automatically upon payment confirmation.
              </p>
            </section>

            {/* Section 5 */}
            <section id="digital-delivery" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">5. Digital Delivery &amp; Access</h2>
              <p>
                Upon verified payment clearance by Razorpay, digital downloads are provisioned immediately on the order confirmation screen, dispatched to your email, and archived permanently in your <Link href="/my-account" className="text-[#DC2564] font-bold hover:underline">Customer Portal</Link>.
              </p>
            </section>

            {/* Section 6 */}
            <section id="disclaimers" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">6. Warranty &amp; Limitation of Liability</h2>
              <p>
                All software, starter kits, and editorial recommendations are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of any kind.
              </p>
              <p>
                In no event shall MJ Digital or its founder Ashish Kumar be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products.
              </p>
            </section>

            {/* Section 7 */}
            <section id="jurisdiction" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">7. Governing Law &amp; Jurisdiction</h2>
              <p>
                These terms are governed by the laws of India. Any legal dispute or proceeding arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>India</strong>.
              </p>
            </section>

            {/* Section 8 */}
            <section id="contact" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-black text-[#14213D]">8. Contact Information</h2>
              <div className="bg-[#F7F8FC] border border-gray-200 p-5 rounded-2xl space-y-1 text-xs">
                <p className="font-bold text-[#14213D]">MJ Digital</p>
                <p>Operational Headquarters: India</p>
                <p>Support &amp; Legal: <a href="mailto:info@maajankiwebtech.com" className="text-[#DC2564] font-bold hover:underline">info@maajankiwebtech.com</a></p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* ── FAQs Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F8FC] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Terms &amp; Commercial Licensing FAQs"
            subtitle="Understand our transparent digital licensing framework and rights."
            items={termsFaqs}
          />
        </div>
      </section>
    </div>
  );
}
