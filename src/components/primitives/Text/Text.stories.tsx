import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

/**
 * Text Stories
 *
 * Demonstrates all three text formats: HTML, plain text, and Markdown.
 * Each story uses data matching the spec's JSON contract.
 */

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * HTML format — the exact example from the spec.
 * The backend sends raw HTML, we sanitize and render it.
 */
export const HTML: Story = {
  args: {
    data: {
      type: "text",
      text: "<p> this markup can be plainText, html or markdown </p>",
      format: "html",
    },
  },
};

/**
 * HTML heading — from the full page render example.
 */
export const HTMLHeading: Story = {
  args: {
    data: {
      type: "text",
      text: "<h1>The raven</h1>",
      format: "html",
    },
  },
};

/**
 * Plain text — rendered as a simple string, no parsing needed.
 */
export const PlainText: Story = {
  args: {
    data: {
      type: "text",
      text: "Once upon a midnight dreary, while I pondered, weak and weary.",
      format: "plainText",
    },
  },
};

/**
 * Markdown format — converted to HTML via `marked`, then sanitized.
 */
export const Markdown: Story = {
  args: {
    data: {
      type: "text",
      text: "# The Raven\n\n**By Edgar Allan Poe**\n\nOnce upon a midnight dreary, while I pondered, *weak and weary*.",
      format: "markdown",
    },
  },
};

/**
 * With inline style — backend can override styles via the optional `style` prop.
 */
export const WithStyle: Story = {
  args: {
    data: {
      type: "text",
      text: "<p>Styled by the backend</p>",
      format: "html",
      style: { color: "crimson", fontStyle: "italic", textAlign: "center" },
    },
  },
};
