import type { Meta, StoryObj } from "@storybook/react-vite";
import { Div } from "./Div";
import { registerDefaultElements } from "../../../renderer/registerDefaultElements";

// Register all element types so the recursive renderer works in Storybook
registerDefaultElements();

/**
 * Div Stories
 *
 * The Div is a layout container whose children are rendered recursively.
 * The backend controls layout via the `style` prop (flexbox, grid, gap, etc.).
 */

const meta: Meta<typeof Div> = {
  title: "Primitives/Div",
  component: Div,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Div>;

/**
 * Flex row — two buttons side by side, matching the spec's button pair layout.
 */
export const FlexRow: Story = {
  args: {
    data: {
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
  },
};

/**
 * Flex column — stacked text elements.
 */
export const FlexColumn: Story = {
  args: {
    data: {
      type: "div",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      },
      children: [
        { type: "text", text: "<h2>Stacked Layout</h2>", format: "html" },
        {
          type: "text",
          text: "<p>Elements arranged vertically by the backend.</p>",
          format: "html",
        },
      ],
    },
  },
};
