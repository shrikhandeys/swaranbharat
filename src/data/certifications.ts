// Certifications displayed on the site. Mark `status: "active"` once obtained.
// Later the admin panel will manage these + upload logo/certificate PDF.

export type Certification = {
  code: string;
  name: string;
  fullName: string;
  description: string;
  status: "active" | "in-progress" | "planned";
  issuedBy?: string;
  logoEmoji?: string; // placeholder until logo images uploaded
};

export const certifications: Certification[] = [
  {
    code: "IEC",
    name: "IEC",
    fullName: "Import Export Code",
    description:
      "Unique 10-digit code issued by DGFT, required for any business undertaking import/export in India.",
    status: "in-progress",
    issuedBy: "Directorate General of Foreign Trade (DGFT)",
    logoEmoji: "🌐",
  },
  {
    code: "GST",
    name: "GST",
    fullName: "Goods & Services Tax Registration",
    description:
      "Registered under India's Goods & Services Tax regime for all applicable trade activities.",
    status: "in-progress",
    issuedBy: "Government of India",
    logoEmoji: "📋",
  },
  {
    code: "MSME",
    name: "MSME / Udyam",
    fullName: "Micro, Small & Medium Enterprises Registration",
    description:
      "Recognised under the MSME / Udyam registration scheme of the Government of India.",
    status: "in-progress",
    issuedBy: "Ministry of MSME, Government of India",
    logoEmoji: "🏛️",
  },
  {
    code: "FSSAI",
    name: "FSSAI",
    fullName: "Food Safety and Standards Authority of India",
    description:
      "Licence for handling, storage, and export of food products in compliance with FSSAI standards.",
    status: "in-progress",
    issuedBy: "FSSAI, Government of India",
    logoEmoji: "🥬",
  },
  {
    code: "APEDA",
    name: "APEDA",
    fullName: "Agricultural & Processed Food Products Export Development Authority",
    description:
      "Registration for export of scheduled agricultural and processed-food products.",
    status: "in-progress",
    issuedBy: "APEDA, Ministry of Commerce, Government of India",
    logoEmoji: "🌾",
  },
  {
    code: "ISO",
    name: "ISO 9001:2015",
    fullName: "Quality Management System",
    description:
      "International standard for Quality Management Systems, ensuring consistent delivery and continuous improvement.",
    status: "planned",
    issuedBy: "International Organization for Standardization",
    logoEmoji: "⭐",
  },
];
