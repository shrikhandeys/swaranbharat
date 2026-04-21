import { Link } from "react-router-dom";
import { company } from "../data/company";

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-narrow py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">About {company.shortName}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{company.description}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-narrow grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Who we are</h2>
            <p className="mt-3 text-slate-600">
              Founded in {company.established} and headquartered in Pune, Maharashtra,
              {" "}{company.name} is a merchant-exporter focused on dehydrated
              agri-products. We work directly with FSSAI-certified manufacturers across
              India to bring consistent, export-grade quality to buyers worldwide.
            </p>
            <p className="mt-3 text-slate-600">
              Every shipment is traceable, lab-tested where required, and documented
              with complete Phytosanitary / CoA / Packing-List paperwork so clearance
              at your port is painless.
            </p>
          </div>

          <div className="card">
            <h3 className="text-base font-semibold">What we stand for</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Quality-first sourcing — no compromises on hygiene or purity.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Transparent pricing with clear Incoterms.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Reliable delivery windows — because your production schedule matters.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Direct, responsive communication — not a sales funnel.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold">Our roadmap</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              {
                phase: "Today",
                title: "Merchant Exporter",
                body: "Sourcing premium dehydrated agri-products from trusted Indian manufacturers and exporting worldwide.",
              },
              {
                phase: "Near term",
                title: "Private Label & Custom Blends",
                body: "End-to-end private-label packaging and custom-spice formulations under buyer brands.",
              },
              {
                phase: "2-year horizon",
                title: "Direct Manufacturing",
                body: "Expansion into our own processing facility and controlled import operations to broaden the portfolio.",
              },
            ].map((s) => (
              <div key={s.title} className="card">
                <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700">
                  {s.phase}
                </div>
                <h3 className="mt-1 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/contact" className="btn-primary">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
