import { announcements } from "@/data/banners";

export default function AnnouncementMarquee() {
  const active = announcements.filter((a) => a.active);
  if (active.length === 0) return null;

  // Duplicate so the marquee loops seamlessly
  const strip = [...active, ...active];

  return (
    <div
      className="bg-brand-navy-950 text-brand-gold-300 border-y border-brand-gold-500/20 overflow-hidden"
      role="region"
      aria-label="Latest announcements"
    >
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {strip.map((a, i) => (
          <span key={`${a.id}-${i}`} className="mx-6 text-sm font-medium">
            {a.text}
            <span className="mx-6 text-brand-gold-500/40" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
