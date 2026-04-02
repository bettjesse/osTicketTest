import type { Meta, StoryObj } from "@storybook/react-vite";
import { UIRenderer } from "./UIRenderer";
import { registerDefaultElements } from "./registerDefaultElements";
import { ravenPage } from "./examples/ravenPage";
import type { UIElementNode } from "./types";

// Register all element types
registerDefaultElements();

/**
 * UIRenderer Stories
 *
 * The UIRenderer is the core projection engine. It takes a JSON node
 * and renders it by looking up the `type` in the component registry.
 *
 * These stories demonstrate:
 * - Individual elements rendered through the engine
 * - The full page render from the spec (nested Div with all element types)
 * - Graceful error handling for unknown types
 */

const meta: Meta<typeof UIRenderer> = {
  title: "Renderer/UIRenderer",
  component: UIRenderer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof UIRenderer>;

// ─── Individual Elements Through the Renderer ─────────────────────

/** A single button rendered through the engine. */
export const SingleButton: Story = {
  args: {
    node: {
      type: "button",
      button: {
        label: "Continue",
        title: "Proceed to the next step",
        variant: "primary",
        url: "https://youtu.be/dQw4w9WgXcQ",
        target: "_blank",
      },
    },
  },
};

// ─── Full Page Render (from the spec) ─────────────────────────────

/**
 * The Raven — the exact full page JSON from the interview spec.
 * Data lives in `examples/ravenPage.ts` — simulating a backend response.
 * Demonstrates nested composition: Div → Text + Image + Div → Buttons.
 */
export const TheRaven: Story = {
  args: {
    node: ravenPage,
  },
};

// ─── Error Handling ───────────────────────────────────────────────

/**
 * Unknown type — shows graceful error instead of crashing.
 * This proves the system handles invalid data from the backend safely.
 */
export const UnknownType: Story = {
  args: {
    node: {
      type: "video",
      src: "https://example.com/video.mp4",
    } as unknown as UIElementNode,
  },
};

/**
 * Mixed valid and invalid — one bad node doesn't break the others.
 */
export const MixedValidAndInvalid: Story = {
  args: {
    node: {
      type: "div",
      style: { display: "flex", flexDirection: "column", gap: "1rem" },
      children: [
        { type: "text", text: "<p>This renders fine</p>", format: "html" },
        {
          type: "chart",
          data: [1, 2, 3],
        } as unknown as UIElementNode,
        {
          type: "text",
          text: "<p>This also renders fine</p>",
          format: "html",
        },
      ],
    },
  },
};

/**
 * Missing required fields — components validate their data
 * and show helpful errors instead of rendering broken UI.
 */
export const MissingRequiredFields: Story = {
  args: {
    node: {
      type: "div",
      style: { display: "flex", flexDirection: "column", gap: "1rem" },
      children: [
        {
          type: "button",
          button: {
            label: "",
            title: "",
            variant: "primary",
            url: "",
            target: "",
          },
        },
        {
          type: "image",
          image: { url: "", alt: "" },
        } as unknown as UIElementNode,
        {
          type: "text",
          text: "",
          format: "html",
        } as unknown as UIElementNode,
        {
          type: "text",
          text: "<p>Only this element is valid</p>",
          format: "html",
        },
      ],
    },
  },
};
