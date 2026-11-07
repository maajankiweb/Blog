import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/wordpress/products";
import ProductDetailClient from "./ProductDetailClient";
import { HiChevronRight, HiHome } from "react-icons/hi2";

export const revalidate = 60; // ISR revalidation every 60 seconds

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | MJ Digital",
      description: "The requested digital product could not be found.",
    };
  }

  const title = product.seo?.title || `${product.name} | MJ Digital`;
  const description =
    product.seo?.description ||
    product.plainShortDescription ||
    `Buy ${product.name} with instant download and commercial license.`;
  const canonicalUrl = product.seo?.canonicalUrl || `https://blog.maajankiwebtech.com/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: product.featuredImage,
          width: 800,
          height: 500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.featuredImage],
    },
  };
}

export default async function ProductDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.category === product.category);

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://blog.maajankiwebtech.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://blog.maajankiwebtech.com/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.category,
            item: `https://blog.maajankiwebtech.com/products?category=${encodeURIComponent(product.category)}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: `https://blog.maajankiwebtech.com/products/${product.slug}`,
          },
        ],
      },
      {
        "@type": "Product",
        "@id": `https://blog.maajankiwebtech.com/products/${product.slug}#product`,
        name: product.name,
        description: product.plainShortDescription || product.seo?.description || product.name,
        image: product.featuredImage,
        sku: product.sku || `MJ-${product.id}`,
        category: product.category,
        offers: {
          "@type": "Offer",
          url: `https://blog.maajankiwebtech.com/products/${product.slug}`,
          price: product.numericPrice > 0 ? String(product.numericPrice) : "0",
          priceCurrency: "INR",
          priceValidUntil: "2027-12-31",
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "MJ Digital Digital Agency",
            url: "https://blog.maajankiwebtech.com",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(product.rating || 4.9),
          reviewCount: String(product.reviewsCount || 45),
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 py-8 md:py-12 px-margin-mobile md:px-margin-desktop">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-container-max mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
            <HiHome size={14} />
            <span>Home</span>
          </Link>
          <HiChevronRight size={12} className="text-slate-300" />
          <Link href="/products" className="hover:text-slate-900">
            Products
          </Link>
          <HiChevronRight size={12} className="text-slate-300" />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#DC2564]">
            {product.category}
          </Link>
          <HiChevronRight size={12} className="text-slate-300" />
          <span className="text-slate-400 line-clamp-1 max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Client Interactive Product View */}
        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts.length > 0 ? relatedProducts : allProducts.filter((p) => p.id !== product.id)}
        />
      </div>
    </main>
  );
}
