import type { BoardState } from "./types";

export const initialBoard: BoardState = {
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      color: "#8b96a8",
      cards: [
        { id: "card-1", title: "Explore referral loop", details: "Map the happy path and define the smallest testable incentive." },
        { id: "card-2", title: "Audit mobile navigation", details: "Review wayfinding and tap targets across the main flows." },
        { id: "card-3", title: "Pricing page refresh", details: "Clarify plan differences and strengthen the enterprise story." },
      ],
    },
    {
      id: "ready",
      title: "Ready",
      color: "#209dd7",
      cards: [
        { id: "card-4", title: "Onboarding checklist", details: "Give new teams a clear path to their first shared project." },
        { id: "card-5", title: "Empty state illustrations", details: "Add friendly guidance to the three highest-traffic empty states." },
      ],
    },
    {
      id: "progress",
      title: "In progress",
      color: "#ecad0a",
      cards: [
        { id: "card-6", title: "Dashboard insights", details: "Surface weekly momentum and projects that need attention." },
        { id: "card-7", title: "Design token cleanup", details: "Consolidate spacing and semantic color tokens before release." },
      ],
    },
    {
      id: "review",
      title: "In review",
      color: "#753991",
      cards: [
        { id: "card-8", title: "Invite flow polish", details: "Final copy and keyboard navigation pass with the team." },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "#2da67b",
      cards: [
        { id: "card-9", title: "Launch brief", details: "Aligned product, marketing, and support on the release plan." },
        { id: "card-10", title: "Analytics events", details: "Validated naming and payloads for the activation funnel." },
      ],
    },
  ],
};

