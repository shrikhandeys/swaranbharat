import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function CtaBanner() {
  return (
    <section className="gradient-navy text-white">
      <div className="container-x py-14 md:py-16 grid gap-6 md:grid-cols-[1fr_auto] items-center">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            Ready to source from India?
          </h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Tell us what you need — quantity, destination, quality specs — and we&apos;ll
            get back with a competitive quote within 24 hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact#inquiry"
            className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400"
          >
            Submit Inquiry
            <ArrowRight size={18} />
          </Link>
          <a
            href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
