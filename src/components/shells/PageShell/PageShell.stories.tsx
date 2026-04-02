import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageShell } from "./PageShell";
import { UIRenderer } from "../../../renderer/UIRenderer";
import { registerDefaultElements } from "../../../renderer/registerDefaultElements";
import { ravenPage } from "../../../renderer/examples/ravenPage";

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

/**
 * Full page — the spec's JSON projected inside a page shell.
 * Data lives in `renderer/examples/ravenPage.ts` — the shell just frames it.
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
