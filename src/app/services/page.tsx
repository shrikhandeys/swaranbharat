import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Ship,
  FileText,
  Package,
  Globe2,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "End-to-end export services — sourcing, quality inspection, packaging, logistics, documentation, compliance — from Swaranbharat Exportsarathi.",
};

const services = [
  {
    Icon: Search,
    title: "Supplier Sourcing & Vetting",
    text: "We identify, audit, and shortlist compliant Indian manufacturers for your specific requirements — saving you months of legwork.",
  },
  {
    Icon: ShieldCheck,
    title: "3-Step Quality Inspection",
    text: "Pre-production, in-line, and pre-shipment checks with lab testing where required. Third-party inspection coordinated if requested.",
  },
  {
    Icon: Package,
    title: "Custom Packaging & Labelling",
    text: "Destination-country compliant packaging, private labelling, barcoding, and retail-ready presentation.",
  },
  {
    Icon: FileText,
    title: "Export Documentation",
    text: "Commercial invoice, packing list, COO, phytosanitary, FSSAI/APEDA certificates, customs paperwork — handled end-to-end.",
  },
  {
    Icon: Ship,
    title: "Logistics & Shipping",
    text: "FOB / CIF / CFR / DDP — we arrange freight forwarding, shipping, insurance and last-mile coordination to your door.",
  },
  {
    Icon: Globe2,
    title: "Market Advisory",
    text: "Guidance on import duties, product compliance, HS codes, and target-market regulations across 100+ countries.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="End-to-End Export Services, Built Around You"
        description="From the first inquiry to last-mile delivery, we handle every step so you can focus on growing your business."
      />
      <section className="py-12 md:py-16">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--card-foreground)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-brand-navy-950 p-8 md:p-12 text-white grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">
                Discuss your requirement with our team
              </h2>
              <p className="mt-2 text-white/80">
                Every business is different. Tell us what you need and we&apos;ll tailor a
                service package that works.
              </p>
            </div>
            <Link
              href="/contact#inquiry"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400"
            >
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
