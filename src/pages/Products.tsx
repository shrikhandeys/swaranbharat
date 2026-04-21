import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  productCategories,
  products,
  type ProductCategory,
} from "../data/products";

type Filter = "All" | ProductCategory;

export default function Products() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-narrow py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">Our Products</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Premium dehydrated agri-products — sourced from FSSAI-certified Indian
            manufacturers and packed to export-grade standards.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-narrow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["All", ...productCategories] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    filter === c
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 rounded-md bg-slate-50 p-6 text-center text-sm text-slate-600">
              No products match your search. Try clearing filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
