import { company } from "@/data/company";

export default function Stats() {
  return (
    <section className="bg-brand-navy-950 border-t border-white/5 text-white">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
        {company.stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold text-brand-gold-400">
              {s.value}
            </div>
            <div className="mt-1 text-xs md:text-sm uppercase tracking-wider text-white/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
