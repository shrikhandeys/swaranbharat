import { servedRegions } from "@/data/countries";
import { Globe2 } from "lucide-react";

export default function WorldMap() {
  return (
    <section className="py-16 md:py-20 bg-[var(--muted)]">
      <div className="container-x">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
            Global Reach
          </p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            We Serve Worldwide
          </h2>
          <p className="mt-2 text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Trusted by buyers across 5 continents — and expanding.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {servedRegions.map((r) => (
            <div
              key={r.region}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold-500/15 text-brand-gold-600">
                <Globe2 size={20} />
              </div>
              <h3 className="mt-3 font-semibold text-[var(--card-foreground)]">
                {r.region}
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[var(--muted-foreground)]">
                {r.countries.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
