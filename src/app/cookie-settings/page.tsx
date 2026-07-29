"use client";

import { useState } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { ShieldCheck, BarChart2, Megaphone, SlidersHorizontal } from "lucide-react";

export default function CookieSettingsPage() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    setPreferences(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookieCategories = [
    {
      id: "necessary",
      icon: ShieldCheck,
      label: "Necessary",
      description:
        "Essential cookies that enable core site functionality such as navigation, security, and session management. These cannot be disabled.",
      locked: true,
      value: true,
      setter: null,
    },
    {
      id: "analytics",
      icon: BarChart2,
      label: "Analytics",
      description:
        "Help us understand how visitors interact with our site by collecting anonymous usage metrics. Used to improve content quality and site performance.",
      locked: false,
      value: analytics,
      setter: setAnalytics,
    },
    {
      id: "marketing",
      icon: Megaphone,
      label: "Marketing",
      description:
        "Allow us to serve relevant content recommendations based on your reading patterns. We never share this data with third-party advertisers.",
      locked: false,
      value: marketing,
      setter: setMarketing,
    },
    {
      id: "preferences",
      icon: SlidersHorizontal,
      label: "Preferences",
      description:
        "Remember your site settings such as display mode, reading preferences, and recently visited topics for a personalised experience.",
      locked: false,
      value: preferences,
      setter: setPreferences,
    },
  ] as const;

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="border-b border-outline-variant/30 py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <span className="inline-block text-primary-container font-label-md text-label-md uppercase tracking-wider font-bold mb-md">
          PRIVACY &amp; DATA
        </span>
        <h1 className="font-display-lg-mobile md:font-headline-lg text-display-lg-mobile md:text-headline-lg text-on-surface mb-sm">
          Cookie Settings
        </h1>
        <p className="text-on-surface-variant max-w-2xl font-body-md text-body-md">
          We use cookies to improve your experience on Editorial. Choose which categories
          you consent to below. Your preferences will be remembered. For details, see our{" "}
          <a href="/privacy-policy" className="text-primary-container hover:underline font-medium">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* ── Cookie Categories ──────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-margin-mobile md:px-0 py-xl space-y-gutter">
        {cookieCategories.map(({ id, icon: Icon, label, description, locked, value, setter }) => (
          <div
            key={id}
            className="bg-surface border border-outline-variant/30 rounded-2xl p-lg flex flex-col sm:flex-row items-start sm:items-center gap-md hover:border-outline-variant/50 transition-all duration-200"
          >
            {/* Icon */}
            <div className="p-3 bg-primary-container/10 text-primary-container rounded-xl shrink-0">
              <Icon className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex-1 space-y-xs">
              <div className="flex items-center gap-sm">
                <h3 className="font-bold text-on-surface text-base">{label}</h3>
                {locked && (
                  <span className="inline-block px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-wide">
                    Always On
                  </span>
                )}
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {description}
              </p>
            </div>

            {/* Toggle */}
            <div className="shrink-0 self-center">
              {locked ? (
                <div
                  className="w-12 h-6 rounded-full bg-primary-container/30 border border-outline-variant/30 flex items-center justify-end pr-0.5 cursor-not-allowed"
                  aria-disabled="true"
                  role="switch"
                  aria-checked={true}
                  aria-label={`${label} cookies — always enabled`}
                >
                  <div className="w-5 h-5 rounded-full bg-primary-container/60" />
                </div>
              ) : (
                <button
                  role="switch"
                  aria-checked={value}
                  aria-label={`Toggle ${label} cookies`}
                  onClick={() => setter && setter((v: boolean) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-container/30 ${
                    value ? "bg-primary-container" : "bg-outline-variant/40"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                      value ? "left-[26px]" : "left-0.5"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* ── Action Buttons ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-md pt-md">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-primary-container text-on-primary px-xl py-4 rounded-full font-bold text-sm hover:bg-[#e05e00] active:scale-[0.98] transition-all duration-200"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto border border-outline-variant/50 text-on-surface px-xl py-4 rounded-full font-bold text-sm hover:border-primary-container/50 hover:text-primary-container transition-all duration-200"
          >
            Accept All
          </button>
        </div>

        {/* ── Save Confirmation ───────────────────────────────── */}
        {saved && (
          <div className="flex items-center gap-sm p-md bg-surface border border-outline-variant/30 rounded-xl">
            <HiCheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm font-medium text-on-surface">
              Your cookie preferences have been saved.
            </p>
          </div>
        )}

        {/* ── Info Note ───────────────────────────────────────── */}
        <div className="flex items-start gap-sm p-md border border-outline-variant/20 rounded-xl bg-surface-container-low">
          <HiXCircle className="h-5 w-5 text-on-surface-variant/60 mt-0.5 shrink-0" />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Necessary cookies are essential for the website to function correctly and
            cannot be disabled. All other categories default to off unless you enable them
            above. Preferences are stored in your browser&apos;s local storage.
          </p>
        </div>
      </div>
    </div>
  );
}
