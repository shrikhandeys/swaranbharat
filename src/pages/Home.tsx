import { Link } from "react-router-dom";
import { company } from "../data/company";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* Hero — soft cream background, dark accents only on text/buttons */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-narrow grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Premium Indian Dehydrated Agri Exports
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              {company.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              {company.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <Link to="/products" className="btn-outline">
                Explore Products
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {company.stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-white p-3 ring-1 ring-slate-100">
                  <dt className="text-lg font-semibold text-brand-700">{s.value}</dt>
                  <dd className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <img
                src={featured[0]?.image ?? "products/moringa-powder.jpg"}
                alt={featured[0]?.name ?? "Moringa Powder"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-48 rounded-xl bg-white p-4 shadow-md ring-1 ring-slate-100 md:block">
              <div className="text-xs font-medium uppercase tracking-wide text-brand-700">
                FSSAI certified
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Export-grade sourcing
              </div>
              <p className="mt-1 text-xs text-slate-500">
                From verified Indian manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">Why Swaranbharat</h2>
            <p className="mt-3 text-slate-600">
              We combine India&apos;s best dehydrated-agri supply base with export-grade
              quality assurance, transparent pricing and responsive communication.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Quality you can trust",
                body: "Every lot is sourced from FSSAI-certified, export-audited manufacturers and passes incoming QC before dispatch.",
              },
              {
                title: "Transparent pricing",
                body: "Clean per-kg / per-MT quotations with Incoterm-aware logistics — no hidden fees, ever.",
              },
              {
                title: "Fast, global shipping",
                body: "Reliable freight partners, consolidated LCL or full FCL — on-time delivery from JNPT, Nhava Sheva & Mundra.",
              },
            ].map((f) => (
              <div key={f.title} className="card">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-slate-50 py-16">
        <div className="container-narrow">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured products</h2>
              <p className="mt-2 text-slate-600">
                A snapshot of our most-requested dehydrated agri products.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden text-sm font-medium text-brand-700 hover:text-brand-800 sm:inline-block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="btn-outline">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-narrow rounded-2xl bg-brand-50 p-8 ring-1 ring-brand-100 sm:p-12">
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to source premium Indian agri-products?
              </h2>
              <p className="mt-3 text-slate-700">
                Tell us what you need — volume, packaging, destination — and we&apos;ll
                send a detailed quote within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="btn-primary">
                Get a Quote
              </Link>
              <a
                href={`https://wa.me/${company.contact.phoneRaw.replace("+", "")}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
