import { certifications } from "@/data/certifications";

export default function CertificationsStrip() {
  return (
    <section className="py-12 border-y border-[var(--border)] bg-[var(--background)]">
      <div className="container-x">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
            Affiliations & Registrations
          </p>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-bold text-[var(--foreground)]">
            Compliance You Can Trust
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((c) => (
            <div
              key={c.code}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-center hover:border-brand-gold-500 transition-colors"
            >
              <div className="text-3xl" aria-hidden="true">
                {c.logoEmoji}
              </div>
              <div className="mt-2 font-semibold text-sm text-[var(--card-foreground)]">
                {c.name}
              </div>
              <div
                className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded ${
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
