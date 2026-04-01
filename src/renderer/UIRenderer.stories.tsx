import type { Meta, StoryObj } from "@storybook/react-vite";
import { UIRenderer } from "./UIRenderer";
import { registerDefaultElements } from "./registerDefaultElements";
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
 * Demonstrates nested composition: Div → Text + Image + Div → Buttons.
 */
const ravenPage: UIElementNode = {
  type: "div",
  style: { display: "grid", gap: "4rem" },
  children: [
    { type: "text", text: "<h1>The raven</h1>", format: "html" },
    {
      type: "image",
      image: {
        url: "https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "A raven at autumn",
        caption: "Credits to Paddy Pohlog | Unsplash",
      },
    },
    {
      type: "text",
      text: "<p>Once upon a midnight dreary</p>",
      format: "html",
    },
    {
      type: "div",
      style: {
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          type: "button",
          button: {
            label: "Leave a review",
            title: "Proceed to the click trap",
            variant: "primary",
            url: "https://youtu.be/dQw4w9WgXcQ",
            target: "_blank",
          },
        },
        {
          type: "button",
          button: {
            label: "See more",
            title: "Proceed to the click trap",
            variant: "secondary",
            url: "https://youtu.be/dQw4w9WgXcQ",
            target: "",
          },
        },
      ],
    },
  ],
};

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
          button: { label: "", title: "", variant: "primary", url: "", target: "" },
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
