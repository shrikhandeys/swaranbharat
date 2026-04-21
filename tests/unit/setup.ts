import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// jsdom doesn't implement these; stub so components relying on them
// (e.g. IntersectionObserver, matchMedia) don't throw during tests.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  const w = window as unknown as Record<string, unknown>;
  w.IntersectionObserver = MockIntersectionObserver;
  w.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  w.requestIdleCallback = (cb: () => void) => setTimeout(cb, 0);
  w.cancelIdleCallback = (id: number) => clearTimeout(id);
}

// next/image relies on an internal loader that isn't available in jsdom —
// mock it to a plain <img> so components render without errors.
vi.mock("next/image", async () => {
  const React = await import("react");
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => {
      const { src, alt = "", width, height, fill: _fill, priority: _priority, sizes: _sizes, ...rest } =
        props as {
          src?: string;
          alt?: string;
          width?: number;
          height?: number;
          fill?: boolean;
          priority?: boolean;
          sizes?: string;
        };
      return React.createElement("img", { src, alt, width, height, ...rest });
    },
  };
});
