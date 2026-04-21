// Testimonials shown on Home / About. Placeholders — replace with real client quotes once received.

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
  rating: number; // 1-5
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We look forward to building a long-term sourcing partnership with Swaranbharat for our premium food products line.",
    author: "[Client Name]",
    role: "Procurement Head",
    company: "[Company]",
    country: "United Arab Emirates",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "Professional, transparent, and responsive — exactly what we expect from an Indian export partner.",
    author: "[Client Name]",
    role: "Managing Director",
    company: "[Company]",
    country: "United Kingdom",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "Their commitment to quality and on-time delivery makes them our preferred sourcing house in India.",
    author: "[Client Name]",
    role: "Import Manager",
    company: "[Company]",
    country: "Singapore",
    rating: 5,
    featured: true,
  },
];
