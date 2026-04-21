export const company = {
  name: "Swaranbharat ExportSarathi",
  shortName: "Swaranbharat",
  tagline: "Your Trusted Global Trade Partner",
  description:
    "Swaranbharat ExportSarathi is a Pune-based merchant exporter specialising in premium dehydrated agri-products — moringa leaf powder, onion powder, garlic powder, dehydrated flakes, herbs, and custom super-food powders — sourced from verified FSSAI-certified Indian manufacturers. We deliver export-grade quality, transparent pricing, and on-time worldwide shipping.",
  established: "2025",
  domain: "swaranbharatexports.com",

  contact: {
    email: "info@swaranbharatexports.com",
    salesEmail: "sales@swaranbharatexports.com",
    phone: "+91 90961 72205",
    phoneRaw: "+919096172205",
    whatsapp: "+919096172205",
    address: {
      line1: "Nakshatra-2 Building, Mohan Nagar Co-op Housing Society",
      line2: "Near Bitwise Terra Tower, Baner",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411045",
    },
  },

  stats: [
    { value: "15+", label: "Dehydrated Products" },
    { value: "FSSAI", label: "Certified Sourcing" },
    { value: "Pune", label: "Based in India" },
    { value: "24h", label: "Quote Response" },
  ],

  whatsappDefaultMessage:
    "Hi Swaranbharat ExportSarathi, I'd like to inquire about your dehydrated agri products.",

  // Business hours shown in the footer "Get in touch" block.
  hours: {
    timings: "10 AM – 7 PM",
    days: "Monday to Saturday",
    timezone: "IST",
  },

  // Social handles — leave blank to hide the icon. Admin can fill these later.
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
} as const;

export type Company = typeof company;
