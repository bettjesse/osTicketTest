import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "./Image";

/**
 * Image Stories
 *
 * Demonstrates the image component with and without captions.
 * Uses the exact data from the spec's JSON examples.
 */

const meta: Meta<typeof Image> = {
  title: "Primitives/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

/**
 * With caption — the exact example from the spec.
 */
export const WithCaption: Story = {
  args: {
    data: {
      url: "https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "A raven at autumn",
      caption: "Credits to Paddy Pohlog | Unsplash",
    },
  },
};

/**
 * Without caption — caption is optional per the type definition.
 */
export const WithoutCaption: Story = {
  args: {
    data: {
      url: "https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "A raven at autumn",
    },
  },
};

/**
 * Spec example — the exact image JSON from the interview spec (section 4.1).
 */
export const SpecExample: Story = {
  args: {
    data: {
      url: "https://unsplash.com/es/fotos/estatua-de-hormigon-gris-en-campo-de-hierba-verde-durante-el-dia-Ga8VvtQYz_s",
      alt: "Gil Scott-Heron",
      caption: "Will not be televised",
    },
  },
};
