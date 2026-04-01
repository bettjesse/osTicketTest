import type { ImageElement } from "../../../renderer/types";
import { ElementError } from "../../ErrorBoundary/ElementError";
import "./Image.css";

/**
 * Image — renders an image with alt text and an optional caption.
 *
 * Uses `<figure>` and `<figcaption>` for semantic HTML.
 * Screen readers and SEO benefit from proper `alt` text.
 * The caption only renders if provided.
 */

interface ImageProps {
  /** The image data: `url`, `alt` (required), `caption` (optional) */
  data: ImageElement;
}

export function Image({ data }: ImageProps) {
  if (!data || !data.url || !data.alt) {
    return (
      <ElementError
        message="Image is missing required fields (url, alt)"
        type="image"
      />
    );
  }

  const { url, alt, caption } = data;

  return (
    <figure className="ui-image">
      <img src={url} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
