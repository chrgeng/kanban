import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { KanbanBoard } from "./kanban-board";

describe("KanbanBoard", () => {
  it("renders one board with exactly five columns and dummy cards", () => {
    render(<KanbanBoard />);
    expect(screen.getByRole("heading", { name: "Launchpad" })).toBeInTheDocument();
    expect(screen.getAllByRole("region", { name: /column$/i })).toHaveLength(5);
    expect(screen.getByText("Explore referral loop")).toBeInTheDocument();
  });

  it("renames a column", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    const input = screen.getByRole("textbox", { name: "Rename Backlog column" });
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");
    expect(screen.getByRole("textbox", { name: "Rename Ideas column" })).toHaveValue("Ideas");
  });

  it("adds a card with a title and details", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    const backlog = screen.getByTestId("column-backlog").closest("section");
    expect(backlog).not.toBeNull();
    await user.click(within(backlog!).getByRole("button", { name: "Add card" }));
    await user.type(within(backlog!).getByRole("textbox", { name: "Card title" }), "Interview customers");
    await user.type(within(backlog!).getByRole("textbox", { name: "Card details" }), "Schedule five discovery calls.");
    await user.click(within(backlog!).getByRole("button", { name: "Add card" }));
    expect(within(backlog!).getByText("Interview customers")).toBeInTheDocument();
    expect(within(backlog!).getByText("Schedule five discovery calls.")).toBeInTheDocument();
  });

  it("deletes an existing card", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    await user.click(screen.getByRole("button", { name: "Delete Explore referral loop" }));
    expect(screen.queryByText("Explore referral loop")).not.toBeInTheDocument();
  });
});

