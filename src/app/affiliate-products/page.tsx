import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAffiliateProducts, WPAffiliateProduct } from "@/lib/wordpress";
import AffiliateClientPage from "@/app/affiliate-products/AffiliateClientPage";

export const metadata: Metadata = {
  title: "Affiliate Products & Exclusive Deals | Maajanki WebTech",
  description:
    "Explore top hand-picked WordPress plugins, hosting, web development tools, AI software, and exclusive affiliate discounts curated by Maajanki WebTech.",
  openGraph: {
    title: "Affiliate Products & Deals | Maajanki WebTech",
    description:
      "Save big on premium hosting, WordPress themes, SEO software, and AI productivity tools.",
    type: "website",
  },
};

export default async function AffiliateProductsPage() {
  const initialProducts: WPAffiliateProduct[] = await getAffiliateProducts();

  return (
    <main className="min-h-screen bg-[#090503] text-white">
      <AffiliateClientPage initialProducts={initialProducts} />
    </main>
  );
}
