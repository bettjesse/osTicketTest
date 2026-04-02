import type { Meta, StoryObj } from "@storybook/react-vite";
import { UIRenderer } from "./UIRenderer";
import { registerDefaultElements } from "./registerDefaultElements";
import { supportTicket } from "./examples/supportTicket";

registerDefaultElements();

/**
 * Creative Example — Support Ticket View
 *
 * This demonstrates the separation of concerns at the heart of the architecture:
 *
 *   - **Data** (`examples/supportTicket.ts`) — the structured JSON payload,
 *     representing what the backend would return for a ticket detail view.
 *
 *   - **Renderer** (`UIRenderer`) — the projection engine that interprets
 *     the data into a visual experience. It doesn't know what a "ticket" is.
 *
 * No new components were needed. The existing four primitives (text, image,
 * div, button) compose into a full ticket UI — header, messages, agent
 * response, and action buttons — purely through structured data.
 *
 * This is exactly how osTicket 2.0 would work: the platform generates
 * the JSON for a ticket page, and the frontend projects it.
 */

const meta: Meta = {
  title: "Renderer/Creative Example",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/**
 * Support Ticket — data in, interface out.
 *
 * The JSON lives in `examples/supportTicket.ts` (simulating a backend response).
 * The story simply passes it to the renderer. One line of rendering code.
 */
export const SupportTicket: Story = {
  render: () => <UIRenderer node={supportTicket} />,
};
