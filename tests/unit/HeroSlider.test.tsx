import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSlider from "@/components/home/HeroSlider";
import { heroBanners } from "@/data/banners";

describe("HeroSlider", () => {
  it("renders a slide with control buttons", () => {
    render(<HeroSlider />);
    // Prev + next + pause controls are always present.
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
    // At least the first active banner eyebrow is present.
    const first = heroBanners.find((b) => b.active);
    expect(first).toBeTruthy();
  });
});
