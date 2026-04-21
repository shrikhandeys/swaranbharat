import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import { company } from "@/data/company";

describe("WhatsAppButton", () => {
  it("renders a link pointing to the company WhatsApp number with prefilled text", () => {
    render(<WhatsAppButton />);
    const link = screen.getByTestId("whatsapp-button") as HTMLAnchorElement;
    const num = company.contact.whatsapp.replace(/[^0-9]/g, "");
    expect(link.getAttribute("href")).toContain(`wa.me/${num}`);
    expect(link.getAttribute("href")).toContain(
      encodeURIComponent(company.whatsappDefaultMessage).slice(0, 20),
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
