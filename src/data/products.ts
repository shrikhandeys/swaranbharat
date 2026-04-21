export type ProductCategory =
  | "Super-Food Powders"
  | "Dehydrated Vegetable Powders"
  | "Dehydrated Flakes & Granules"
  | "Dehydrated Herbs & Leaves"
  | "Spices & Masala"
  | "Instant Mixes & Ready-to-Cook";

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

export const productCategories: ProductCategory[] = [
  "Super-Food Powders",
  "Dehydrated Vegetable Powders",
  "Dehydrated Flakes & Granules",
  "Dehydrated Herbs & Leaves",
  "Spices & Masala",
  "Instant Mixes & Ready-to-Cook",
];

export const products: Product[] = [
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
    image: "products/moringa-powder.jpg",
    featured: true,
  },
  {
    slug: "onion-powder",
    name: "Dehydrated Onion Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Dehydrated red onion powder with strong flavour and long shelf life — ideal for seasonings, soups and ready-to-cook mixes.",
    highlights: [
      "80 / 100 mesh options",
      "Moisture < 6%",
      "No added colour / preservatives",
      "Bulk & private-label packaging",
    ],
    hsCode: "07129000",
    image: "products/onion-powder.jpg",
    featured: true,
  },
  {
    slug: "garlic-powder",
    name: "Dehydrated Garlic Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Pungent, aromatic garlic powder ideal for seasonings, ready-to-cook mixes and food processing.",
    highlights: ["Allium-rich aroma", "Moisture-controlled packaging", "Food-grade"],
    hsCode: "07129000",
    image: "products/garlic-powder.jpg",
    featured: true,
  },
  {
    slug: "ginger-powder",
    name: "Dehydrated Ginger Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Spicy, warm ginger powder — used widely in beverages, masala mixes and confections.",
    highlights: ["High-oil Indian ginger", "Fine mesh", "Lab-tested"],
    hsCode: "09101100",
    image: "products/ginger-powder.jpg",
  },
  {
    slug: "tomato-powder",
    name: "Dehydrated Tomato Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Natural tomato powder with deep red colour — ideal for soups, sauces and seasoning bases.",
    highlights: ["No added colour", "Sun/ hot-air dried", "Bright red hue"],
    hsCode: "07129090",
    image: "products/tomato-powder.jpg",
  },
  {
    slug: "beetroot-powder",
    name: "Dehydrated Beetroot Powder",
    category: "Dehydrated Vegetable Powders",
    shortDescription:
      "Vibrant beetroot powder — a natural colorant and nutrient booster for juices, bakes and health mixes.",
    highlights: ["Natural colorant", "Rich in iron & nitrates", "Fine / medium mesh"],
    hsCode: "07129090",
    image: "products/beetroot-powder.jpg",
  },
  {
    slug: "red-onion-flakes",
    name: "Dehydrated Red Onion Flakes",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Uniformly cut red onion flakes — strong flavour and colour, ideal for garnishing and instant mixes.",
    highlights: ["3–5 mm / 5–10 mm sizes", "Moisture < 7%", "Export packing"],
    hsCode: "07122000",
    image: "products/red-onion-flakes.jpg",
    featured: true,
  },
  {
    slug: "pink-onion-flakes",
    name: "Dehydrated Pink Onion Flakes",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Milder pink onion flakes — lighter aroma with a balanced sweet-savoury profile.",
    highlights: ["Uniform cut", "Low moisture", "Bulk / retail packs"],
    hsCode: "07122000",
    image: "products/pink-onion-flakes.jpg",
  },
  {
    slug: "fried-onion",
    name: "Crispy Fried Onion",
    category: "Dehydrated Flakes & Granules",
    shortDescription:
      "Golden-brown crispy fried onions — ready-to-use topping for biryani, soups and snacks.",
    highlights: ["Palm/ sunflower fried variants", "Crisp texture", "Long shelf life"],
    image: "products/fried-onion.jpg",
  },
  {
    slug: "coriander-leaves-powder",
    name: "Dehydrated Coriander Leaves Powder",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Aromatic coriander leaf powder — preserved colour, flavour and aroma for year-round use.",
    highlights: ["Rich green colour", "No added preservatives", "Retail / bulk"],
    hsCode: "09099990",
    image: "products/coriander-leaves-powder.jpg",
  },
  {
    slug: "curry-leaves-powder",
    name: "Dehydrated Curry Leaves Powder",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Classic South-Indian curry leaf powder — strong aroma, ideal for tempering and chutney powders.",
    highlights: ["Shade-dried", "Fine aroma", "Lab-tested"],
    hsCode: "09109990",
    image: "products/curry-leaves-powder.jpg",
  },
  {
    slug: "green-chilli",
    name: "Dehydrated Green Chilli",
    category: "Dehydrated Herbs & Leaves",
    shortDescription:
      "Spicy dehydrated green chilli in flakes / powder — preserves heat and fresh-chilli character.",
    highlights: ["Whole / flakes / powder", "SHU-graded", "Export packaging"],
    hsCode: "09042120",
    image: "products/green-chilli.jpg",
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Spices & Masala",
    shortDescription:
      "High-curcumin (3%+) Indian turmeric powder with deep natural colour and lab-certified purity.",
    highlights: ["Curcumin 3%+", "Sulphur-free", "Moisture-controlled packaging"],
    hsCode: "09103020",
    image: "products/turmeric-powder.jpg",
    featured: true,
  },
  {
    slug: "masala-blends",
    name: "Custom Masala Blends",
    category: "Spices & Masala",
    shortDescription:
      "Traditional Indian masalas and private-label spice blends formulated to your specifications.",
    highlights: ["Custom formulations", "Private-label packaging", "FSSAI-compliant"],
    image: "products/masala-blends.jpg",
  },
  {
    slug: "instant-misal",
    name: "Instant Misal & Ready-to-Cook Mixes",
    category: "Instant Mixes & Ready-to-Cook",
    shortDescription:
      "Authentic Indian ready-to-cook mixes — Instant Misal, curry pastes and more. Private-label ready.",
    highlights: ["Authentic regional recipes", "Long shelf life", "Retail pouches / bulk"],
    image: "products/instant-misal.jpg",
  },
  {
    slug: "dehydrated-sprouts",
    name: "Dehydrated Sprouted Matki",
    category: "Instant Mixes & Ready-to-Cook",
    shortDescription:
      "Convenient dehydrated sprouted moth beans (matki) — rehydrates in minutes for healthy meals.",
    highlights: ["Nutrient-preserved drying", "No preservatives", "Long shelf life"],
    image: "products/dehydrated-sprouts.jpg",
  },
];
