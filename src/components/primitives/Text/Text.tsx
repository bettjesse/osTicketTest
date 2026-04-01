import DOMPurify from "dompurify";
import { marked } from "marked";
import type { TextNode } from "../../../renderer/types";
import { ElementError } from "../../ErrorBoundary/ElementError";
import "./Text.css";

/**
 * Text — renders text content in three formats: `plainText`, `html`, or `markdown`.
 *
 * - **plainText**: rendered as-is inside a `<span>` (React escapes it safely)
 * - **html**: sanitized with DOMPurify, then rendered via `dangerouslySetInnerHTML`
 * - **markdown**: converted to HTML with `marked`, sanitized with DOMPurify, then rendered
 *
 * All HTML/markdown is sanitized to prevent XSS attacks.
 */

interface TextProps {
  /** The text node data: `text` (content), `format` (plainText|html|markdown), `style` (optional CSS) */
  data: TextNode;
}

/**
 * Converts the raw text string into safe HTML based on the format.
 */
function renderContent(text: string, format: TextNode["format"]): string {
  switch (format) {
    case "html":
      return DOMPurify.sanitize(text);

    case "markdown": {
      // marked.parse can return string | Promise<string>.
      // We use parseInline for synchronous rendering.
      const raw = marked.parse(text, { async: false }) as string;
      return DOMPurify.sanitize(raw);
    }

    case "plainText":
    default:
      return text;
  }
}

export function Text({ data }: TextProps) {
  if (!data || !data.text || !data.format) {
    return (
      <ElementError
        message="Text is missing required fields (text, format)"
        type="text"
      />
    );
  }

  const { text, format, style } = data;

  // Plain text doesn't need dangerouslySetInnerHTML — just render the string
  if (format === "plainText") {
    return (
      <span className="ui-text" style={style}>
        {text}
      </span>
    );
  }

  // HTML and Markdown: sanitize, then inject
  const safeHTML = renderContent(text, format);

  return (
    <div
      className="ui-text"
      style={style}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}
