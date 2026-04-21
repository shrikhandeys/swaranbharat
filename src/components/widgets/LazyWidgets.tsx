"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Defer loading the chat + WhatsApp widgets until the browser is idle
// (or 2s after first paint at the latest). This keeps TTI fast on slow
// mobile networks — the hero/above-the-fold content is interactive well
// before the chat JS even begins downloading.

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), {
  ssr: false,
  loading: () => null,
});
const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), {
  ssr: false,
  loading: () => null,
});

export default function LazyWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const idle = (cb: () => void) => {
      type RIC = (cb: () => void, opts?: { timeout: number }) => number;
      const ric = (window as unknown as { requestIdleCallback?: RIC }).requestIdleCallback;
      if (typeof ric === "function") ric(cb, { timeout: 2000 });
      else setTimeout(cb, 1500);
    };

    idle(() => setReady(true));
  }, []);

  if (!ready) return null;
  return (
    <>
      <WhatsAppButton />
      <ChatbotWidget />
    </>
  );
}
