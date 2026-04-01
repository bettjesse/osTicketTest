import { createElement } from "react";
import type { UIElementNode } from "./types";
import { registry } from "./registry";
import { ElementError } from "../components/ErrorBoundary/ElementError";

/**
 * UIRenderer — the core projection engine.
 *
 * Takes a single JSON node and renders it by looking up its `type` in the registry.
 * This component is deliberately tiny. It has ONE job:
 *   1. Look up the component for `node.type`
 *   2. Render it (or show an error if the type is unknown)
 *
 * It never needs to change when new element types are added.
 * That's the point of the registry pattern.
 */

interface UIRendererProps {
  /** A single element node from the JSON tree */
  node: UIElementNode;
}

export function UIRenderer({ node }: UIRendererProps) {
  // Guard: if node is null/undefined, show error
  if (!node || !node.type) {
    return <ElementError message="Invalid element: missing or empty node" />;
  }

  // Look up the render function for this type
  const render = registry.get(node.type);

  // Guard: unknown type — show error, don't crash
  if (!render) {
    return (
      <ElementError
        message={`Unknown element type: "${node.type}"`}
        type={node.type}
      />
    );
  }

  // Render the registered component, passing the full node
  return createElement(render, { node });
}
