import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ProductImage from "@/components/ui/ProductImage";
import { products, productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore Swaranbharat Exportsarathi's product range — spices, agri-commodities, textiles, handicrafts, marble & granite, packaged goods and more. Custom sourcing available.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Premium Indian Products for Global Markets"
        description="Curated from verified manufacturers across India, every product is quality-checked, compliance-ready, and export-grade. Don't see what you need? We source custom — just ask."
      />

      <section className="py-12 md:py-16">
        <div className="container-x">
          {productCategories.map((cat) => {
            const items = products.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6">
                  {cat}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-brand-gold-500 hover:shadow-xl transition-all"
                    >
                      <ProductImage src={p.image} alt={p.name} size="card" />
                      <div className="p-5">
                        <h3 className="font-serif text-xl font-semibold text-[var(--card-foreground)] group-hover:text-brand-gold-600">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
                          {p.shortDescription}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {p.highlights.map((h) => (
                            <li
                              key={h}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                          {p.hsCode && <span>HS: {p.hsCode}</span>}
                          <span className="inline-flex items-center gap-1 font-semibold text-brand-navy-900 dark:text-brand-gold-400">
                            View <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-8 rounded-xl border-2 border-dashed border-brand-gold-500/40 bg-brand-gold-500/5 p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Looking for something specific?
            </h3>
            <p className="mt-2 text-[var(--muted-foreground)] max-w-2xl mx-auto">
              We source on demand. Share your requirement — product, quantity,
              destination, quality specs — and we&apos;ll revert with a competitive quote.
            </p>
            <Link
              href="/contact#inquiry"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-navy-900 px-6 py-3 font-semibold text-white hover:bg-brand-navy-800"
            >
              Request Custom Sourcing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
