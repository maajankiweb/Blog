import { redirect } from "next/navigation";

export default function ProductRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Gracefully redirect /product/[slug] to /products/[slug] for seamless URL backwards compatibility
  return redirect(`/products`);
}
