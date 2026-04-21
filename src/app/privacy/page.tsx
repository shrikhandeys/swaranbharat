import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${company.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect the information you share with us."
      />
      <section className="py-12 md:py-16">
        <div className="container-x prose prose-slate max-w-3xl">
          <p>
            {company.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects
            your privacy. This policy explains what information we collect through
            our website <strong>{company.domain}</strong> and how we use it.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Inquiry form data:</strong> name, email, phone, country,
              company details, product interest, quantity, and any additional
              details you share in the inquiry form.
            </li>
            <li>
              <strong>Technical data:</strong> IP address and browser user-agent —
              used only to prevent spam and abuse.
            </li>
          </ul>

          <h2>2. How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and prepare quotations.</li>
            <li>To manage our sales pipeline and follow-up communication.</li>
            <li>To improve our website and service quality.</li>
            <li>To comply with applicable legal and export regulations.</li>
          </ul>

          <h2>3. How we store your information</h2>
          <p>
            Inquiries are stored on our own servers and are not sold or shared with
            third parties. In Phase 3 of our platform we will integrate Zoho CRM
            for lead management — your data will then also be stored inside our
            Zoho CRM account under the same principles.
          </p>

          <h2>4. Your rights</h2>
          <p>
            You can ask us at any time to access, correct or delete your personal
            data. Contact <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use a minimal set of cookies / local-storage for essential
            accessibility preferences (font size, theme) and, if enabled, Google
            Translate. No advertising cookies are set.
          </p>

          <h2>6. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be
            announced on this page.
          </p>

          <p className="text-sm text-[var(--muted-foreground)]">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
        </div>
      </section>
    </>
  );
}
