"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { company } from "@/data/company";
import { faqEntries, matchFaq } from "@/data/faq";

type Msg = { id: string; role: "bot" | "user"; text: string };

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "bot",
      text: `Hi! I'm the ${company.shortName} assistant. Ask me about our products, MOQ, shipping, certifications, or contact options.`,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: clean };
    const botMsg: Msg = { id: `b-${Date.now()}`, role: "bot", text: matchFaq(clean) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  const whatsappNumber = company.contact.whatsapp.replace(/[^0-9]/g, "");
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    company.whatsappDefaultMessage,
  )}`;
  const mailHref = `mailto:${company.contact.salesEmail}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        data-testid="chatbot-toggle"
        className="fixed bottom-[88px] right-5 z-[55] flex items-center gap-2 rounded-full bg-brand-navy-900 px-4 py-3 text-white shadow-lg shadow-black/20 ring-1 ring-white/10 hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold-400/50 transition-transform"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Bot size={22} aria-hidden="true" />}
        <span className="hidden sm:inline text-sm font-semibold">
          {open ? "Close" : "Ask our assistant"}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Swaranbharat chat assistant"
          data-testid="chatbot-dialog"
          className="fixed bottom-[152px] right-3 sm:right-5 z-[70] w-[min(380px,calc(100vw-1.5rem))] max-h-[65vh] flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-2xl"
        >
          <header className="flex items-center justify-between gap-2 rounded-t-xl bg-brand-navy-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{company.shortName} assistant</p>
                <p className="text-[11px] text-white/70">FAQ • responds instantly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded p-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-sm"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "bot" && (
                  <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand-gold-500 text-brand-navy-950 flex items-center justify-center">
                    <Bot size={14} aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-gold-500 text-brand-navy-950"
                      : "bg-[var(--muted)] text-[var(--foreground)]"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand-navy-900 text-white flex items-center justify-center">
                    <User size={14} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] px-3 py-2">
            <div className="flex flex-wrap gap-1 pb-2">
              {faqEntries.slice(0, 6).map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => send(e.label)}
                  className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-[11px] hover:border-brand-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
                >
                  {e.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="chatbot-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, MOQ, shipping…"
                className="flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-brand-gold-500 focus:outline-none"
                data-testid="chatbot-input"
              />
              <button
                type="submit"
                aria-label="Send"
                data-testid="chatbot-send"
                className="rounded-md bg-brand-navy-900 p-2 text-white hover:bg-brand-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-1">
                <MessageCircle size={12} aria-hidden="true" /> Need a human?
              </span>
              <span className="space-x-2">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-gold-600">
                  WhatsApp
                </a>
                <a href={mailHref} className="underline hover:text-brand-gold-600">
                  Email
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
