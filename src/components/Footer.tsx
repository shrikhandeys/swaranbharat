import { Link } from "react-router-dom";
import { company } from "../data/company";

export default function Footer() {
  const year = new Date().getFullYear();
  const a = company.contact.address;
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-narrow grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src="logo.png" alt="" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                {company.shortName}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700">
                Exportsarathi
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">{company.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
            <li><Link to="/products" className="hover:text-brand-700">Products</Link></li>
            <li><Link to="/about" className="hover:text-brand-700">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href={`mailto:${company.contact.email}`} className="hover:text-brand-700">
                {company.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${company.contact.phoneRaw}`} className="hover:text-brand-700">
                {company.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${company.contact.phoneRaw.replace("+", "")}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-700"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Address</h4>
          <address className="mt-3 not-italic text-sm text-slate-600">
            {a.line1}<br />
            {a.line2}<br />
            {a.city}, {a.state} {a.pincode}<br />
            {a.country}
          </address>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>Pune · India · Exporting worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
