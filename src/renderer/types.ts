/**
 * UI Element Node Types
 *
 * These types define the contract between the backend (data) and the frontend (renderer).
 * In osTicket 2.0's architecture, the backend "projects" structured data,
 * and the frontend interprets it into a visual experience.
 *
 * We use a discriminated union — the `type` field on each node determines
 * which shape the rest of the data takes. TypeScript can narrow the type
 * automatically in switch statements, giving us compile-time safety.
 */

// ─── Individual Element Definitions ───────────────────────────────

/**
 * ButtonNode
 * Renders as an anchor (<a>) styled as a button.
 * The spec says "Button (link)" — so it navigates, it doesn't submit forms.
 */
export interface ButtonElement {
  label: string;
  title: string;
  variant: "primary" | "secondary";
  url: string;
  target: string;
}

export interface ButtonNode {
  type: "button";
  button: ButtonElement;
}

/**
 * TextNode
 * Can render plain text, HTML, or Markdown.
 * The `format` field tells the renderer HOW to interpret the `text` string.
 * Style is optional — allows inline style overrides from the backend.
 */
export interface TextNode {
  type: "text";
  text: string;
  format: "plainText" | "html" | "markdown";
  style?: React.CSSProperties;
}

/**
 * ImageNode
 * Renders an image with alt text and an optional caption.
 * Caption appears below the image as a <figcaption>.
 */
export interface ImageElement {
  url: string;
  alt: string;
  caption?: string;
}

export interface ImageNode {
  type: "image";
  image: ImageElement;
}

/**
 * DivNode
 * A container that holds other elements (children).
 * This is what makes the system COMPOSABLE — divs can nest anything,
 * including other divs. The renderer processes children recursively.
 *
 * Style is required (per the spec) — the backend controls layout.
 */
export interface DivNode {
  type: "div";
  children: UIElementNode[];
  style: React.CSSProperties;
}

// ─── The Discriminated Union ──────────────────────────────────────

/**
 * UIElementNode
 *
 * This is THE core type. Any JSON node coming from the backend
 * must be one of these types. The `type` field is the discriminator.
 *
    * The renderer will have a registry mapping each `type` to a React component.
 *
 * To add a new element type later:
 *   1. Define its interface (e.g. TableNode)
 *   2. Add it to this union
 *   3. Register its renderer in the registry
 *
 * That's it. No other code needs to change.
 */
export type UIElementNode = ButtonNode | TextNode | ImageNode | DivNode;

// We also need React's CSSProperties type in this file
import type React from "react";
