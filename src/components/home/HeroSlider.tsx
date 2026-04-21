"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroBanners, type HeroBanner } from "@/data/banners";
import { company } from "@/data/company";

const gradientMap: Record<HeroBanner["gradient"], string> = {
  navy: "bg-gradient-to-br from-brand-navy-800 via-brand-navy-900 to-brand-navy-950",
  gold: "bg-gradient-to-br from-brand-gold-600 via-brand-gold-700 to-brand-navy-900",
  earth: "bg-gradient-to-br from-amber-800 via-brand-navy-900 to-brand-navy-950",
  forest: "bg-gradient-to-br from-emerald-800 via-brand-navy-900 to-brand-navy-950",
};

const AUTO_PLAY_MS = 6000;

export default function HeroSlider() {
  const slides = heroBanners.filter((b) => b.active);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (isPaused || slides.length < 2) return;
    timerRef.current = setTimeout(() => go(1), AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, isPaused, go, slides.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden text-white"
      aria-roledescription="carousel"
      aria-label="Featured product categories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`relative ${gradientMap[slide.gradient]} transition-colors`}>
        {/* Decorative ring echoing logo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full border border-brand-gold-500/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-[380px] w-[380px] rounded-full border border-brand-gold-500/10"
        />

        <div className="container-x relative py-16 md:py-24 grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
          <div
            key={slide.id}
            className="animate-[fade-in_0.5s_ease-out]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-400">
              {slide.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/80 text-base md:text-lg">
              {slide.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400"
              >
                {slide.ctaLabel} <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact#inquiry"
                className="inline-flex items-center gap-2 rounded-md border border-white/50 px-6 py-3 font-semibold hover:bg-white/10"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="relative justify-self-center md:justify-self-end">
            {/* Soft radial glow — replaces the old square "pasted" look */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(246,182,38,0.25),transparent_70%)] blur-2xl"
            />
            <div className="relative h-48 w-48 md:h-64 md:w-64 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt={`${company.name} logo`}
                width={260}
                height={260}
                priority
                className="h-44 w-44 md:h-60 md:w-60 object-contain drop-shadow-[0_0_40px_rgba(246,182,38,0.45)]"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        {slides.length > 1 && (
          <div className="container-x pb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide selector">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}: ${s.title}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-brand-gold-500" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
