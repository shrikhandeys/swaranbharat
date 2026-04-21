import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const items = testimonials.filter((t) => t.featured).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            What Our Partners Say
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={i}
              className="relative rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
            >
              <Quote
                size={40}
                className="absolute -top-4 left-5 text-brand-gold-500 bg-[var(--card)] rounded-full p-1"
                aria-hidden="true"
              />
              <div className="flex gap-0.5 text-brand-gold-500">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-3 text-[var(--card-foreground)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold text-[var(--card-foreground)]">
                  {t.author}
                </div>
                <div className="text-[var(--muted-foreground)]">
                  {t.role}, {t.company} — {t.country}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
