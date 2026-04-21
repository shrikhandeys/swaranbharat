import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPinned,
} from "lucide-react";
import { company } from "@/data/company";
import { certifications } from "@/data/certifications";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-950 text-white/90 mt-20">
      <div className="container-x py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt={`${company.name} logo`}
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div>
              <div className="font-serif font-bold text-brand-gold-400">SWARANBHARAT</div>
              <div className="text-[10px] tracking-[0.2em] text-brand-gold-300">
                EXPORTSARATHI
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {company.tagline}. Sourcing India&apos;s finest products and delivering them
            to buyers across the globe with quality, trust, and on-time commitment.
          </p>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {[
              { href: company.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: company.socials.facebook, Icon: Facebook, label: "Facebook" },
              { href: company.socials.instagram, Icon: Instagram, label: "Instagram" },
              { href: company.socials.twitter, Icon: Twitter, label: "X (Twitter)" },
              { href: company.socials.youtube, Icon: Youtube, label: "YouTube" },
              { href: company.socials.googleBusiness, Icon: MapPinned, label: "Google Business" },
            ].map(({ href, Icon, label }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-md bg-white/10 hover:bg-brand-gold-500 hover:text-brand-navy-950"
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ) : (
                <span
                  key={label}
                  role="link"
                  aria-disabled="true"
                  aria-label={`${label} — coming soon`}
                  title={`${label} (page coming soon)`}
                  className="p-2 rounded-md bg-white/10 opacity-40 cursor-not-allowed select-none"
                >
                  <Icon size={16} />
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-brand-gold-400 mb-3 text-sm uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/products", label: "Products" },
              { href: "/services", label: "Services" },
              { href: "/certifications", label: "Certifications" },
              { href: "/contact", label: "Contact" },
              { href: "/contact#inquiry", label: "Request a Quote" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 hover:text-brand-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-brand-gold-400 mb-3 text-sm uppercase tracking-wider">
            Registrations
          </h3>
          <ul className="space-y-2 text-sm">
            {certifications.map((c) => (
              <li key={c.code} className="flex items-center gap-2 text-white/70">
                <span aria-hidden="true">{c.logoEmoji}</span>
                <span>
                  {c.name}
                  {c.status !== "active" && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-brand-gold-500/20 text-brand-gold-300">
                      {c.status === "in-progress" ? "In progress" : "Planned"}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-brand-gold-400 mb-3 text-sm uppercase tracking-wider">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-brand-gold-400 shrink-0" />
              <a href={`tel:${company.contact.phone}`} className="hover:text-brand-gold-400">
                {company.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-brand-gold-400 shrink-0" />
              <a
                href={`mailto:${company.contact.email}`}
                className="hover:text-brand-gold-400 break-all"
              >
                {company.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-brand-gold-400 shrink-0" />
              <span>
                {company.contact.address.line1}
                {company.contact.address.city && `, ${company.contact.address.city}`}
                {company.contact.address.country && `, ${company.contact.address.country}`}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>
            Made in India with care. |{" "}
            <Link href="/privacy" className="hover:text-brand-gold-400">
              Privacy
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:text-brand-gold-400">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
