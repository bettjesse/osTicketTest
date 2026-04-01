import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/**
 * Button Stories
 *
 * Each export below is a "story" — one specific state of the Button.
 * Storybook renders each one as an interactive example.
 *
 * `Meta` tells Storybook:
 *   - what component this file documents
 *   - where to put it in the sidebar (title)
 *   - default args shared across stories
 *
 * `StoryObj` is a single render case with specific props.
 */

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary variant — the main call-to-action button.
 * Uses the exact JSON shape from the spec.
 */
export const Primary: Story = {
  args: {
    data: {
      label: "Continue",
      title: "Proceed to the next step",
      variant: "primary",
      url: "https://youtu.be/dQw4w9WgXcQ",
      target: "_blank",
    },
  },
};

/**
 * Secondary variant — a less prominent action.
 */
export const Secondary: Story = {
  args: {
    data: {
      label: "See more",
      title: "Proceed to the click trap",
      variant: "secondary",
      url: "https://youtu.be/dQw4w9WgXcQ",
      target: "",
    },
  },
};

/**
 * Both variants side by side — mirrors the spec's full page example
 * where "Leave a review" (primary) and "See more" (secondary) appear together.
 */
export const ButtonPair: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Button
        data={{
          label: "Leave a review",
          title: "Proceed to the click trap",
          variant: "primary",
          url: "https://youtu.be/dQw4w9WgXcQ",
          target: "_blank",
        }}
      />
      <Button
        data={{
          label: "See more",
          title: "Proceed to the click trap",
          variant: "secondary",
          url: "https://youtu.be/dQw4w9WgXcQ",
          target: "",
        }}
      />
    </div>
  ),
};
