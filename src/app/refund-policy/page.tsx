import FaqSection, { FAQItem } from "@/components/FaqSection";
import { ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Refund & Cancellation Policy | MJ Digital",
  description:
    "Review our transparent refund policy and satisfaction guarantees for digital products, software starter kits, and engineering services.",
  alternates: { canonical: "/refund-policy" },
};

const refundFaqs: FAQItem[] = [
  {
    question: "Can I get a refund if the source code contains a defect or bug?",
    answer:
      "Yes. If you discover a reproducible technical defect in our codebase that our engineering team cannot resolve or patch within 7 business days, we will issue a full refund.",
  },
  {
    question: "What is the typical turnaround time for approved refunds?",
    answer:
      "Once approved, Razorpay settles refunds directly back to your original payment method (UPI account or Card) within 5 to 7 working days.",
  },
  {
    question: "Are refunds permitted simply due to change of mind?",
    answer:
      "Because our digital products include irrevocable, instant access to complete source code and assets, refunds cannot be granted solely for change of mind. We strongly encourage checking live demos before purchasing.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="badge-brand inline-block">
            TRANSPARENT COMMERCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14213D] tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Our fair, clear commitments regarding digital software products, starter kits, and client satisfaction.
          </p>
        </div>
      </div>

      {/* ── Policy Content ────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-sm leading-relaxed text-gray-700">
        <div className="card-saas p-6 bg-pink-50/50 border-pink-100 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#DC2564] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-[#14213D] text-base">Our Quality Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              We stand firmly behind the technical quality of every codebase, starter kit, and template we publish. If you encounter any technical hurdle or missing file, our engineering desk is on standby to help you get running.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">1. Nature of Digital Goods</h2>
          <p>
            At <strong>MJ Digital</strong>, all items sold on our digital marketplace (Next.js starter kits, Headless WordPress integrations, digital guides, and developer tools) are non-tangible, irrevocable digital goods delivered immediately upon payment clearance.
          </p>
          <p>
            Consequently, once a download link has been accessed or source code downloaded, standard consumer return procedures for physical items do not automatically apply.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">2. Eligible Refund Conditions</h2>
          <p>We honor full refund requests under the following specific circumstances:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Verified Technical Defect:</strong> If the codebase contains a critical bug, missing file, or broken dependency that deviates from product documentation, and our team cannot furnish a working update or fix within <strong>7 business days</strong> of notification.
            </li>
            <li>
              <strong>Accidental Duplicate Purchases:</strong> If you were mistakenly billed twice for the identical product due to a network glitch or duplicate checkout, we will refund the duplicate charge immediately upon verification.
            </li>
            <li>
              <strong>Delivery Failure:</strong> If you did not receive access to the download link or portal within 24 hours of purchase despite valid payment clearance and contacting support.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">3. Non-Refundable Scenarios</h2>
          <p>Refunds will not be approved under the following conditions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>You changed your mind after downloading the complete repository source code.</li>
            <li>Your hosting infrastructure does not meet the clearly documented prerequisites (e.g., required Node.js or WordPress versions).</li>
            <li>You lack the foundational programming proficiency (e.g., React, TypeScript) required to customize the product.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">4. How to Request a Refund</h2>
          <p>
            To submit a refund claim, please email our support team at{" "}
            <a href="mailto:support@maajankiwebtech.com" className="text-[#DC2564] font-bold hover:underline">
              support@maajankiwebtech.com
            </a>{" "}
            within <strong>14 days of purchase</strong> with:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm">
            <li>Your Razorpay Payment ID or WooCommerce Order ID.</li>
            <li>The registered billing email address.</li>
            <li>A concise explanation of the technical failure, including relevant console error logs or screenshots.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">5. Refund Processing Timeline</h2>
          <p>
            Upon review and approval by our technical lead, refunds are initiated via <strong>Razorpay</strong>. The funds will reflect back in your original bank account, credit card, or UPI wallet within <strong>5 to 7 working days</strong> according to your bank&apos;s processing cycle.
          </p>
        </section>
      </main>

      {/* ── FAQs Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F8FC] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Refund &amp; Guarantee FAQs"
            subtitle="Straightforward answers regarding our digital product warranty and returns."
            items={refundFaqs}
          />
        </div>
      </section>
    </div>
  );
}
