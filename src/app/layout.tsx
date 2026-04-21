import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccessibilityInit from "@/components/layout/AccessibilityInit";
import LazyWidgets from "@/components/widgets/LazyWidgets";
import { company } from "@/data/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "merchant exporter India",
    "Swaranbharat Exportsarathi",
    "moringa leaf powder exporter",
    "dehydrated onion powder exporter",
    "dehydrated garlic powder exporter",
    "dehydrated vegetable powder India",
    "dehydrated onion flakes exporter",
    "curry leaves powder exporter",
    "super-food powders India",
    "FSSAI APEDA exporter Pune",
    "sourcing from India",
    "global trade partner",
  ],
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
    type: "website",
    locale: "en_IN",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <AccessibilityInit />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <LazyWidgets />

        {/* Google Translate element (hidden; we mount a styled dropdown via TranslateWidget) */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,mr,gu,ta,te,kn,ml,bn,pa,ur,ar,zh-CN,fr,de,es,ru,ja,ko,pt,it,nl',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                },
                'google_translate_element'
              );
            };
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
