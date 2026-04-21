"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

/**
 * Floating WhatsApp button — fixed bottom-right, visible on every page.
 * Opens WhatsApp with a pre-filled message so buyers can start the conversation instantly.
 */
export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const number = company.contact.whatsapp.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(company.whatsappDefaultMessage);
  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${company.shortName} on WhatsApp`}
      data-testid="whatsapp-button"
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 ring-1 ring-black/10 hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 transition-transform"
    >
      {/* Official WhatsApp mark (inline SVG — no external asset required) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78.573.847 1.275 1.593 2.077 2.193.978.688 2.13 1.233 3.305 1.418.36.058.732.058 1.088.058.616 0 1.43-.287 1.76-.803a.842.842 0 0 0 .186-.516c0-.09-.33-.187-.646-.33zM15.92 30.42c-2.38 0-4.734-.6-6.797-1.733L3 30l1.445-5.796A13.81 13.81 0 0 1 2 16c0-7.687 6.233-13.92 13.92-13.92S29.84 8.313 29.84 16 23.607 29.92 15.92 29.92zm0-2.35c6.393 0 11.58-5.186 11.58-11.58S22.313 4.43 15.92 4.43 4.34 9.617 4.34 16c0 2.2.616 4.247 1.69 6.007l-.906 3.636 3.696-.977a11.52 11.52 0 0 0 7.1 2.404z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold">Chat on WhatsApp</span>
    </a>
  );
}

// Silence unused-import warning when MessageCircle isn't used;
// kept import available for potential future variants.
void MessageCircle;
