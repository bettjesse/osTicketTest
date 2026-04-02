# Composable UI Renderer

> _"The frontend provides the frame. The backend projects the content."_

A data-driven UI rendering engine that interprets structured JSON into composable React interfaces.

```
┌─────────────────────────────────────────────────────────┐
│                    THE FRAME (Frontend)                  │
│                                                         │
│   ┌─────────────┐     ┌──────────┐     ┌────────────┐  │
│   │  UIRenderer  │────▶│ Registry │────▶│ Primitives │  │
│   │  (engine)    │     │  (map)   │     │            │  │
│   └──────┬───────┘     └──────────┘     │  Button    │  │
│          │                              │  Text      │  │
│          │ looks up                     │  Image     │  │
│          │ node.type                    │  Div ──┐   │  │
│          │                              │        │   │  │
│          │         ┌────────────┐       │  ...   │   │  │
│          └────────▶│ Unknown?   │       └────┬───┘   │  │
│                    │ ⚠️ Error   │            │       │  │
│                    └────────────┘            │       │  │
│                                             ▼       │  │
│                                    children recurse─┘  │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │  THE PROJECTION (JSON)  │
          │                         │
          │  { type: "div",         │
          │    style: { ... },      │
          │    children: [          │
          │      { type: "text" },  │
          │      { type: "image" }, │
          │      { type: "button" } │
          │    ]                    │
          │  }                      │
          └─────────────────────────┘
```

---

## How to Run

```bash
npm install            # Install dependencies
npm run dev            # Dev server → localhost:5173 (renders the spec's full page)
npm run storybook      # Storybook  → localhost:6006 (all components + playground)
npm test               # Unit tests — renderer logic + error handling
```

The system is built around three layers:

### 1. Types (`src/renderer/types.ts`)

A discriminated union defines the JSON contract. Each node has a `type` field that determines its shape. TypeScript narrows the type automatically in each component.

### 2. Primitives (`src/components/primitives/`)

Individual UI building blocks: **Button**, **Text**, **Image**, **Div**. Each is a pure React component that receives typed props and renders semantic HTML. They know nothing about the renderer or each other.

### 3. Renderer (`src/renderer/`)

- **`registry.ts`** — A `Map<string, Component>` that connects type strings to React components. This is the extensibility mechanism.
- **`UIRenderer.tsx`** — The core engine . Looks up `node.type` in the registry and renders the matching component. If the type is unknown, it renders a visible error.
- **`registerDefaultElements.tsx`** — Registers all built-in primitives at app startup.

### How the Renderer Works

1. The `UIRenderer` receives a JSON node
2. It reads `node.type` (e.g. `"button"`)
3. It looks up the component in the registry
4. If found → renders the component with the node data
5. If not found → renders an `ElementError` for Error handling
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
export type UIElementNode =
  | ButtonNode
  | TextNode
  | ImageNode
  | DivNode
  | VideoNode;
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

The `UIElementNode` type is an explicit union of all known element types. This provides full TypeScript safety (autocomplete, type narrowing, compile-time checks) but requires updating the union when adding new types. In a large-scale system with plugin-based extensions, a hybrid approach typed union for core elements plus a generic fallback for dynamically registered types — would be more appropriate. For this exercise, explicit safety was the better choice.

### Button Styling — Shadcn/ui Spec

As suggested in the brief, the Button component follows the [Shadcn/ui](https://ui.shadcn.com/) component spec: sizing, border-radius, shadow, focus ring, and variant pattern all mirror Shadcn's default button. Implemented in vanilla CSS with custom properties (no Tailwind), making it easy to theme or override for white-labeling — which osTicket would need for enterprise customers.

### Inline Styles from JSON

The backend controls layout via `React.CSSProperties` objects (flexbox, grid, gap, etc.). This is flexible but not validated — invalid CSS properties are silently ignored by the browser. A production system might validate the style object or restrict it to an allowable subset.

### XSS Sanitization

HTML and Markdown text formats are sanitized with **DOMPurify** before rendering via `dangerouslySetInnerHTML`. This prevents script injection from untrusted data. Plain text uses React's default escaping and never touches `dangerouslySetInnerHTML`.

### Registry Pattern vs. Switch Statement

The registry uses a `Map` lookup instead of a switch statement. A switch requires modifying the renderer when adding types. The Map allows registration from anywhere — including external modules or plugins without touching core code.

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
│   ├── CreativeExample.stories.tsx    # Realistic support ticket view
│   ├── Playground.stories.tsx         # Interactive JSON playground
│   └── examples/                      # Example JSON payloads (simulated backend data)
│       ├── ravenPage.ts               # The spec's full page render
│       └── supportTicket.ts           # Creative example — support ticket view
├── components/
│   ├── shells/
│   │   └── PageShell/                 # Page-level frame (header, nav, content area)
│   ├── primitives/
│   │   ├── Button/                    # Navigation button (<a> styled per Shadcn/ui spec)
│   │   ├── Text/                      # HTML / Markdown / plain text renderer
│   │   ├── Image/                     # Image with optional caption (<figure>)
│   │   └── Div/                       # Recursive layout container
│   └── ErrorBoundary/
│       └── ElementError.tsx           # Graceful error display for invalid nodes
└── App.tsx                            # App entry point (renders spec's full page example)
```

---

## The Thinking Journey

I started with `types.ts` the contract between backend and frontend. In a system where the backend describes the interface, that boundary is everything. If the types are wrong, every component built on top of them is wrong too. So I spent time there first, defining a discriminated union where `node.type` determines the entire shape. TypeScript narrows it automatically no runtime checks, no guessing.

Then came the architectural question that shaped everything else: **how does the renderer find the right component?**

A switch statement would have been faster to write. But the spec said _"your implementation should be able to support other element types later"_ — and a switch is closed by nature. Every new type means editing the renderer. In a platform like osTicket, where plugins might contribute their own UI elements, that becomes a bottleneck fast.

So I chose a registry — a `Map<string, Component>`. Three lines of code that change the entire extensibility story. Define a type, build a component, register it. The renderer never changes.

The primitives came last, deliberately simple. Each one does exactly one thing: render its data into semantic HTML. They don't know about the renderer, the registry, or each other. This separation means they can be tested, documented, and replaced independently.

The **Playground** was my creative addition. I wanted to build something that makes the core idea _tangible_ — a tool where you can **be the backend**, edit JSON on the left, and watch the frontend project it in real time. No code changes. Just data in, interface out. That's the whole idea behind osTicket 2.0's architecture, made interactive.

The **Support Ticket** example takes a different angle — it shows how the same four primitives compose into a realistic osTicket page (ticket header, customer message, agent response, action buttons) purely through structured data. No new components were needed. The JSON lives in `examples/supportTicket.ts`, separate from the rendering, demonstrating the data/UI separation in practice.

### Why the Registry Matters

The registry is the architectural centerpiece. Without it, the renderer would need to know about every element type. Adding a new type means editing the renderer. In a codebase where multiple teams ship independently or where plugins extend the interface that becomes a coordination bottleneck.

With the registry, adding a new element type is **three steps**: define the type, create the component, register it. The renderer never changes.

This maps directly to what osTicket needs:

- **Core elements** (buttons, text, forms) — owned by the platform team
- **Plugin-contributed elements** (custom widgets, integrations) — owned by third parties
- **Future element types** nobody has imagined yet — owned by nobody, supported by the architecture

The registry pattern supports all three without touching core code. It's a small piece of infrastructure with outsized impact — and it's the reason the `UIRenderer` is only 15 lines of logic.
