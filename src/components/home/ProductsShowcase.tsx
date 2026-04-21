import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductsShowcase() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const list = featured.length > 0 ? featured : products.slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-[var(--muted)]">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
              Our Products
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              What We Export
            </h2>
            <p className="mt-2 text-[var(--muted-foreground)] max-w-2xl">
              A curated range of India&apos;s finest commodities — expanding as we grow.
              Custom sourcing on request.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 font-semibold text-brand-navy-900 hover:text-brand-gold-600 dark:text-brand-gold-400"
          >
            View all products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-brand-gold-500 hover:shadow-xl transition-all"
            >
              <ProductImage src={p.image} alt={p.name} size="card" />
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold-600">
                  {p.category}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--card-foreground)] group-hover:text-brand-gold-600">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
                  {p.shortDescription}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  {p.hsCode && <span>HS: {p.hsCode}</span>}
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-navy-900 dark:text-brand-gold-400">
                    Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-semibold text-brand-navy-900 dark:text-brand-gold-400"
          >
            View all products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
