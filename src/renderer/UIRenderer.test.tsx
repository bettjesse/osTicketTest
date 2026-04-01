/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { UIRenderer } from "./UIRenderer";
import { registerDefaultElements } from "./registerDefaultElements";
import type { UIElementNode } from "./types";

// Register all element types before tests run
registerDefaultElements();

describe("UIRenderer", () => {
  afterEach(() => {
    cleanup();
  });

  // ─── Valid Input ────────────────────────────────────────────────

  it("renders a button from valid JSON", () => {
    const node: UIElementNode = {
      type: "button",
      button: {
        label: "Continue",
        title: "Proceed to the next step",
        variant: "primary",
        url: "https://example.com",
        target: "_blank",
      },
    };

    render(<UIRenderer node={node} />);
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("renders text from valid JSON", () => {
    const node: UIElementNode = {
      type: "text",
      text: "<p>Hello world</p>",
      format: "html",
    };

    render(<UIRenderer node={node} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders nested children recursively", () => {
    const node: UIElementNode = {
      type: "div",
      style: { display: "flex" },
      children: [
        { type: "text", text: "First", format: "plainText" },
        { type: "text", text: "Second", format: "plainText" },
      ],
    };

    render(<UIRenderer node={node} />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  // ─── Graceful Error Handling ────────────────────────────────────

  it("shows an error for unknown element types", () => {
    const node = {
      type: "video",
      src: "https://example.com/video.mp4",
    } as unknown as UIElementNode;

    render(<UIRenderer node={node} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/unknown element type/i)).toBeInTheDocument();
  });

  it("shows an error for null nodes", () => {
    render(<UIRenderer node={null as unknown as UIElementNode} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders valid siblings even when one node is invalid", () => {
    const node: UIElementNode = {
      type: "div",
      style: { display: "flex", flexDirection: "column" },
      children: [
        { type: "text", text: "<p>I am valid</p>", format: "html" },
        { type: "chart", data: [1, 2, 3] } as unknown as UIElementNode,
        { type: "text", text: "<p>Also valid</p>", format: "html" },
      ],
    };

    render(<UIRenderer node={node} />);

    // Valid nodes still render
    expect(screen.getByText("I am valid")).toBeInTheDocument();
    expect(screen.getByText("Also valid")).toBeInTheDocument();

    // Invalid node shows error, doesn't crash
    expect(screen.getAllByRole("alert")).toHaveLength(1);
  });
});
