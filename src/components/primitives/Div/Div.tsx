import type { DivNode } from "../../../renderer/types";
import { UIRenderer } from "../../../renderer/UIRenderer";
import { ElementError } from "../../ErrorBoundary/ElementError";

/**
 * Div — a layout container that renders child elements recursively.
 *
 * This is what makes the system **composable**. A Div can contain
 * buttons, text, images, or other Divs — any element in the registry.
 *
 * The `style` prop is required and controlled by the backend (flexbox, grid, etc.).
 * Children are rendered by passing each one back through the `UIRenderer`.
 */

interface DivProps {
  /** The div node data: `children` (array of element nodes), `style` (required CSS) */
  data: DivNode;
}

export function Div({ data }: DivProps) {
  if (!data || !data.style || !Array.isArray(data.children)) {
    return (
      <ElementError
        message="Div is missing required fields (children, style)"
        type="div"
      />
    );
  }

  const { children, style } = data;

  return (
    <div className="ui-div" style={style}>
      {children.map((child, index) => (
        <UIRenderer key={index} node={child} />
      ))}
    </div>
  );
}
