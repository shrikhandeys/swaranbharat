import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Users, Award } from "lucide-react";

const pillars = [
  {
    Icon: ShieldCheck,
    title: "3-Step Quality Check",
    text: "Every shipment is inspected for specifications, packaging, and traceability before dispatch.",
  },
  {
    Icon: Users,
    title: "Verified Supplier Network",
    text: "We work only with audited, compliant manufacturers across India.",
  },
  {
    Icon: Truck,
    title: "On-Time, Every Time",
    text: "End-to-end logistics handled — FOB, CIF, DDP — with documentation support.",
  },
  {
    Icon: Award,
    title: "Authenticity Guaranteed",
    text: "Lab-certified products with full compliance documentation for every market.",
  },
];

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
            About Us
          </p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            A New-Generation Indian Export House, Built on Trust.
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)]">
            Swaranbharat Exportsarathi is founded on a simple promise: source the best
            India has to offer, verify it rigorously, and deliver it on time —
            anywhere in the world. Whether you need agri-commodities, textiles,
            handicrafts, or minerals, we act as your dedicated sourcing partner
            from origin to destination.
          </p>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Currently a merchant exporter, we are scaling into in-house manufacturing
            and two-way trade (import + export) over the next 2 years to serve our
            clients even more comprehensively.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-navy-900 hover:text-brand-gold-600 dark:text-brand-gold-400"
          >
            Learn more about us <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600">
                <Icon size={20} />
              </div>
              <h3 className="mt-3 font-semibold text-[var(--card-foreground)]">{title}</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
