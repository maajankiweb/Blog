import Link from "next/link";

interface InlineAdBannerProps {
  href: string;
  title: string;
  description: string;
  ctaText: string;
}

export default function InlineAdBanner({
  href,
  title,
  description,
  ctaText,
}: InlineAdBannerProps) {
  return (
    <div className="my-10 p-6 bg-surface border-2 border-primary-container/20 rounded-2xl shadow-sm not-prose">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#DC2564]/10 text-[#DC2564] rounded-full border border-[#DC2564]/20">
          SPONSORED
        </span>
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Ad
        </span>
      </div>
      <p className="font-extrabold text-slate-900 text-base mb-1">{title}</p>
      <p className="text-slate-600 text-xs leading-relaxed mb-3">{description}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center justify-center gap-2 bg-[#DC2564] hover:bg-[#b01e4f] text-white py-2 px-5 rounded-xl font-bold text-xs transition-all shadow-sm"
      >
        {ctaText} →
      </Link>
    </div>
  );
}
