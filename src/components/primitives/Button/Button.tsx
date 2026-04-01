import type { ButtonElement } from "../../../renderer/types";
import { ElementError } from "../../ErrorBoundary/ElementError";
import "./Button.css";

/**
 * Button — renders as an `<a>` styled as a button.
 *
 * Used for navigation actions (not form submission).
 * The `variant` prop controls visual style: `"primary"` or `"secondary"`.
 * Uses `rel="noopener noreferrer"` when `target="_blank"` for security.
 */

interface ButtonProps {
  /** The button data matching the JSON contract (label, title, variant, url, target) */
  data: ButtonElement;
}

export function Button({ data }: ButtonProps) {
  if (!data || !data.label || !data.url) {
    return <ElementError message="Button is missing required fields (label, url)" type="button" />;
  }

  const { label, title, variant, url, target } = data;

  return (
    <a
      className={`ui-button ui-button--${variant}`}
      href={url}
      title={title}
      target={target || undefined}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
