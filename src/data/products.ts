// Product catalog — initial focus: premium dehydrated agri products sourced from
// verified Indian manufacturers. The admin panel (Phase 2) will let you manage
// products, categories, photos, specs and videos directly from the dashboard.

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  highlights: string[];
  hsCode?: string;
  image?: string;
  featured?: boolean;
};

export type ProductCategory =
  | "Dehydrated Vegetable Powders"
  | "Dehydrated Flakes & Granules"
  | "Dehydrated Herbs & Leaves"
  | "Super-Food Powders"
  | "Spices & Masala"
  | "Instant Mixes & Ready-to-Cook"
  | "Other";

export const productCategories: ProductCategory[] = [
  "Super-Food Powders",
  "Dehydrated Vegetable Powders",
  "Dehydrated Flakes & Granules",
  "Dehydrated Herbs & Leaves",
  "Spices & Masala",
  "Instant Mixes & Ready-to-Cook",
  "Other",
];

export const products: Product[] = [
  // ── Super-food powders (hero product) ──────────────────────────
  {
    slug: "moringa-powder",
    name: "Moringa Leaf Powder",
    category: "Super-Food Powders",
    shortDescription:
      "Premium food-grade moringa (drumstick) leaf powder — richly green, aromatic, and nutrient-dense.",
    highlights: [
      "Shade-dried to preserve nutrients",
      "Rich in vitamins A, C, calcium, iron",
      "Fine mesh for smooth dispersion",
      "FSSAI / export-grade",
    ],
    hsCode: "12119029",
    image: "/products/moringa-powder.jpg",
    featured: true,
  },

  // ── Dehydrated vegetable powders ──────────────────────────────
  {
    slug: "onion-powder",
    name: "Dehydrated Onion Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Dehydrated red onion powder with strong flavour and long shelf life — ideal for seasonings, soups, and ready-to-cook mixes.",
    highlights: [
      "80 / 100 mesh options",
      "Moisture < 6%",
      "No added colour / preservatives",
      "Bulk & private-label packaging",
    ],
    hsCode: "07129000",
    image: "/products/onion-powder.jpg",
    featured: true,
  },
  {
    slug: "garlic-powder",
    name: "Dehydrated Garlic Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Pure white garlic powder with intense aroma, made from carefully dehydrated Indian garlic.",
    highlights: [
      "Allicin-retained drying",
      "100 mesh / custom",
      "Low moisture, low microbial count",
      "Consistent colour & taste",
    ],
    hsCode: "07129000",
    image: "/products/garlic-powder.jpg",
    featured: true,
  },
  {
    slug: "ginger-powder",
    name: "Dehydrated Ginger Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Pungent, aromatic dehydrated ginger powder — widely used in beverages, masalas, and health formulations.",
    highlights: [
      "Whole / cracked / powder options",
      "High essential-oil content",
      "Export-ready packaging",
    ],
    hsCode: "09101100",
    image: "/products/ginger-powder.jpg",
  },
  {
    slug: "tomato-powder",
    name: "Dehydrated Tomato Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Rich-red dehydrated tomato powder with natural tangy flavour — perfect for sauces, soups, and seasonings.",
    highlights: [
      "High lycopene content",
      "No artificial colour",
      "Instant reconstitution",
    ],
    hsCode: "07129090",
    image: "/products/tomato-powder.jpg",
  },
  {
    slug: "beetroot-powder",
    name: "Dehydrated Beetroot Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Deep-red beetroot powder, a natural colourant and nutrient source for health drinks & bakery.",
    highlights: ["Natural colour", "No added sugar", "Nitrate-rich"],
    hsCode: "07129090",
    image: "/products/beetroot-powder.jpg",
  },

  // ── Flakes & granules ─────────────────────────────────────────
  {
    slug: "red-onion-flakes",
    name: "Dehydrated Red Onion Flakes",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Crisp red onion flakes / kibbled — widely used in seasonings, instant foods, and home cooking.",
    highlights: ["Size: 3-5 mm / 5-10 mm", "Low moisture", "Strong colour retention"],
    hsCode: "07129000",
    image: "/products/red-onion-flakes.jpg",
    featured: true,
  },
  {
    slug: "pink-onion-flakes",
    name: "Dehydrated Pink Onion Flakes",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Mild-flavoured pink onion flakes for premium retail and food-service applications.",
    highlights: ["Uniform cut", "Gentle flavour profile", "Export-grade"],
    hsCode: "07129000",
    image: "/products/pink-onion-flakes.jpg",
  },
  {
    slug: "fried-onion",
    name: "Crispy Fried Onion",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Golden, crunchy fried onion — a classic Indian topping for biryanis, salads, and instant meals.",
    highlights: [
      "Fried in food-grade oil",
      "No artificial colour",
      "Retail & HoReCa packs",
    ],
    hsCode: "20055900",
    image: "/products/fried-onion.jpg",
  },

  // ── Herbs & leaves ────────────────────────────────────────────
  {
    slug: "coriander-leaves-powder",
    name: "Dehydrated Coriander Leaves Powder",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Fresh-green coriander-leaf powder capturing the aroma of fresh coriander — ready to use year-round.",
    highlights: ["Natural green colour", "Low-temperature drying", "Long shelf life"],
    hsCode: "09109929",
    image: "/products/coriander-leaves-powder.jpg",
  },
  {
    slug: "curry-leaves-powder",
    name: "Dehydrated Curry Leaves Powder",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Aromatic curry-leaf powder — essential for South Indian cuisine and health-food products.",
    highlights: ["Pure dehydrated curry leaves", "No additives", "Fine-mesh powder"],
    hsCode: "09109929",
    image: "/products/curry-leaves-powder.jpg",
  },
  {
    slug: "green-chilli",
    name: "Dehydrated Green Chilli",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Spicy dehydrated green chilli in flakes / powder — preserves heat and fresh-chilli character.",
    highlights: ["Whole / flakes / powder", "SHU-graded", "Export packaging"],
    hsCode: "09042120",
    image: "/products/green-chilli.jpg",
  },

  // ── Spices & masala ───────────────────────────────────────────
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Spices & Masala",
    shortDescription:
      "High-curcumin (3%+) Indian turmeric powder with deep natural colour and lab-certified purity.",
    highlights: ["Curcumin 3%+", "Sulphur-free", "Moisture-controlled packaging"],
    hsCode: "09103020",
    image: "/products/turmeric-powder.jpg",
    featured: true,
  },
  {
    slug: "masala-blends",
    name: "Custom Masala Blends",
    category: "Spices & Masala",
    shortDescription:
      "Traditional Indian masalas and private-label spice blends formulated to your specifications.",
    highlights: [
      "Custom formulations",
      "Private-label packaging",
      "FSSAI-compliant",
    ],
    image: "/products/masala-blends.jpg",
  },

  // ── Instant mixes ─────────────────────────────────────────────
  {
    slug: "instant-misal",
    name: "Instant Misal & Ready-to-Cook Mixes",
    category: "Instant Mixes & Ready-to-Cook",
    shortDescription:
      "Authentic Indian ready-to-cook mixes — Instant Misal, curry pastes, and more. Private-label ready.",
    highlights: [
      "Authentic regional recipes",
      "Long shelf life",
      "Retail pouches / bulk",
    ],
    image: "/products/instant-misal.jpg",
  },
  {
    slug: "dehydrated-sprouts",
    name: "Dehydrated Sprouted Matki",
    category: "Instant Mixes & Ready-to-Cook",
    shortDescription:
      "Convenient dehydrated sprouted moth beans (matki) — rehydrates in minutes for healthy meals.",
    highlights: ["Nutrient-preserved drying", "No preservatives", "Long shelf life"],
    image: "/products/dehydrated-sprouts.jpg",
  },
];
