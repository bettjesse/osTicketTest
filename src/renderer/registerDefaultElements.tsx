import type { UIElementNode } from "./types";
import { registry } from "./registry";
import { Button } from "../components/primitives/Button/Button";
import { Text } from "../components/primitives/Text/Text";
import { Image } from "../components/primitives/Image/Image";
import { Div } from "../components/primitives/Div/Div";

/**
 * Register Default Elements
 *
 * This file connects each element type to its component via the registry.
 * Call `registerDefaultElements()` once at app startup.
 *
 * Each wrapper adapts the registry's generic `node: UIElementNode`
 * to the specific props each primitive expects.
 *
 * To add a new element type:
 *   1. Create the component
 *   2. Add a registry.register() call here
 *   Done.
 */

export function registerDefaultElements() {
  registry.register("button", ({ node }) => {
    const n = node as Extract<UIElementNode, { type: "button" }>;
    return <Button data={n.button} />;
  });

  registry.register("text", ({ node }) => {
    const n = node as Extract<UIElementNode, { type: "text" }>;
    return <Text data={n} />;
  });

  registry.register("image", ({ node }) => {
    const n = node as Extract<UIElementNode, { type: "image" }>;
    return <Image data={n.image} />;
  });

  registry.register("div", ({ node }) => {
    const n = node as Extract<UIElementNode, { type: "div" }>;
    return <Div data={n} />;
  });
}
