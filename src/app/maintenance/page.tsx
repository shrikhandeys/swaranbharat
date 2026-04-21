import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, Phone } from "lucide-react";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "We'll be right back",
  description: "Scheduled maintenance in progress.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  const waNumber = company.contact.whatsapp.replace(/[^0-9]/g, "");
  const estimatedBack = process.env.NEXT_PUBLIC_MAINTENANCE_ETA || "a few minutes";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 h-20 w-20 relative">
          <Image
            src="/logo.png"
            alt={`${company.name} logo`}
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </div>

        <h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">
          We&apos;ll be right back
        </h1>
        <p className="mt-3 text-[var(--muted-foreground)]">
          {company.name} is performing scheduled maintenance to improve your
          experience. We expect to be back in{" "}
          <span className="font-semibold text-[var(--foreground)]">{estimatedBack}</span>.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold-100 px-4 py-2 text-sm text-brand-navy-900">
          <Clock size={16} aria-hidden="true" />
          Thank you for your patience.
        </div>

        <div className="mt-8 grid gap-3 text-sm">
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-white font-semibold hover:opacity-90"
          >
            <Phone size={16} aria-hidden="true" /> WhatsApp us meanwhile
          </a>
          <a
            href={`mailto:${company.contact.salesEmail}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] px-5 py-3 font-semibold hover:border-brand-gold-500"
          >
            <Mail size={16} aria-hidden="true" /> {company.contact.salesEmail}
          </a>
        </div>

        <p className="mt-8 text-xs text-[var(--muted-foreground)]">
          Serious buyers: your inquiries are still reaching our team via
          WhatsApp and email during maintenance.
        </p>
      </div>
    </div>
  );
}
