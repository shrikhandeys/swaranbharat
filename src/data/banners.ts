// Home page running banners — two kinds:
//   1. `heroBanners`  → full-width auto-rotating slider at the top of Home
//   2. `announcements` → thin scrolling marquee (ticker)
//
// Admin panel (Phase 2) will read/write these from DB. For now, edit in code.

export type HeroBanner = {
  id: string;
  eyebrow: string;           // small tag on top — e.g. "NEW ARRIVAL"
  title: string;             // main headline
  subtitle: string;          // supporting line
  category: string;          // product category or campaign
  ctaLabel: string;
  ctaHref: string;
  gradient: "navy" | "gold" | "earth" | "forest";
  active: boolean;
};

export const heroBanners: HeroBanner[] = [
  {
    id: "moringa",
    eyebrow: "SUPER-FOOD POWDERS",
    title: "Premium Moringa Leaf Powder",
    subtitle:
      "Shade-dried, nutrient-dense moringa powder — FSSAI / export grade, bulk or private-label.",
    category: "Super-Food Powders",
    ctaLabel: "Request Moringa Quote",
    ctaHref: "/products/moringa-powder",
    gradient: "forest",
    active: true,
  },
  {
    id: "onion-powder",
    eyebrow: "DEHYDRATED VEGETABLE POWDERS",
    title: "Dehydrated Onion & Garlic Powder",
    subtitle:
      "Strong aroma, low moisture, consistent colour. 80/100 mesh options for food manufacturers.",
    category: "Dehydrated Vegetable Powders",
    ctaLabel: "Explore Powders",
    ctaHref: "/products",
    gradient: "gold",
    active: true,
  },
  {
    id: "flakes",
    eyebrow: "FLAKES & GRANULES",
    title: "Red & Pink Onion Flakes, Crispy Fried Onion",
    subtitle:
      "Uniform cut, low moisture, ready for seasonings, instant mixes and HoReCa channels.",
    category: "Dehydrated Flakes & Granules",
    ctaLabel: "View Flakes Range",
    ctaHref: "/products",
    gradient: "earth",
    active: true,
  },
  {
    id: "herbs",
    eyebrow: "HERBS & LEAVES",
    title: "Dehydrated Curry, Coriander & Green Chilli",
    subtitle:
      "Aromatic dehydrated herbs with natural colour retention — year-round availability.",
    category: "Dehydrated Herbs & Leaves",
    ctaLabel: "Browse Herbs",
    ctaHref: "/products",
    gradient: "navy",
    active: true,
  },
  {
    id: "custom-sourcing",
    eyebrow: "CUSTOM SOURCING",
    title: "Can't find what you need? Tell us.",
    subtitle:
      "We source custom dehydrated products, spice blends and private-label formulations on request.",
    category: "Custom Sourcing",
    ctaLabel: "Start an Inquiry",
    ctaHref: "/contact#inquiry",
    gradient: "navy",
    active: true,
  },
];

export type Announcement = {
  id: string;
  text: string;
  active: boolean;
};

export const announcements: Announcement[] = [
  { id: "1", text: "✨ New: Premium Moringa Leaf Powder now available for bulk export", active: true },
  { id: "2", text: "🌿 Dehydrated Onion Powder & Flakes — FSSAI-grade, consistent supply", active: true },
  { id: "3", text: "📦 Free samples for verified bulk buyers (min. order quantities apply)", active: true },
  { id: "4", text: "🌍 Shipping to Middle East, Europe, Asia Pacific, Americas & Africa", active: true },
  { id: "5", text: "📜 FSSAI · APEDA · MSME · IEC registrations in progress", active: true },
  { id: "6", text: "⏱ Typical quote turnaround: within 24 hours", active: true },
];
