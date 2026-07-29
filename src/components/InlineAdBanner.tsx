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
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-primary-container/15 text-primary-container rounded-full border border-primary-container/30">
          SPONSORED
        </span>
        <span className="text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">
          Ad
        </span>
      </div>
      <h4 className="font-extrabold text-on-surface text-base mb-1">{title}</h4>
      <p className="text-on-surface-variant text-xs leading-relaxed mb-3">{description}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-[#e05e00] text-white py-2 px-5 rounded-xl font-bold text-xs transition-all shadow-sm"
      >
        {ctaText} →
      </Link>
    </div>
  );
}
