import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock, type LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import InquiryForm from "@/components/contact/InquiryForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Swaranbharat Exportsarathi — our office in Baner, Pune. Send an inquiry for bulk dehydrated agri products, moringa powder, onion powder, and more.",
};

const { contact } = company;

const mapQuery = encodeURIComponent(
  `${contact.address.line1}, ${contact.address.line2}, ${contact.address.city}, ${contact.address.state} ${contact.address.pincode}, ${contact.address.country}`
);
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your sourcing requirement"
        description="Our team is based in Pune, India and typically responds to inquiries within 24 hours. For fastest response, include product, quantity, destination, and timeline."
      />

      <section className="py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Left column — contact info + map */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold">Reach us directly</h2>

              <ContactRow Icon={Phone} label="Phone">
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="hover:text-brand-gold-600"
                >
                  {contact.phone}
                </a>
              </ContactRow>

              <ContactRow Icon={MessageCircle} label="WhatsApp">
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold-600"
                >
                  Chat on WhatsApp ({contact.phone})
                </a>
              </ContactRow>

              <ContactRow Icon={Mail} label="Email">
                <div className="space-y-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="block hover:text-brand-gold-600 break-all"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`mailto:${contact.salesEmail}`}
                    className="block hover:text-brand-gold-600 break-all"
                  >
                    {contact.salesEmail}
                  </a>
                </div>
              </ContactRow>

              <ContactRow Icon={MapPin} label="Office">
                <div className="text-sm leading-relaxed">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                  <br />
                  {contact.address.city}, {contact.address.state}{" "}
                  {contact.address.pincode}
                  <br />
                  {contact.address.country}
                  <a
                    href={mapDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-gold-600 hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </ContactRow>

              <ContactRow Icon={Clock} label="Business Hours">
                <div className="text-sm">
                  Mon–Sat · 10:00 AM – 7:00 PM IST
                  <br />
                  Sunday · Closed
                </div>
              </ContactRow>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${company.name} office`}
                allowFullScreen
              />
            </div>
          </div>

          {/* Right column — inquiry form */}
          <div id="inquiry">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand-gold-500/15 text-brand-gold-600 shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          {label}
        </div>
        <div className="mt-0.5 text-[var(--card-foreground)]">{children}</div>
      </div>
    </div>
  );
}
