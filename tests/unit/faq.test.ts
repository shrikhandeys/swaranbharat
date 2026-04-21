import { describe, it, expect } from "vitest";
import { faqEntries, fallbackAnswer, matchFaq } from "@/data/faq";

describe("FAQ matcher", () => {
  it.each([
    ["hi there!", "greeting"],
    ["what products do you export?", "products"],
    ["please share your MOQ", "moq"],
    ["do you ship to europe?", "shipping"],
    ["send me a quotation", "pricing"],
    ["can i get a sample?", "samples"],
    ["what certifications do you have?", "certifications"],
    ["your phone number?", "contact"],
    ["office hours?", "hours"],
    ["payment terms?", "payment"],
    ["I am a supplier", "supplier"],
  ])("matches %s to the %s entry", (q, id) => {
    const entry = faqEntries.find((e) => e.id === id)!;
    expect(matchFaq(q)).toBe(entry.answer);
  });

  it("returns fallback for unknown queries", () => {
    expect(matchFaq("qqqq zzzz 12345")).toBe(fallbackAnswer);
  });
});
