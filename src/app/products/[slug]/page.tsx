import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ProductImage from "@/components/ui/ProductImage";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.shortDescription}
      />
      <section className="py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="rounded-xl overflow-hidden">
              <ProductImage src={product.image} alt={product.name} size="hero" priority />
            </div>
            <p className="mt-3 text-xs text-[var(--muted-foreground)] text-center">
              Representative image. Your own product photography can be uploaded via the admin panel in Phase 2.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Product Highlights
            </h2>
            <ul className="mt-4 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[var(--muted-foreground)]">
                  <Check size={18} className="mt-1 text-brand-gold-600 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {product.hsCode && (
              <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                <strong className="text-[var(--foreground)]">HS Code:</strong>{" "}
                {product.hsCode}
              </p>
            )}

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="font-semibold text-[var(--card-foreground)]">
                Interested in this product?
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Submit an inquiry and our sales team will revert within 24 hours
                with specifications, pricing, and delivery terms.
              </p>
              <Link
                href={`/contact#inquiry`}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-5 py-2.5 font-semibold text-brand-navy-950 hover:bg-brand-gold-400"
              >
                Request Quote
              </Link>
            </div>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-900 dark:text-brand-gold-400"
            >
              <ArrowLeft size={14} /> Back to all products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
