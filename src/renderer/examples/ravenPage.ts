import type { UIElementNode } from "../types";

/**
 * The Raven — Full Page Render (from the spec)
 *
 * This is the exact JSON provided in section 4.2 of the interview spec.
 * It demonstrates nested composition: Div → Text + Image + Div → Buttons.
 *
 * In production, this would be an API response.
 * Here it simulates what the backend sends to the frontend.
 */

export const ravenPage: UIElementNode = {
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
