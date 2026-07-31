import FaqSection, { FAQItem } from "@/components/FaqSection";


export const metadata = {
  title: "Terms of Service | Maajanki",
  description: "Terms and conditions governing the use of Maajanki blog platform.",
};

const termsFaqs: FAQItem[] = [
  {
    question: "Can I quote articles or code snippets in my own blog or documentation?",
    answer:
      "Yes, brief excerpts up to 200 words and code snippets are allowed provided you include clear attribution and a backlink.",
  },
  {
    question: "What guidelines govern user comments on Maajanki?",
    answer:
      "Comments must remain respectful and relevant. We reserve the right to remove spam, offensive remarks, or promotional self-links.",
  },
  {
    question: "Are code examples guaranteed for production stability?",
    answer:
      "Code snippets are provided for educational purposes 'as-is' without express warranty.",
  },
  {
    question: "Who owns the copyright to user-submitted comments?",
    answer:
      "You retain ownership of your submitted comment text, but grant Editorial a non-exclusive license to display it publicly.",
  },
];

const sections = [
  { id: "ip-rights", label: "Intellectual Property Rights" },
  { id: "comments", label: "User Comments" },
  { id: "disclaimer", label: "Disclaimer of Liability" },
  { id: "contact-desk", label: "Contact Desk" },
];

export default function TermsPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="border-b border-outline-variant/30 py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <span className="inline-block text-primary-container font-label-md text-label-md uppercase tracking-wider font-bold mb-md">
          LEGAL
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-sm">
          Terms of Service
        </h1>
        <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">
          Last Updated: July 12, 2026
        </p>
      </div>

      {/* ── Two-col layout ─────────────────────────────────────── */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col md:flex-row gap-xl">
        {/* Sticky TOC Sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-24 space-y-xs">
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-sm">
              Contents
            </p>
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-sm text-on-surface-variant hover:text-primary-container transition-colors duration-200 py-1 border-l-2 border-transparent hover:border-primary-container pl-3"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl space-y-xl">
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Welcome to Maajanki. By accessing our website, you agree to comply with and
            be bound by the following terms and conditions of use.
          </p>

          <section id="ip-rights" className="scroll-mt-24 space-y-md">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm">
              1. Intellectual Property Rights
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Unless otherwise stated, Maajanki and/or its licensors own the intellectual
              property rights for all content, logo graphics, design layouts,
              and technical analyses published on this website. All intellectual property
              rights are reserved.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              You may access this for your own personal use subjected to restrictions set
              in these terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>You must not republish material from Maajanki without attribution.</li>
              <li>You must not sell, rent, or sub-license material from Maajanki.</li>
              <li>
                You must not reproduce, duplicate, or copy content for commercial use.
              </li>
            </ul>
          </section>

          <section id="comments" className="scroll-mt-24 space-y-md">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm">
              2. User Reflections and Comments
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Parts of this website offer an opportunity for users to post and exchange
              opinions and information (&ldquo;Comments&rdquo;). Maajanki does not
              filter, edit, publish, or review Comments prior to their appearance on the
              website. Comments do not reflect the views and opinions of Maajanki, its
              agents, or affiliates.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              We reserve the right to monitor all Comments and to remove any Comments
              which can be considered inappropriate, offensive, or causes a breach of
              these Terms.
            </p>
          </section>

          <section id="disclaimer" className="scroll-mt-24 space-y-md">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm">
              3. Disclaimer of Liability
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              The information on this website is provided &ldquo;as is&rdquo;, with all
              faults, and Maajanki makes no express or implied representations or
              warranties of any kind related to this website or the materials contained on
              this website. We do not warrant its completeness or accuracy.
            </p>
          </section>

          <section id="contact-desk" className="scroll-mt-24 space-y-md">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm">
              4. Contact Desk
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              If you have any queries regarding any of our terms, please contact us at{" "}
              <a
                href="mailto:maajankiweb@gmail.com"
                className="text-primary-container hover:underline font-medium"
              >
                maajankiweb@gmail.com
              </a>
              .
            </p>
          </section>
        </main>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <FaqSection
        faqs={termsFaqs}
        title="Terms &amp; Usage FAQ"
        description="Common questions about content usage rights, licensing, and comment policies."
      />
    </div>
  );
}
