import type { ComponentType } from "react";
import type { UIElementNode } from "./types";

/**
 * ElementRenderer
 *
 * The function signature every registered component must follow.
 * It receives the full JSON node and renders it.
 *
 * Why `UIElementNode` and not a specific type like `ButtonNode`?
 * Because the registry is generic — it doesn't know which specific type
 * it's storing. Each component internally narrows the type it needs.
 */
type ElementRenderer = ComponentType<{ node: UIElementNode }>;

/**
 * Component Registry
 *
 * Maps element type strings ("button", "text", etc.) to React components.
 *
 * This is the extensibility mechanism:
 *   - The renderer looks up `node.type` in this map
 *   - If found → render the component
 *   - If not found → the renderer shows an error (graceful failure)
 *
 * To add a new element type:
 *   registry.register("table", TableElement);
 *   That's it. The renderer never changes.
 */

// The internal map — private, accessed only through register() and get()
const components = new Map<string, ElementRenderer>();

export const registry = {
  /** Register a component for a given element type */
  register(type: string, component: ElementRenderer) {
    components.set(type, component);
  },

  /** Look up the component for a given element type */
  get(type: string): ElementRenderer | undefined {
    return components.get(type);
  },

  /** Check if a type has a registered component */
  has(type: string): boolean {
    return components.has(type);
  },
};
