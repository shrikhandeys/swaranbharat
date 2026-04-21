import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { company } from "../data/company";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Socials = { label: string; url: string; icon: JSX.Element };

const socialIcon = {
  facebook: (
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V14h2.7v8h3.1z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" />
    </>
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
  ),
  twitter: (
    <path d="M18.9 4.5h2.9l-6.3 7.2 7.4 9.8h-5.8l-4.5-6-5.2 6H4.5l6.7-7.7L4 4.5h5.9l4.1 5.4 4.9-5.4zm-1 15.2h1.6L7.1 6.1H5.4l13.5 13.6z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
  ),
} satisfies Record<keyof typeof company.socials, JSX.Element>;

function getSocials(): Socials[] {
  const map: Record<keyof typeof company.socials, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    twitter: "Twitter / X",
    youtube: "YouTube",
  };
  return (Object.keys(map) as Array<keyof typeof company.socials>)
    .filter((k) => company.socials[k])
    .map((k) => ({ label: map[k], url: company.socials[k], icon: socialIcon[k] }));
}

export default function Footer() {
  const year = new Date().getFullYear();
  const a = company.contact.address;
  const socials = getSocials();
  const whatsappLink = `https://wa.me/${company.contact.phoneRaw.replace("+", "")}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`;

  return (
    <footer className="border-t border-slate-200 bg-white">
      <NewsletterBanner />

      <div className="container-narrow grid gap-10 py-14 md:grid-cols-12">
        {/* Brand + socials */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src="logo.png"
              alt=""
              className="h-14 w-20 rounded-md object-cover shadow-sm ring-1 ring-brand-200"
            />
            <div className="leading-tight">
              <div className="text-base font-bold tracking-wide text-brand-800">
                SWARANBHARAT
              </div>
              <div className="text-xs font-medium text-gold-600">
                ExportSarathi
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-600">
            Premium Indian dehydrated agri-products — sourced from FSSAI-certified
            manufacturers and shipped worldwide.
          </p>

          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition hover:bg-brand-100 hover:text-brand-800"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigate */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-700">About Us</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Products</Link></li>
            <li><Link to="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-slate-900">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/products" className="hover:text-brand-700">Super-Food Powders</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Dehydrated Vegetable Powders</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Flakes & Granules</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Herbs & Leaves</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Spices & Masala</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Instant Mixes</Link></li>
          </ul>
        </div>

        {/* Get in touch */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-slate-900">Get in touch</h4>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Email
              </dt>
              <dd className="mt-0.5 text-slate-700">
                <a href={`mailto:${company.contact.salesEmail}`} className="hover:text-brand-700">
                  {company.contact.salesEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Phone
              </dt>
              <dd className="mt-0.5 text-slate-700">
                <a href={`tel:${company.contact.phoneRaw}`} className="hover:text-brand-700">
                  {company.contact.phone}
                </a>
                <span className="mx-1.5 text-slate-300">·</span>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-brand-700">
                  WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Timings
              </dt>
              <dd className="mt-0.5 text-slate-700">
                {company.hours.timings}
                <br />
                <span className="text-slate-500">({company.hours.days})</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Office
              </dt>
              <dd className="mt-0.5 not-italic text-slate-700">
                <address className="not-italic">
                  {a.line1},
                  <br />
                  {a.line2},
                  <br />
                  {a.city}, {a.state} {a.pincode}, {a.country}
                </address>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p>Pune · India · Exporting worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

function NewsletterBanner() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setError(null);

    if (!ACCESS_KEY) {
      window.location.href =
        `mailto:${company.contact.salesEmail}` +
        `?subject=${encodeURIComponent("Newsletter sign-up")}` +
        `&body=${encodeURIComponent(`Please add me to the Swaranbharat updates list: ${email}`)}`;
      setStatus("success");
      setEmail("");
      return;
    }

    const data = new FormData();
    data.append("access_key", ACCESS_KEY);
    data.append("from_name", company.name);
    data.append("subject", "Newsletter sign-up");
    data.append("email", email);
    data.append("message", `Newsletter sign-up from website footer: ${email}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (json.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setError(json.message ?? "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section className="bg-brand-50/70 border-y border-brand-100">
      <div className="container-narrow grid items-center gap-6 py-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Sign up to get updates
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            New products, harvest updates and export insights — once a month, no spam.
          </p>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address…"
                className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          {status === "success" && (
            <p className="mt-2 text-xs text-brand-700">
              Thanks! We&apos;ll keep you posted.
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
