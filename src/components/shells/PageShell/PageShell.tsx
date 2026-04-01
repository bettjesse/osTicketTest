import type { ReactNode } from "react";
import "./PageShell.css";

/**
 * PageShell — the structural frame of a page.
 *
 * In osTicket 2.0's Framed Projection Architecture, page shells define
 * the layout structure (navigation, header, content regions) while the
 * backend projects elements into the content area.
 *
 * The shell owns the frame. The renderer fills it with projected content.
 * Different shells can present the same data in different layouts.
 */

interface PageShellProps {
  /** Page title displayed in the shell header */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** The projected content — rendered by the UIRenderer */
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="page-shell__header">
        <div className="page-shell__brand">
          <span className="page-shell__logo">◈</span>
          <span className="page-shell__brand-name">osTicket</span>
        </div>
        <nav className="page-shell__nav">
          <a
            href="#"
            className="page-shell__nav-link page-shell__nav-link--active"
          >
            Dashboard
          </a>
          <a href="#" className="page-shell__nav-link">
            Tickets
          </a>
          <a href="#" className="page-shell__nav-link">
            Knowledge Base
          </a>
        </nav>
      </header>
      <main className="page-shell__content">
        <div className="page-shell__title-bar">
          <h1 className="page-shell__title">{title}</h1>
          {subtitle && <p className="page-shell__subtitle">{subtitle}</p>}
        </div>
        <div className="page-shell__body">{children}</div>
      </main>
    </div>
  );
}
