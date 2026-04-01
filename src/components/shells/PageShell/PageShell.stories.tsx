import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageShell } from "./PageShell";
import { UIRenderer } from "../../../renderer/UIRenderer";
import { registerDefaultElements } from "../../../renderer/registerDefaultElements";
import type { UIElementNode } from "../../../renderer/types";

registerDefaultElements();

/**
 * PageShell Stories
 *
 * Demonstrates the Framed Projection Architecture:
 * - The shell defines the structural frame (header, nav, content area)
 * - The UIRenderer projects backend-described elements into the content area
 * - The same JSON can be projected inside any shell
 */

const meta: Meta<typeof PageShell> = {
  title: "Shells/PageShell",
  component: PageShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

// The same JSON from the spec — projected inside a shell
const ravenPage: UIElementNode = {
  type: "div",
  style: { display: "grid", gap: "2.5rem" },
  children: [
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
      text: "<p>Once upon a midnight dreary, while I pondered, weak and weary, over many a quaint and curious volume of forgotten lore.</p>",
      format: "html",
    },
    {
      type: "div",
      style: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
      },
      children: [
        {
          type: "button",
          button: {
            label: "Leave a review",
            title: "Proceed to the click trap",
            variant: "primary",
            url: "https://www.youtube.com/watch?v=ZOdXY39Yhg0&t=507s",
            target: "_blank",
          },
        },
        {
          type: "button",
          button: {
            label: "See more",
            title: "Proceed to the click trap",
            variant: "secondary",
            url: "https://www.youtube.com/watch?v=ZOdXY39Yhg0&t=507s",
            target: "",
          },
        },
      ],
    },
  ],
};

/**
 * Full page — the spec's JSON projected inside a page shell.
 * The shell owns the frame (header, nav). The renderer fills the content.
 */
export const WithProjectedContent: Story = {
  render: () => (
    <PageShell title="The Raven" subtitle="A poem by Edgar Allan Poe">
      <UIRenderer node={ravenPage} />
    </PageShell>
  ),
};

/**
 * Empty shell — the frame without any projected content.
 * Shows that the shell stands on its own as a layout structure.
 */
export const EmptyShell: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Welcome back",
    children: null,
  },
};
