import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UIRenderer } from "./UIRenderer";
import { registerDefaultElements } from "./registerDefaultElements";
import type { UIElementNode } from "./types";

registerDefaultElements();

/**
 * Interactive Playground
 *
 * A live JSON editor that demonstrates the renderer's core concept:
 * change the data, the UI updates. No frontend code changes needed.
 *
 * This mirrors osTicket 2.0's projection architecture —
 * the backend describes the interface, the frontend renders it.
 */

const defaultJSON: UIElementNode = {
  type: "div",
  style: { display: "grid", gap: "2rem" },
  children: [
    {
      type: "text",
      text: "# 🎨 Live Playground\n\nEdit the JSON below and watch the UI update in real time.\n\nThis is the **projection architecture** in action — the data describes the interface, the renderer projects it.",
      format: "markdown",
    },
    {
      type: "image",
      image: {
        url: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "A creative workspace",
        caption: "Change any value in the JSON to see it reflected here",
      },
    },
    {
      type: "div",
      style: {
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
      },
      children: [
        {
          type: "button",
          button: {
            label: "Try changing me",
            title: "Edit the label in the JSON",
            variant: "primary",
            url: "#",
            target: "",
          },
        },
        {
          type: "button",
          button: {
            label: "Or me!",
            title: "Edit this one too",
            variant: "secondary",
            url: "#",
            target: "",
          },
        },
      ],
    },
  ],
};

function Playground() {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(defaultJSON, null, 2)
  );
  const [error, setError] = useState<string | null>(null);
  const [node, setNode] = useState<UIElementNode>(defaultJSON);

  function handleChange(value: string) {
    setJsonText(value);
    try {
      const parsed = JSON.parse(value);
      setNode(parsed);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", minHeight: "80vh" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h3 style={{ margin: 0, fontFamily: "system-ui" }}>JSON Input</h3>
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#71717a", fontFamily: "system-ui" }}>
          Edit this JSON — the renderer updates live
        </p>
        <textarea
          value={jsonText}
          onChange={(e) => handleChange(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: error ? "2px solid #ef4444" : "1px solid #e4e4e7",
            resize: "none",
            lineHeight: 1.5,
            backgroundColor: "#fafafa",
          }}
        />
        {error && (
          <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: 0, fontFamily: "monospace" }}>
            Parse error: {error}
          </p>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h3 style={{ margin: 0, fontFamily: "system-ui" }}>Rendered Output</h3>
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#71717a", fontFamily: "system-ui" }}>
          The frontend projects whatever the data describes
        </p>
        <div
          style={{
            flex: 1,
            padding: "1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #e4e4e7",
            overflow: "auto",
          }}
        >
          <UIRenderer node={node} />
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Renderer/Playground",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/** Live editor — edit JSON on the left, see the rendered output on the right. */
export const LiveEditor: Story = {
  render: () => <Playground />,
};
