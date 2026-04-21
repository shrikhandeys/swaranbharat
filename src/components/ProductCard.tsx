import { Link } from "react-router-dom";
import type { Product } from "../data/products";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  return (
    <article className="card flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700">
          {product.category}
        </div>
        <h3 className="mt-1 text-base font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
          {product.shortDescription}
        </p>
        {product.hsCode && (
          <p className="mt-2 text-xs text-slate-500">
            HS Code: <span className="font-medium">{product.hsCode}</span>
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-800"
            >
              {h}
            </span>
          ))}
        </div>
        <div className="mt-5 pt-0">
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Request a quote →
          </Link>
        </div>
      </div>
    </article>
  );
}
