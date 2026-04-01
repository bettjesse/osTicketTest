# Composable UI Renderer

> *"The frontend provides the frame. The backend provides the content."*

A composable, data-driven UI rendering engine built with React + TypeScript + Vite. The renderer interprets structured JSON from the backend and projects it into a visual interface — no hardcoded pages.

This project is inspired by the **Framed Projection Architecture** described in osTicket 2.0, where the backend describes the interface through structured data and the frontend is responsible for rendering that structure into a coherent user experience.

---

## How to Run

```bash
# Install dependencies
npm install

# Start the development server (renders the full page example)
npm run dev

# Start Storybook (interactive component documentation)
npm run storybook

# Build for production
npm run build
```

---

## Architecture Overview

```
JSON Data (from backend/API)
        │
        ▼
   UIRenderer ──── reads node.type
        │
        ▼
   Registry ────── looks up component for that type
        │
        ▼
   Primitive ───── Button | Text | Image | Div
        │
        ▼
   Rendered UI
```

The system is built around three layers:

### 1. Types (`src/renderer/types.ts`)
A discriminated union defines the JSON contract. Each node has a `type` field that determines its shape. TypeScript narrows the type automatically in each component.

### 2. Primitives (`src/components/primitives/`)
Individual UI building blocks: **Button**, **Text**, **Image**, **Div**. Each is a pure React component that receives typed props and renders semantic HTML. They know nothing about the renderer or each other.

### 3. Renderer (`src/renderer/`)
- **`registry.ts`** — A `Map<string, Component>` that connects type strings to React components. This is the extensibility mechanism.
- **`UIRenderer.tsx`** — The core engine (~15 lines of logic). Looks up `node.type` in the registry and renders the matching component. If the type is unknown, it renders a visible error.
- **`registerDefaultElements.tsx`** — Registers all built-in primitives at app startup.

### How the Renderer Works

1. The `UIRenderer` receives a JSON node
2. It reads `node.type` (e.g. `"button"`)
3. It looks up the component in the registry
4. If found → renders the component with the node data
5. If not found → renders an `ElementError` (graceful failure, visible in the UI)
6. For `Div` nodes, children are rendered **recursively** through the same `UIRenderer`

This recursive composition is what makes the system powerful — a Div can contain any elements, including other Divs, enabling complex layouts from flat JSON.

---

## How to Add a New Element Type

Three steps. No existing code changes required.

### Step 1: Define the type (`types.ts`)
```ts
export interface VideoNode {
  type: "video";
  video: { url: string; poster?: string };
}

// Add to the union
export type UIElementNode = ButtonNode | TextNode | ImageNode | DivNode | VideoNode;
```

### Step 2: Create the component
```ts
// src/components/primitives/Video/Video.tsx
export function Video({ data }: { data: VideoNode["video"] }) {
  return <video src={data.url} poster={data.poster} controls />;
}
```

### Step 3: Register it (`registerDefaultElements.tsx`)
```ts
registry.register("video", ({ node }) => {
  const n = node as Extract<UIElementNode, { type: "video" }>;
  return <Video data={n.video} />;
});
```

The `UIRenderer` and `registry` are never modified. This follows the **Open/Closed Principle** — open for extension, closed for modification.

---

## Tradeoffs and Simplifications

### Explicit Union vs. Generic Types
The `UIElementNode` type is an explicit union of all known element types. This provides full TypeScript safety (autocomplete, type narrowing, compile-time checks) but requires updating the union when adding new types. In a large-scale system with plugin-based extensions, a hybrid approach — typed union for core elements plus a generic fallback for dynamically registered types — would be more appropriate. For this exercise, explicit safety was the better choice.

### Inline Styles from JSON
The backend controls layout via `React.CSSProperties` objects (flexbox, grid, gap, etc.). This is flexible but not validated — invalid CSS properties are silently ignored by the browser. A production system might validate the style object or restrict it to an allowable subset.

### XSS Sanitization
HTML and Markdown text formats are sanitized with **DOMPurify** before rendering via `dangerouslySetInnerHTML`. This prevents script injection from untrusted data. Plain text uses React's default escaping and never touches `dangerouslySetInnerHTML`.

### No Tailwind CSS
Per the spec's requirement, all styling uses vanilla CSS with CSS custom properties. Custom properties enable theming from a parent level (e.g. white-labeling) without modifying component styles.

### Static JSON Data
The JSON examples in `App.tsx` and Storybook stories are hardcoded for demonstration. In production, this data would come from an API endpoint (`fetch("/api/page")`). The renderer is fully data-driven and doesn't care where the JSON originates.

### Registry Pattern vs. Switch Statement
The registry uses a `Map` lookup instead of a switch statement. A switch requires modifying the renderer when adding types. The Map allows registration from anywhere — including external modules or plugins — without touching core code.

---

## Project Structure

```
src/
├── renderer/                          # The projection engine
│   ├── types.ts                       # JSON contract (discriminated union)
│   ├── registry.ts                    # Component lookup map
│   ├── registerDefaultElements.tsx    # Connects primitives to registry
│   ├── UIRenderer.tsx                 # Core renderer (~15 lines of logic)
│   ├── UIRenderer.stories.tsx         # Full page render + error handling stories
│   └── Playground.stories.tsx         # Interactive JSON playground
├── components/
│   ├── primitives/
│   │   ├── Button/                    # Navigation button (<a> styled as button)
│   │   ├── Text/                      # HTML / Markdown / plain text renderer
│   │   ├── Image/                     # Image with optional caption (<figure>)
│   │   └── Div/                       # Recursive layout container
│   └── ErrorBoundary/
│       └── ElementError.tsx           # Graceful error display for invalid nodes
└── App.tsx                            # App entry point (renders spec's full page example)
```
