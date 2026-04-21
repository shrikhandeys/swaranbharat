import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, HeartHandshake, Leaf } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${company.name} — ${company.tagline}. Our mission, vision, and values as a new-generation Indian merchant exporter.`,
};

const values = [
  {
    Icon: HeartHandshake,
    title: "Integrity First",
    text: "Honest communication, transparent pricing, no hidden surprises. Trade built on trust.",
  },
  {
    Icon: Leaf,
    title: "Quality & Compliance",
    text: "Every product meets buyer-country standards. Every shipment carries full documentation.",
  },
  {
    Icon: Target,
    title: "Delivery Discipline",
    text: "We commit to timelines and meet them. Logistics and documentation handled end-to-end.",
  },
  {
    Icon: Eye,
    title: "Long-term Partnerships",
    text: "We&apos;re building relationships, not one-off deals. Your growth is our growth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A New-Generation Indian Export House, Built on Trust."
        description={company.description}
      />

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600">
              <Target size={22} />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-[var(--card-foreground)]">
              Our Mission
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              To become a trusted bridge between Indian producers and global buyers by
              delivering authentic products, at the right price, on time — with the
              highest standards of compliance and customer service.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600">
              <Eye size={22} />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-[var(--card-foreground)]">
              Our Vision
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              Over the next 2 years, to evolve from a merchant exporter into a
              vertically-integrated manufacturer-exporter with both-way trade
              (import + export) operations, expanding to every major region of
              the world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--muted)]">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
              Our Values
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              What Drives Us Every Day
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 font-semibold text-[var(--card-foreground)]">
                  {title}
                </h3>
                <p
                  className="mt-1 text-sm text-[var(--muted-foreground)]"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x rounded-2xl bg-brand-navy-950 text-white p-10 md:p-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-400">
              Our Roadmap
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold">
              Built for today. Growing for tomorrow.
            </h2>
            <p className="mt-4 text-white/80">{company.businessModel}</p>
            <div className="mt-6">
              <Link
                href="/contact#inquiry"
                className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400"
              >
                Partner with us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
