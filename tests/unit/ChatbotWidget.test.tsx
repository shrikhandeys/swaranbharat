import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatbotWidget from "@/components/widgets/ChatbotWidget";

describe("ChatbotWidget", () => {
  it("opens the dialog on toggle click", async () => {
    const user = userEvent.setup();
    render(<ChatbotWidget />);
    await user.click(screen.getByTestId("chatbot-toggle"));
    expect(screen.getByTestId("chatbot-dialog")).toBeInTheDocument();
  });

  it("returns a canned FAQ answer for a known keyword", async () => {
    const user = userEvent.setup();
    render(<ChatbotWidget />);
    await user.click(screen.getByTestId("chatbot-toggle"));

    const input = screen.getByTestId("chatbot-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "what is the MOQ for moringa?" } });
    await user.click(screen.getByTestId("chatbot-send"));

    // FAQ entry "moq" should match
    expect(
      await screen.findByText(/Minimum Order Quantity/i),
    ).toBeInTheDocument();
  });

  it("falls back gracefully for unknown queries", async () => {
    const user = userEvent.setup();
    render(<ChatbotWidget />);
    await user.click(screen.getByTestId("chatbot-toggle"));
    const input = screen.getByTestId("chatbot-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "xyzzy qqqq" } });
    await user.click(screen.getByTestId("chatbot-send"));
    expect(
      await screen.findByText(/connect you directly to our team/i),
    ).toBeInTheDocument();
  });
});
