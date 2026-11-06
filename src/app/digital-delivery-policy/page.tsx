import FaqSection, { FAQItem } from "@/components/FaqSection";
import { Zap, DownloadCloud, Clock, CheckCircle2, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Digital Delivery Policy | MJ Digital",
  description:
    "Learn how digital products, Next.js starter kits, source code archives, and commercial license keys are delivered instantly after checkout.",
  alternates: { canonical: "/digital-delivery-policy" },
};

const deliveryFaqs: FAQItem[] = [
  {
    question: "How long does it take to receive my downloaded software files?",
    answer:
      "Digital delivery is 100% automated and instantaneous. The moment your Razorpay payment clears, your download link is activated on-screen and emailed to you immediately.",
  },
  {
    question: "What if I lose my downloaded files or my laptop crashes?",
    answer:
      "You have lifetime access. Simply navigate to /my-account, input your checkout billing email, and re-download your files and license keys whenever you need.",
  },
  {
    question: "Do you ship physical media or DVDs?",
    answer:
      "No. All our starter kits, headless codebases, and digital assets are distributed strictly electronically over encrypted cloud channels.",
  },
];

export default function DigitalDeliveryPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="badge-brand inline-block">
            INSTANT FULFILLMENT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14213D] tracking-tight">
            Digital Delivery Policy
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Everything you need to know about our automated electronic delivery pipeline, file access, and perpetual updates.
          </p>
        </div>
      </div>

      {/* ── Main Policy Content ────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-sm leading-relaxed text-gray-700">
        {/* Delivery Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-saas p-6 space-y-2 text-center">
            <Zap className="w-8 h-8 text-[#DC2564] mx-auto" />
            <h3 className="font-bold text-[#14213D] text-base">Instant Delivery</h3>
            <p className="text-xs text-gray-500">
              Zero waiting time. Automated download keys are generated in under 3 seconds upon payment.
            </p>
          </div>

          <div className="card-saas p-6 space-y-2 text-center">
            <DownloadCloud className="w-8 h-8 text-blue-600 mx-auto" />
            <h3 className="font-bold text-[#14213D] text-base">Permanent Access</h3>
            <p className="text-xs text-gray-500">
              Re-download any purchased version from your Customer Account anytime at no extra cost.
            </p>
          </div>

          <div className="card-saas p-6 space-y-2 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-[#14213D] text-base">Verified &amp; Safe</h3>
            <p className="text-xs text-gray-500">
              All ZIP packages are cryptographically signed, virus-scanned, and packaged directly by our core team.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">1. Delivery Mode &amp; Channels</h2>
          <p>
            All products on <strong>MJ Digital</strong> are digital goods (Next.js starter kits, plugins, documentation, architectural blueprints). No physical CDs, USB drives, or paper manuals are mailed.
          </p>
          <p>Upon completed payment, digital assets are delivered via three simultaneous channels:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Instant Confirmation Screen:</strong> Immediate one-click download buttons appear right on your screen upon successful Razorpay transaction.</li>
            <li><strong>Automated Email Dispatch:</strong> An order confirmation email containing your direct download links and license key is sent immediately to your billing email.</li>
            <li><strong>Customer Portal:</strong> All assets are permanently accessible in your dashboard at <Link href="/my-account" className="text-[#DC2564] font-bold hover:underline">/my-account</Link>.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">2. Delivery Fees &amp; Taxes</h2>
          <p>
            Because all products are delivered electronically over high-speed content delivery networks (CDNs), there are <strong>zero shipping, handling, or logistics charges</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">3. What to Do If You Did Not Receive Your Files</h2>
          <p>
            If you completed payment but cannot locate your download links within 10 minutes:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Check your email Spam or Promotions folders for messages from <em>info@maajankiwebtech.com</em>.</li>
            <li>Visit our self-service <Link href="/my-account" className="text-[#DC2564] font-bold hover:underline">Customer Portal</Link> and enter your checkout email address.</li>
            <li>If still unresolved, message our team directly via WhatsApp at <strong>+91 90065 43913</strong> or email support with your payment receipt. We will manually dispatch your files within 2 to 4 hours.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[#14213D]">4. Lifetime Updates Included</h2>
          <p>
            Purchasers of our commercial starter templates receive access to future minor version updates and security patches released for that product generation at zero additional cost.
          </p>
        </section>
      </main>

      {/* ── FAQs Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F8FC] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Digital Delivery FAQs"
            subtitle="Clear explanations regarding electronic delivery timelines, file formats, and recovery."
            items={deliveryFaqs}
          />
        </div>
      </section>
    </div>
  );
}
