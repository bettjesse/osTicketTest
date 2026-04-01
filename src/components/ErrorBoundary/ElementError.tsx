import "./ElementError.css";

/**
 * ElementError — a visible error indicator for invalid or unknown elements.
 *
 * This is NOT a React Error Boundary (class component that catches render errors).
 * It's simpler: a component that displays when data is invalid or a type is unknown.
 *
 * Shown inline so the rest of the page still renders — one bad node
 * doesn't break the entire UI. This is "graceful failure with visual indication."
 */

interface ElementErrorProps {
  /** What went wrong */
  message: string;
  /** The raw node type that caused the issue (if available) */
  type?: string;
}

export function ElementError({ message, type }: ElementErrorProps) {
  return (
    <div className="ui-element-error" role="alert">
      <span className="ui-element-error__icon">⚠</span>
      <div>
        <p className="ui-element-error__message">{message}</p>
        {type && (
          <p className="ui-element-error__type">Element type: "{type}"</p>
        )}
      </div>
    </div>
  );
}
