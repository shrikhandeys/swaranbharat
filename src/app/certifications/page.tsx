import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Certifications & Registrations",
  description:
    "Swaranbharat Exportsarathi holds and maintains IEC, GST, MSME, FSSAI, APEDA, and ISO registrations — compliance you can trust.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Affiliations & Certifications"
        title="Compliance You Can Trust"
        description="We maintain all required registrations for legal, compliant, and transparent export operations from India."
      />

      <section className="py-12 md:py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {certifications.map((c) => (
            <article
              key={c.code}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 flex gap-4"
            >
              <div className="text-4xl shrink-0" aria-hidden="true">
                {c.logoEmoji}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif text-xl font-semibold text-[var(--card-foreground)]">
                    {c.name}
                  </h2>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      c.status === "active"
                        ? "bg-green-500/15 text-green-700 dark:text-green-400"
                        : c.status === "in-progress"
                        ? "bg-brand-gold-500/20 text-brand-gold-700 dark:text-brand-gold-300"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    {c.status === "active"
                      ? "Active"
                      : c.status === "in-progress"
                      ? "In Progress"
                      : "Planned"}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-[var(--muted-foreground)]">
                  {c.fullName}
                </p>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  {c.description}
                </p>
                {c.issuedBy && (
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    <strong>Issued by:</strong> {c.issuedBy}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="container-x mt-10">
          <div className="rounded-xl border-2 border-dashed border-brand-gold-500/40 bg-brand-gold-500/5 p-6 text-center text-sm text-[var(--muted-foreground)]">
            Certificate PDFs and official logos will be uploaded here once registrations
            are finalised. In the admin panel (coming in Phase 2) you&apos;ll be able to
            add / update certifications and attach documents at any time.
          </div>
        </div>
      </section>
    </>
  );
}
