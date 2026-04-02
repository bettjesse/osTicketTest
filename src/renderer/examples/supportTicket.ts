import type { UIElementNode } from "../types";

/**
 * Support Ticket — Example JSON Payload
 *
 * This represents what the backend would return for a ticket detail view.
 * In production, this would come from an API response.
 * The frontend never constructs this — it only receives and projects it.
 *
 * This demonstrates that the same four primitives (text, image, div, button)
 * can compose into a completely different UI without any new components.
 */

export const supportTicket: UIElementNode = {
  type: "div",
  style: {
    display: "grid",
    gap: "2rem",
    maxWidth: "48rem",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  children: [
    // ── Ticket Header ──
    {
      type: "div",
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid #e4e4e7",
      },
      children: [
        {
          type: "div",
          style: { display: "grid", gap: "0.25rem" },
          children: [
            {
              type: "text",
              text: "**Ticket #10492** — Cannot access admin panel after update",
              format: "markdown",
              style: { fontSize: "1.25rem", fontWeight: 600 },
            },
            {
              type: "text",
              text: "Opened by **Jesse Bett** · 2 hours ago · Priority: **High**",
              format: "markdown",
              style: { fontSize: "0.875rem", color: "#71717a" },
            },
          ],
        },
        {
          type: "div",
          style: {
            display: "flex",
            gap: "0.5rem",
            flexShrink: 0,
          },
          children: [
            {
              type: "text",
              text: '<span style="background:#fef3c7;color:#92400e;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:500">Open</span>',
              format: "html",
            },
          ],
        },
      ],
    },

    // ── Ticket Body (customer message) ──
    {
      type: "div",
      style: {
        display: "grid",
        gap: "1rem",
        padding: "1.5rem",
        backgroundColor: "#fafafa",
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
      },
      children: [
        {
          type: "text",
          text: "Hi support team,\n\nAfter updating to **v2.0.3**, I can no longer access the admin panel. The page loads but shows a blank white screen. The browser console shows a `TypeError: Cannot read properties of undefined`.\n\nI've attached a screenshot of the error below.",
          format: "markdown",
        },
        {
          type: "image",
          image: {
            url: "https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Screenshot of console error in admin panel",
            caption: "Console output showing the TypeError after update",
          },
        },
        {
          type: "text",
          text: "I've tried clearing the cache and restarting the server. Neither helped. This is affecting our entire support team — we can't manage tickets right now.",
          format: "markdown",
        },
      ],
    },

    // ── Agent Response ──
    {
      type: "div",
      style: {
        display: "grid",
        gap: "1rem",
        padding: "1.5rem",
        backgroundColor: "#f0f9ff",
        borderRadius: "0.5rem",
        border: "1px solid #bae6fd",
      },
      children: [
        {
          type: "text",
          text: '<span style="font-weight:600;font-size:0.875rem">Marcus Rivera</span> <span style="color:#71717a;font-size:0.8125rem">· Support Agent · 45 minutes ago</span>',
          format: "html",
        },
        {
          type: "text",
          text: "Hi Jesse,\n\nThank you for reporting this. We've identified a **known issue with v2.0.3** where the admin panel fails to load when custom plugins are installed.\n\nA hotfix is available. Please follow the steps in the knowledge base article linked below.",
          format: "markdown",
        },
      ],
    },

    // ── Actions ──
    {
      type: "div",
      style: {
        display: "flex",
        gap: "1rem",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "0.5rem",
      },
      children: [
        {
          type: "button",
          button: {
            label: "View Hotfix Guide",
            title: "Knowledge base article for v2.0.3 hotfix",
            variant: "primary",
            url: "https://osticket.com",
            target: "_blank",
          },
        },
        {
          type: "button",
          button: {
            label: "Close Ticket",
            title: "Mark this ticket as resolved",
            variant: "secondary",
            url: "#",
            target: "",
          },
        },
      ],
    },
  ],
};
