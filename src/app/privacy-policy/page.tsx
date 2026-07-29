import FaqSection, { FAQItem } from "@/components/FaqSection";
import Link from "next/link";
import { Mail, ShieldCheck, Lock, Eye, Cookie, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Maajanki Blog",
  description:
    "This Privacy Policy explains how Maajanki Blog collects, uses, stores, and protects your personal information when you visit or interact with blog.maajankiwebtech.com.",
};

const privacyFaqs: FAQItem[] = [
  {
    question: "Does Maajanki Blog sell or rent personal information?",
    answer: "No. This Privacy Policy confirms that Maajanki Blog does not sell, rent, or trade your personal information.",
  },
  {
    question: "How long are blog comments and user data stored?",
    answer: "Comments and their metadata are stored indefinitely so follow-up comments can be approved automatically. Registered user profile data is stored as long as the account remains active.",
  },
  {
    question: "How can I request a copy or deletion of my personal data?",
    answer: "You have the right to request a copy or deletion of your personal data by emailing info@maajankiwebtech.com.",
  },
];

const sections = [
  { id: "about", label: "About This Policy" },
  { id: "collect", label: "Information We Collect" },
  { id: "media", label: "Media & Uploads" },
  { id: "cookies", label: "Cookies Policy" },
  { id: "embedded", label: "Embedded Content" },
  { id: "sharing", label: "Data Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "rights", label: "Your Rights" },
  { id: "security", label: "Data Security" },
  { id: "changes", label: "Changes & Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="border-b border-outline-variant/30 py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <span className="inline-block px-3.5 py-1 bg-primary-container/10 text-primary-container rounded-full text-xs font-bold uppercase tracking-wider mb-sm">
          LEGAL & TRANSPARENCY
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-black text-on-surface mb-sm">
          Privacy Policy
        </h1>
        <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">
          Effective Date: May 2026 • Maajanki Blog
        </p>
      </div>

      {/* ── Two-col layout ─────────────────────────────────────── */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col md:flex-row gap-xl">
        {/* Sticky TOC Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-xs p-5 bg-surface-container-low border border-outline-variant/30 rounded-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-on-surface mb-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Policy Index</span>
            </p>
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-xs font-medium text-on-surface-variant hover:text-primary transition-colors duration-200 py-1.5 border-l-2 border-transparent hover:border-primary pl-3"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl space-y-xl">
          {/* Intro Box */}
          <div className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-2xl space-y-4">
            <p className="text-base text-on-surface leading-relaxed">
              This Privacy Policy explains how <strong>Maajanki Blog</strong> collects, uses, stores, and protects your personal information when you visit or interact with <a href="https://blog.maajankiwebtech.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">https://blog.maajankiwebtech.com</a>. By accessing this website, you agree to the terms outlined in this Privacy Policy.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Protecting your data is important to us. This Privacy Policy is designed to provide clear transparency about what information is collected and how it is handled.
            </p>
          </div>

          {/* Section 1: About */}
          <section id="about" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span>About This Privacy Policy</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              This Privacy Policy applies to all visitors, users, and individuals who interact with Maajanki Blog. Whether you read articles, leave comments, or create an account, the practices described here apply to you.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              We aim to collect only the information necessary to operate the website efficiently and securely.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="collect" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              <span>Information We Collect</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              When visitors leave comments on Maajanki Blog, we collect the information entered into the comment form. This may include your name, email address, and website (if provided). In addition, we collect the visitor’s IP address and browser user agent string to help detect spam and maintain security.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              An anonymized string created from your email address, also known as a hash, may be shared with the Gravatar service to determine whether you are using it. If your comment is approved, your profile image may be visible publicly next to your comment.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              If users register on the website, we collect the personal information provided in their profile. This information is used strictly for account management and website functionality.
            </p>
          </section>

          {/* Section 3: Media */}
          <section id="media" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm">
              Media and Uploaded Content
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              If you upload images to Maajanki Blog, you should avoid uploading images that contain embedded location data, such as EXIF GPS information. Visitors may be able to download and extract location data from images published on the website.
            </p>
            <p className="text-on-surface-variant leading-relaxed italic text-sm bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
              This Privacy Policy recommends reviewing your files before uploading them.
            </p>
          </section>

          {/* Section 4: Cookies Policy */}
          <section id="cookies" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm flex items-center gap-2">
              <Cookie className="w-6 h-6 text-primary" />
              <span>Cookies Policy</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              As outlined in this Privacy Policy, Maajanki Blog uses cookies to improve user experience and website functionality.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-on-surface-variant leading-relaxed">
              <li>
                <strong>Comment Cookies:</strong> If you leave a comment, you may choose to save your name, email address, and website in cookies. These cookies are stored for your convenience so that you do not need to re-enter details when posting future comments. These cookies may remain active for up to one year.
              </li>
              <li>
                <strong>Login Cookies:</strong> When visiting the login page, a temporary cookie is set to check if your browser accepts cookies. This cookie contains no personal data and is removed when the browser is closed. Upon logging in, cookies are used to store login details and screen preferences. Login cookies typically last for two days, while display preference cookies may remain for up to one year. Selecting the “Remember Me” option may extend login access for up to two weeks. Logging out removes login cookies.
              </li>
              <li>
                <strong>Article Editing Cookies:</strong> If an article is edited or published, a cookie may be saved in your browser indicating the post ID. This cookie contains no personal information and expires after one day.
              </li>
            </ul>
          </section>

          {/* Section 5: Embedded Content */}
          <section id="embedded" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              <span>Embedded Content from Third-Party Websites</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Articles on Maajanki Blog may include embedded content such as videos, images, or external articles. Embedded content functions as if you visited the third-party website directly.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              These external websites may collect data, use cookies, apply tracking technologies, and monitor interactions with their content. If you are logged into those platforms, your interaction may be tracked according to their respective privacy policies.
            </p>
            <p className="text-on-surface-variant leading-relaxed font-semibold">
              This Privacy Policy does not control third-party websites, and we recommend reviewing their policies separately.
            </p>
          </section>

          {/* Section 6: Data Sharing */}
          <section id="sharing" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm">
              Data Sharing
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              This Privacy Policy confirms that <strong>Maajanki Blog does not sell, rent, or trade your personal information.</strong>
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              However, if you request a password reset, your IP address may be included in the reset email for security purposes. Visitor comments may also be processed through automated spam detection services to maintain website security.
            </p>
          </section>

          {/* Section 7: Data Retention */}
          <section id="retention" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm">
              Data Retention
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Under this Privacy Policy, comments and their metadata are stored indefinitely. This allows us to recognize and approve follow-up comments automatically without unnecessary delays.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              For registered users, personal information provided in user profiles is stored as long as the account remains active. Users can view, edit, or delete their personal information at any time, except for their username. Website administrators may also access and manage this information when necessary.
            </p>
          </section>

          {/* Section 8: Your Rights */}
          <section id="rights" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm">
              Your Rights
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              According to this Privacy Policy, you have the right to request a copy of the personal data we hold about you. You may also request that we delete your personal information.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Please note that certain data may need to be retained for administrative, legal, or security purposes.
            </p>
          </section>

          {/* Section 9: Data Security */}
          <section id="security" className="scroll-mt-24 space-y-md">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              <span>Data Security</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Maajanki Blog takes reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure. While no online platform can guarantee absolute security, we strive to implement best practices to maintain data safety.
            </p>
          </section>

          {/* Section 10: Changes & Contact */}
          <section id="changes" className="scroll-mt-24 space-y-md p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-sm">
              Changes & Contact Information
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes. Updates will be posted on this page with the revised effective date. We encourage visitors to review this Privacy Policy regularly.
            </p>

            <div className="pt-4 space-y-2">
              <p className="font-bold text-on-surface">If you have questions regarding this Privacy Policy or your personal data, contact us at:</p>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Email:</span>
                  <a href="mailto:info@maajankiwebtech.com" className="text-primary font-bold hover:underline">info@maajankiwebtech.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-tertiary" />
                  <span>Website:</span>
                  <a href="https://blog.maajankiwebtech.com/" target="_blank" rel="noopener noreferrer" className="text-tertiary font-bold hover:underline">https://blog.maajankiwebtech.com/</a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FAQ Section */}
      <FaqSection
        faqs={privacyFaqs}
        title="Privacy Policy FAQ"
        description="Frequently asked questions about data collection, cookies, and your privacy rights on Maajanki Blog."
      />
    </div>
  );
}
