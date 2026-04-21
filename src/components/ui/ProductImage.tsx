import Image from "next/image";
import { Package } from "lucide-react";

type Size = "card" | "hero";

type Props = {
  src?: string;
  alt: string;
  size?: Size;
  priority?: boolean;
};

// Unified product image component — falls back to a gold gradient + package icon
// when no image is available, so the layout never breaks for products still
// waiting on real photography.
export default function ProductImage({ src, alt, size = "card", priority }: Props) {
  const aspect = size === "hero" ? "aspect-[4/3]" : "aspect-[16/10]";
  const iconSize = size === "hero" ? 96 : 48;

  if (!src) {
    return (
      <div
        className={`${aspect} gradient-gold flex items-center justify-center text-brand-navy-950`}
        aria-hidden="true"
      >
        <Package size={iconSize} strokeWidth={1.2} />
      </div>
    );
  }

  return (
    <div className={`${aspect} relative overflow-hidden bg-[var(--muted)]`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={size === "hero" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="object-cover transition-transform duration-500 hover:scale-105"
        priority={priority}
      />
    </div>
  );
}
