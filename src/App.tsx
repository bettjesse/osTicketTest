import { UIRenderer } from "./renderer/UIRenderer";
import { registerDefaultElements } from "./renderer/registerDefaultElements";
import type { UIElementNode } from "./renderer/types";
import "./App.css";

// Register all element types once at app startup
registerDefaultElements();

/**
 * Example JSON — exactly the "Full page render" from the interview spec.
 * In a real app, this would come from an API response.
 */
const pageData: UIElementNode = {
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

function App() {
  return (
    <main style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem" }}>
      <UIRenderer node={pageData} />
    </main>
  );
}

export default App;
