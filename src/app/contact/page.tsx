import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink, Globe, MessageSquare, Sparkles } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

export const metadata = {
  title: "Contact Us | Maajanki Blog",
  description:
    "Have a question about digital marketing, SEO, WordPress, or online growth? We're here to help. Reach out to Maajanki Blog today.",
};

export default function ContactPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <section className="pt-xl pb-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="max-w-[850px] space-y-md">
          <span className="inline-block py-1.5 px-3.5 bg-primary-container/10 text-primary-container rounded-full text-label-md font-bold uppercase tracking-wider">
            REACH OUT TO US
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-tight font-black">
            Contact <span className="text-gradient-primary">Maajanki Blog</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Have a question about digital marketing, SEO, WordPress, or online growth? <strong>We’re here to help.</strong>
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-md">
        
        {/* Intro Info Banner Box */}
        <div className="mb-xl p-6 md:p-8 bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-sm space-y-4">
          <p className="text-on-surface text-base md:text-lg leading-relaxed">
            Maajanki Blog is built to share practical insights and structured strategies. If you need clarification on an article, want to suggest a topic, or are interested in collaboration, feel free to reach out.
          </p>
          <p className="text-primary font-semibold text-sm md:text-base">
            We value meaningful conversations and constructive feedback. Let’s grow smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            <ContactForm />

            {/* Additional Value Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-4">
              <div className="p-5 bg-surface rounded-xl border border-outline-variant/20 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Collaboration & Contributions</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Interested in contributing content, partnerships, or professional collaboration? Send us a clear message with your proposal, and we’ll review it carefully.
                </p>
              </div>

              <div className="p-5 bg-surface rounded-xl border border-outline-variant/20 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Feedback Matters</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Your feedback helps us improve and create better content. If you have suggestions or ideas for future topics, don’t hesitate to share them.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Info & Social Cards */}
          <aside className="lg:col-span-5 space-y-md">
            <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span>📩 Get in Touch</span>
            </h3>

            <div className="grid grid-cols-1 gap-md">
              {/* Primary Email */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-sm items-start hover:border-primary/40 transition-colors">
                <div className="p-2.5 bg-primary-fixed-dim/20 text-primary rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-md text-on-surface mb-xs">Email Address</h4>
                  <a href="mailto:info@maajankiwebtech.com" className="text-primary font-bold text-sm hover:underline flex items-center gap-xs">
                    info@maajankiwebtech.com <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-on-surface-variant mt-1">Secondary: maajankiweb@gmail.com</p>
                </div>
              </div>

              {/* Website */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-sm items-start hover:border-primary/40 transition-colors">
                <div className="p-2.5 bg-tertiary-fixed/20 text-tertiary rounded-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-md text-on-surface mb-xs">Official Blog</h4>
                  <a href="https://blog.maajankiwebtech.com/" target="_blank" rel="noopener noreferrer" className="text-tertiary font-bold text-sm hover:underline flex items-center gap-xs">
                    blog.maajankiwebtech.com <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Facebook Page */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-sm items-start hover:border-primary/40 transition-colors">
                <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-lg">
                  <FaFacebookF className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-md text-on-surface mb-xs">Facebook Page</h4>
                  <a href="https://www.facebook.com/maajankiwebtech" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-xs">
                    facebook.com/maajankiwebtech <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-sm items-start">
                <div className="p-2.5 bg-secondary-fixed/20 text-secondary rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-md text-on-surface mb-xs">Headquarters</h4>
                  <p className="text-sm text-on-surface-variant font-medium">
                    Bettiah, West Champaran, Bihar - 845438, India
                  </p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">We aim to respond as quickly as possible.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Embedded Google Maps Section */}
        <section className="mt-16 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black text-on-surface tracking-tight">Visit Our Office / Location</h2>
              <p className="text-sm text-on-surface-variant">Find us on Google Maps — Bettiah, West Champaran, Bihar</p>
            </div>
            <a 
              href="https://maps.google.com/?q=Bettiah,West+Champaran,Bihar,845438" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-[380px] rounded-2xl overflow-hidden border-2 border-outline-variant/30 shadow-sm relative bg-surface-variant/20">
            <iframe
              title="Maajanki Web Tech Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56958.82585250493!2d84.47647242099351!3d26.802871180217036!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993354b5df01c9b%3A0xb35a74e5e40e70b3!2sBettiah%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <FaqSection
        faqs={[
          {
            question: "How fast do you respond to messages?",
            answer: "We aim to respond as quickly as possible, usually within 12 to 24 hours during business days.",
          },
          {
            question: "Can I discuss website development & SEO projects?",
            answer: "Yes! Drop us a message or email info@maajankiwebtech.com directly to discuss your digital growth goals.",
          },
          {
            question: "Do you offer guest posting or content collaboration?",
            answer: "Yes, we welcome partnerships, content contributions, and professional collaborations in tech, SEO, and web development.",
          },
        ]}
        title="Frequently Asked Questions"
        description="Quick answers about contacting Maajanki Web Tech."
      />
    </div>
  );
}

