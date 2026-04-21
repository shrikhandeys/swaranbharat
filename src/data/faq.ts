// Rule-based FAQ knowledge base powering the Swaranbharat chatbot.
// The `matchFaq` function below is used by both the UI widget and unit tests.

import { company } from "./company";

export type FaqEntry = {
  id: string;
  label: string;                 // short label shown as a quick-reply chip
  keywords: string[];            // must all match; use "a|b" for OR (alternates)
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "greeting",
    label: "Hello",
    keywords: ["hi|hello|hey|namaste|salaam"],
    answer: `Hi there! I'm the ${company.shortName} assistant. I can help with products, certifications, MOQ, shipping, samples, and contact details. What would you like to know?`,
  },
  {
    id: "products",
    label: "What do you export?",
    keywords: ["product|products|export|exports|sell|offer|offers|catalog|catalogue"],
    answer:
      "We specialise in premium dehydrated agri-products: Moringa leaf powder, onion / garlic / ginger / tomato / beetroot powders, onion flakes, curry & coriander-leaf powders, turmeric, spice blends, and instant ready-to-cook mixes. Full list: /products",
  },
  {
    id: "moq",
    label: "MOQ",
    keywords: ["moq|minimum|quantity"],
    answer:
      "Minimum Order Quantity depends on SKU and packaging — typically 100 kg for powders and 500 kg for flakes per shipment. Share your target quantity on the Contact form and we'll confirm exact MOQ + pricing within 24 hours.",
  },
  {
    id: "samples",
    label: "Samples",
    keywords: ["sample|samples|trial"],
    answer:
      "Yes — paid samples are available for verified buyers (cost adjustable against the first confirmed order). Courier charges are borne by the buyer. Request samples via the inquiry form at /contact.",
  },
  {
    id: "certifications",
    label: "Certifications",
    keywords: [
      "certificate|certificates|certification|certifications|fssai|apeda|iso|msme|iec|halal|organic",
    ],
    answer:
      "We source only from FSSAI-certified manufacturers. APEDA, IEC, MSME and ISO registrations are in progress and will appear on /certifications as they're issued. Product-specific COA, phyto-sanitary and fumigation certificates are issued per shipment.",
  },
  {
    id: "shipping",
    label: "Shipping & Countries",
    keywords: [
      "ship|shipping|shipments|export|exports|country|countries|region|regions|worldwide|europe|usa|africa|asia",
    ],
    answer:
      "We ship worldwide — primary markets include the Middle East, Europe, North America, Southeast Asia, and Africa. Export incoterms supported: FOB, CIF, CFR, EXW. Port of loading: JNPT / Mundra. Typical lead time: 10-15 days from PO.",
  },
  {
    id: "pricing",
    label: "Pricing",
    keywords: ["price|pricing|cost|rate|rates|quote|quotation"],
    answer:
      "Pricing is dynamic and depends on quantity, packaging, and incoterms. Share your requirement via /contact or WhatsApp and we'll send a formal quotation within 24 hours.",
  },
  {
    id: "hours",
    label: "Office hours",
    keywords: ["hour|hours|timing|timings|open|closed"],
    answer:
      "Office hours: Mon-Sat, 10:00 - 19:00 IST. We respond to WhatsApp and email within 24 hours on working days.",
  },
  {
    id: "contact",
    label: "Contact",
    keywords: [
      "contact|reach|call|phone|whatsapp|email|address|location|number",
    ],
    answer: `You can reach us at:
• Phone / WhatsApp: ${company.contact.phone}
• Email: ${company.contact.salesEmail}
• Office: ${company.contact.address.line1}, ${company.contact.address.city} ${company.contact.address.pincode}, ${company.contact.address.country}
Or use the inquiry form at /contact.`,
  },
  {
    id: "payment",
    label: "Payment terms",
    keywords: ["payment|pay|advance|lc|tt|wire|terms"],
    answer:
      "Standard payment terms: 30% advance (T/T) + 70% against scanned B/L copy, or irrevocable LC at sight for confirmed buyers. Other terms negotiable on a case-by-case basis.",
  },
  {
    id: "supplier",
    label: "I am a supplier",
    keywords: ["supplier|suppliers|manufacturer|manufacturers|vendor|vendors"],
    answer:
      "We're open to onboarding new FSSAI-certified suppliers. Please submit your company profile, product list, capacity, and certifications via /contact (choose 'Supplier' in the form). Our sourcing team will respond within 48 hours.",
  },
];

export const fallbackAnswer = `I couldn't find an exact answer for that. Would you like me to connect you directly to our team? You can reach us on WhatsApp or email ${company.contact.salesEmail}, or fill out /contact for a tailored response.`;

function tokenise(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

function matchKeyword(tokens: string[], raw: string, text: string): boolean {
  const kw = raw.trim().toLowerCase();
  if (!kw) return false;
  // Multi-word keywords (e.g. "letter of credit"): exact substring.
  if (kw.includes(" ")) return text.includes(kw);
  // Single-word keywords: whole-word match (so "hi" doesn't match "ship").
  return tokens.includes(kw);
}

/**
 * Find the best-matching FAQ answer for a free-text query.
 * Returns the higher-scoring entry when multiple match; falls back to a
 * handoff message when nothing matches.
 */
export function matchFaq(input: string): string {
  const tokens = tokenise(input);
  const text = tokens.join(" ");
  type Match = { answer: string; score: number; priority: number };
  let best: Match | null = null;
  faqEntries.forEach((entry, idx) => {
    const allMatch = entry.keywords.every((group) =>
      group.split("|").some((k) => matchKeyword(tokens, k, text)),
    );
    if (!allMatch) return;
    const score = entry.keywords.reduce(
      (s, g) => s + g.split("|").filter((k) => matchKeyword(tokens, k, text)).length,
      0,
    );
    const current: Match = { answer: entry.answer, score, priority: idx };
    if (
      !best ||
      current.score > best.score ||
      (current.score === best.score && current.priority > best.priority)
    ) {
      best = current;
    }
  });
  return best ? (best as Match).answer : fallbackAnswer;
}
