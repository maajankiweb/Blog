import Link from "next/link";
import Image from "next/image";
import { WPPost, cleanHtmlText } from "@/lib/wordpress";


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
  const excerptText = cleanHtmlText(rawExcerpt).substring(0, 110) + "...";
  const imageAlt = featuredMedia?.alt_text || titleText;

  // Extract category details
  const postCategories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = postCategories[0];
  const categoryName = primaryCategory?.name || "Editorial";

  // Format Date
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col h-full bg-[#140b07] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-[#1f110b]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0d07] to-[#2b140a] flex items-center justify-center p-6 text-center">
            <span className="text-[#ff6b00] font-black text-xl tracking-tighter">EDITORIAL</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-[#0f0a08]/85 backdrop-blur-md text-[#ff6b00] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/10">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/50 font-medium">
            <span>{formattedDate}</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="block">
            <h3 className="font-bold text-lg text-white group-hover:text-[#ff6b00] transition-colors line-clamp-2 leading-snug">
              {titleText}
            </h3>
          </Link>

          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {excerptText}
          </p>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6b00] group-hover:translate-x-1 transition-transform self-start pt-2"
        >
          <span>Read Article</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
