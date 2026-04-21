"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { countriesList } from "@/data/countries";
import { products } from "@/data/products";

const userTypes = [
  { value: "buyer", label: "Buyer / Importer / Distributor" },
  { value: "supplier", label: "Supplier / Manufacturer" },
  { value: "agent", label: "Agent / Broker" },
  { value: "retail", label: "Retail Customer" },
  { value: "service", label: "Service Provider (Logistics / Certification / Packaging)" },
  { value: "investor", label: "Investor / Partner" },
  { value: "other", label: "Other" },
] as const;

const businessTypes = ["Importer", "Distributor", "Wholesaler", "Retail Chain", "Other"] as const;
const frequencies = ["One-time", "Monthly", "Quarterly", "Long-term Contract"] as const;

// Base Zod schema — covers every field; conditional fields are optional here
// and enforced on the client via user-type logic before submission.
const inquirySchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(6, "Please enter a valid phone number"),
    country: z.string().min(2, "Please select your country"),

    userType: z.enum([
      "buyer",
      "supplier",
      "agent",
      "retail",
      "service",
      "investor",
      "other",
    ]),

    // Buyer fields
    companyName: z.string().optional().or(z.literal("")),
    businessType: z.string().optional().or(z.literal("")),
    productInterest: z.string().optional().or(z.literal("")),
    quantity: z.string().optional().or(z.literal("")),
    frequency: z.string().optional().or(z.literal("")),
    targetPrice: z.string().optional().or(z.literal("")),
    destinationPort: z.string().optional().or(z.literal("")),

    // Supplier fields
    productOffered: z.string().optional().or(z.literal("")),
    certifications: z.string().optional().or(z.literal("")),
    supplyCapacity: z.string().optional().or(z.literal("")),
    location: z.string().optional().or(z.literal("")),

    // Agent fields
    yearsExperience: z.string().optional().or(z.literal("")),
    regionCovered: z.string().optional().or(z.literal("")),
    previousClients: z.string().optional().or(z.literal("")),

    // Free-form
    message: z.string().min(10, "Please share a few details about your inquiry"),

    // Trust signals
    seriousBuyer: z.boolean().optional(),

    // Honeypot (bots fill this, humans don't)
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine(
    (v) =>
      v.userType !== "buyer" ||
      (!!v.companyName && !!v.productInterest && !!v.quantity),
    {
      message: "Buyers: company, product interest and quantity are required",
      path: ["companyName"],
    }
  )
  .refine(
    (v) =>
      v.userType !== "supplier" ||
      (!!v.companyName && !!v.productOffered && !!v.supplyCapacity),
    {
      message: "Suppliers: company, product offered and capacity are required",
      path: ["productOffered"],
    }
  );

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { userType: "buyer", seriousBuyer: false },
  });

  const userType = watch("userType");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(values: InquiryFormValues) {
    setStatus("idle");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-600/30 bg-green-50 p-8 text-green-900">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0" size={28} />
          <div>
            <h3 className="font-serif text-xl font-bold">Thank you — inquiry received!</h3>
            <p className="mt-2 text-sm">
              Our team will review your requirement and respond within 24 hours. A copy
              has been logged to our inquiry system and our sales team has been alerted.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 space-y-6"
      aria-labelledby="inquiry-heading"
      noValidate
    >
      <div>
        <h2 id="inquiry-heading" className="font-serif text-2xl md:text-3xl font-bold">
          Send us an inquiry
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Tell us about your requirement — our team will get back to you within 24 hours.
          Fields adapt based on your profile for the fastest response.
        </p>
      </div>

      {/* Honeypot — hidden, bots fill it in */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {/* Basic info */}
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
          1. Your details
        </legend>

        <Field label="Full Name *" error={errors.fullName?.message}>
          <input
            type="text"
            {...register("fullName")}
            className={inputClass}
            autoComplete="name"
          />
        </Field>

        <Field label="Email *" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        <Field label="Mobile / WhatsApp *" error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone")}
            className={inputClass}
            placeholder="+91 98XXXXXXXX"
            autoComplete="tel"
          />
        </Field>

        <Field label="Country *" error={errors.country?.message}>
          <select {...register("country")} className={inputClass}>
            <option value="">Select country</option>
            {countriesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {/* User type — single dropdown; sub-fields appear based on selection */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          2. I am a *
        </legend>
        <Field label="Select your profile *" error={errors.userType?.message}>
          <select {...register("userType")} className={inputClass} aria-label="I am a">
            {userTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <p className="text-xs text-[var(--muted-foreground)]">
          We&apos;ll show a short form tailored to your profile so you only fill what&apos;s relevant.
        </p>
      </fieldset>

      {/* Dynamic fields by user type */}
      {userType === "buyer" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Buyer requirement
          </legend>

          <Field label="Company Name *" error={errors.companyName?.message}>
            <input type="text" {...register("companyName")} className={inputClass} />
          </Field>

          <Field label="Business Type">
            <select {...register("businessType")} className={inputClass}>
              <option value="">Select</option>
              {businessTypes.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Product Interest *" error={errors.productInterest?.message}>
            <select {...register("productInterest")} className={inputClass}>
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="Other / Custom">Other / Custom — details below</option>
            </select>
          </Field>

          <Field label="Required Quantity *" error={errors.quantity?.message}>
            <input
              type="text"
              {...register("quantity")}
              className={inputClass}
              placeholder="e.g. 5 MT, 20 ft container"
            />
          </Field>

          <Field label="Frequency">
            <select {...register("frequency")} className={inputClass}>
              <option value="">Select</option>
              {frequencies.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Target Price (optional)">
            <input
              type="text"
              {...register("targetPrice")}
              className={inputClass}
              placeholder="e.g. USD 2.50 / kg CIF"
            />
          </Field>

          <Field label="Destination Port / Country">
            <input type="text" {...register("destinationPort")} className={inputClass} />
          </Field>
        </fieldset>
      )}

      {userType === "supplier" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Supplier profile
          </legend>

          <Field label="Company Name *" error={errors.companyName?.message}>
            <input type="text" {...register("companyName")} className={inputClass} />
          </Field>

          <Field label="Product Offered *" error={errors.productOffered?.message}>
            <input type="text" {...register("productOffered")} className={inputClass} />
          </Field>

          <Field label="Certifications (FSSAI / ISO / APEDA / Organic)">
            <input type="text" {...register("certifications")} className={inputClass} />
          </Field>

          <Field label="Supply Capacity / Month *">
            <input
              type="text"
              {...register("supplyCapacity")}
              className={inputClass}
              placeholder="e.g. 50 MT / month"
            />
          </Field>

          <Field label="Location (City / State)">
            <input type="text" {...register("location")} className={inputClass} />
          </Field>
        </fieldset>
      )}

      {userType === "agent" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Agent / Broker profile
          </legend>

          <Field label="Years of Experience">
            <input type="text" {...register("yearsExperience")} className={inputClass} />
          </Field>

          <Field label="Region Covered">
            <input type="text" {...register("regionCovered")} className={inputClass} />
          </Field>

          <Field label="Company Name">
            <input type="text" {...register("companyName")} className={inputClass} />
          </Field>

          <Field label="Notable Previous Clients (optional)">
            <input type="text" {...register("previousClients")} className={inputClass} />
          </Field>
        </fieldset>
      )}

      {userType === "retail" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. What you need
          </legend>
          <Field label="Product Interest">
            <select {...register("productInterest")} className={inputClass}>
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="Other / Custom">Other / Custom</option>
            </select>
          </Field>
          <Field label="Quantity (small pack size)">
            <input
              type="text"
              {...register("quantity")}
              className={inputClass}
              placeholder="e.g. 500g, 1 kg"
            />
          </Field>
        </fieldset>
      )}

      {userType === "service" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Service provider profile
          </legend>
          <Field label="Company Name">
            <input type="text" {...register("companyName")} className={inputClass} />
          </Field>
          <Field label="Service Offered">
            <input
              type="text"
              {...register("productOffered")}
              className={inputClass}
              placeholder="Logistics / Packaging / Certification / Quality inspection"
            />
          </Field>
          <Field label="Coverage / Region">
            <input type="text" {...register("regionCovered")} className={inputClass} />
          </Field>
          <Field label="Certifications (optional)">
            <input type="text" {...register("certifications")} className={inputClass} />
          </Field>
        </fieldset>
      )}

      {userType === "investor" && (
        <fieldset className="grid gap-4 sm:grid-cols-2 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="col-span-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Investor / Partner profile
          </legend>
          <Field label="Company / Fund">
            <input type="text" {...register("companyName")} className={inputClass} />
          </Field>
          <Field label="Investment range (optional)">
            <input
              type="text"
              {...register("targetPrice")}
              className={inputClass}
              placeholder="e.g. USD 50k – 500k"
            />
          </Field>
          <Field label="Area of interest">
            <input
              type="text"
              {...register("productInterest")}
              className={inputClass}
              placeholder="e.g. Moringa category, processing capacity, export partnership"
            />
          </Field>
          <Field label="LinkedIn / website (optional)">
            <input type="text" {...register("previousClients")} className={inputClass} />
          </Field>
        </fieldset>
      )}

      {userType === "other" && (
        <fieldset className="grid gap-4 rounded-lg bg-[var(--muted)]/50 p-4">
          <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
            3. Tell us a bit more
          </legend>
          <Field label="How can we help?">
            <input
              type="text"
              {...register("productInterest")}
              className={inputClass}
              placeholder="A short description of your interest"
            />
          </Field>
        </fieldset>
      )}

      {/* Message — always shown */}
      <Field label="Message / Additional Details *" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="Share quantity, packaging, destination, timeline, or any other details that help us respond faster."
        />
      </Field>

      {/* Serious buyer checkbox (shown for buyer/agent) */}
      {(userType === "buyer" || userType === "agent") && (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            {...register("seriousBuyer")}
            className="mt-1 h-4 w-4 rounded"
          />
          <span>
            I confirm I am a genuine buyer / agent looking for a real business opportunity.
          </span>
        </label>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-6 py-3 font-semibold text-brand-navy-950 hover:bg-brand-gold-400 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send size={18} /> Submit Inquiry
            </>
          )}
        </button>
        <p className="text-xs text-[var(--muted-foreground)]">
          Phase 2 will add mobile OTP verification and reCAPTCHA for stronger spam protection.
        </p>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-brand-gold-500 focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      <span className="block mb-1">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
