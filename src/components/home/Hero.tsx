import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe2 } from "lucide-react";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white">
      {/* Decorative gold orbit rings echoing the logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full border border-brand-gold-500/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-[360px] w-[360px] rounded-full border border-brand-gold-500/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-brand-gold-500/5 blur-3xl"
      />

      <div className="container-x relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/40 bg-brand-gold-500/10 px-3 py-1 text-xs font-medium text-brand-gold-300">
            <Globe2 size={14} />
            Trusted Merchant Exporter from India
          </div>
          <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Sourcing India&apos;s Finest,
            <br />
            <span className="text-brand-gold-400">Delivered Worldwide.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl">
            {company.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact#inquiry"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400 transition-colors"
            >
              Request a Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px]">
            <div className="absolute inset-0 rounded-full bg-brand-gold-500/20 blur-3xl" />
            <Image
              src="/logo.png"
              alt="Swaranbharat Exportsarathi — globe of global trade"
              fill
              priority
              className="object-contain relative drop-shadow-[0_0_60px_rgba(246,182,38,0.45)]"
              sizes="(max-width: 768px) 320px, 400px"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
