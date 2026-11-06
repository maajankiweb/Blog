import Link from "next/link";
import Image from "next/image";
import { WPPost, cleanHtmlText } from "@/lib/wordpress";
import { HiArrowRight } from "react-icons/hi2";

interface BlogCardProps {
  post: WPPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  // Extract featured image from _embedded
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url;
  const rawTitle = post.title?.rendered || "";
  const titleText = cleanHtmlText(rawTitle);

  const rawExcerpt = post.excerpt?.rendered || "";
  const excerptText = cleanHtmlText(rawExcerpt).substring(0, 115) + "...";
  const imageAlt = featuredMedia?.alt_text || titleText;

  // Extract category details
  const postCategories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = postCategories[0];
  const categoryName = primaryCategory?.name || "Dispatch";

  // Format Date
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-300 transition-all duration-200 hover:shadow-md hover:-translate-y-1 text-slate-900">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center p-6 text-center">
            <span className="text-slate-400 font-bold text-sm tracking-wider uppercase">MAAJANKI</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-[#DC2564] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-slate-200/60 shadow-xs">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span suppressHydrationWarning>{formattedDate}</span>
            <span>·</span>
            <span>5 min read</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="block">
            <h3 className="font-bold text-base md:text-lg text-slate-900 group-hover:text-[#DC2564] transition-colors line-clamp-2 leading-snug">
              {titleText}
            </h3>
          </Link>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2">
            {excerptText}
          </p>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2564] group-hover:translate-x-1 transition-transform self-start pt-2"
        >
          <span>Read Dispatch</span>
          <HiArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
