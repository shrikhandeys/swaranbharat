import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { company } from "../data/company";

// Web3Forms access key (free tier: 250 submissions/month). Replace the value in
// env (VITE_WEB3FORMS_KEY) with your own key from https://web3forms.com/ when
// deploying — otherwise the form falls back to a mailto: link.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [params] = useSearchParams();
  const initialProduct = params.get("product") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState(
    initialProduct ? `Inquiry: ${initialProduct}` : "",
  );

  useEffect(() => {
    if (initialProduct) setSubject(`Inquiry: ${initialProduct}`);
  }, [initialProduct]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    if (!ACCESS_KEY) {
      // Fallback: open mailto if no Web3Forms key is configured at build time.
      const body = [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `Country: ${data.get("country")}`,
        `Subject: ${data.get("subject")}`,
        "",
        String(data.get("message") ?? ""),
      ].join("\n");
      window.location.href =
        `mailto:${company.contact.salesEmail}` +
        `?subject=${encodeURIComponent(String(data.get("subject") ?? "Inquiry"))}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus("success");
      form.reset();
      return;
    }

    data.append("access_key", ACCESS_KEY);
    data.append("from_name", company.name);
    data.append("subject", String(data.get("subject") ?? "Website Inquiry"));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (json.success) {
        setStatus("success");
        form.reset();
        setSubject("");
      } else {
        setStatus("error");
        setError(json.message ?? "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again or email us directly.");
    }
  }

  const a = company.contact.address;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-narrow py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Tell us about your requirement — product, quantity, packaging,
            destination — and we&apos;ll get back with a quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-narrow grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <form onSubmit={onSubmit} className="card grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone / WhatsApp" name="phone" />
                <Field label="Country" name="country" />
              </div>
              <Field
                label="Subject"
                name="subject"
                value={subject}
                onChange={(v) => setSubject(v)}
              />
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Product, quantity, packaging, destination port, target price…"
                  className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>

              {/* Honeypot (anti-spam) — must stay hidden */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-slate-500">
                  We respect your privacy. Your details are used only to respond to
                  your inquiry.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send inquiry"}
                </button>
              </div>

              {status === "success" && (
                <div className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-800 ring-1 ring-brand-100">
                  Thanks! We&apos;ve received your inquiry and will reply within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                  {error ?? "Something went wrong."}
                </div>
              )}
            </form>
          </div>

          <aside className="space-y-4 md:col-span-2">
            <div className="card">
              <h3 className="text-base font-semibold">Email</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                <li>
                  Sales:{" "}
                  <a
                    href={`mailto:${company.contact.salesEmail}`}
                    className="text-brand-700 hover:text-brand-800"
                  >
                    {company.contact.salesEmail}
                  </a>
                </li>
                <li>
                  General:{" "}
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="text-brand-700 hover:text-brand-800"
                  >
                    {company.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base font-semibold">Phone & WhatsApp</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                <li>
                  <a
                    href={`tel:${company.contact.phoneRaw}`}
                    className="text-brand-700 hover:text-brand-800"
                  >
                    {company.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${company.contact.phoneRaw.replace("+", "")}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-700 hover:text-brand-800"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base font-semibold">Office</h3>
              <address className="mt-3 not-italic text-sm text-slate-700">
                {a.line1}<br />
                {a.line2}<br />
                {a.city}, {a.state} {a.pincode}<br />
                {a.country}
              </address>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
};

function Field({ label, name, type = "text", required, value, onChange }: FieldProps) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        {...(controlled
          ? { value, onChange: (e) => onChange!(e.target.value) }
          : {})}
        className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}
