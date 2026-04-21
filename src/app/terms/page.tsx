import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${company.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms under which you may use this website and our services."
      />
      <section className="py-12 md:py-16">
        <div className="container-x prose prose-slate max-w-3xl">
          <p>
            By accessing or using <strong>{company.domain}</strong> you agree to
            these terms.
          </p>

          <h2>1. Use of the site</h2>
          <p>
            The content on this site — product descriptions, images, graphics,
            logos — is for general informational purposes. Product specifications
            and pricing are indicative and confirmed only in a written quotation.
          </p>

          <h2>2. Inquiries and quotations</h2>
          <p>
            Submitting an inquiry does not constitute a purchase order or a
            binding contract. Binding commercial terms are established only upon
            a signed proforma invoice / purchase order.
          </p>

          <h2>3. Intellectual property</h2>
          <p>
            All branding, images and text on this website are the property of{" "}
            {company.name} or their respective owners and may not be reused
            without permission.
          </p>

          <h2>4. Limitation of liability</h2>
          <p>
            We are not liable for any indirect or consequential loss arising from
            use of this website. For contractual supply terms please refer to the
            formal purchase documents.
          </p>

          <h2>5. Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Disputes are subject to
            the exclusive jurisdiction of the courts at Pune, Maharashtra.
          </p>

          <p className="text-sm text-[var(--muted-foreground)]">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
        </div>
      </section>
    </>
  );
}
