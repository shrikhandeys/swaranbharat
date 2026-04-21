import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden gradient-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full border border-brand-gold-500/20"
      />
      <div className="container-x py-16 md:py-20 relative">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-white/80 text-base md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
