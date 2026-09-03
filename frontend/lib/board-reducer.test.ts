import { describe, expect, it } from "vitest";
import { boardReducer } from "./board-reducer";
import type { BoardState } from "./types";

const board: BoardState = {
  columns: [
    { id: "one", title: "One", color: "#000", cards: [{ id: "a", title: "A", details: "First" }, { id: "b", title: "B", details: "Second" }] },
    { id: "two", title: "Two", color: "#fff", cards: [{ id: "c", title: "C", details: "Third" }] },
  ],
};

describe("boardReducer", () => {
  it("renames a column while preserving the rest of the board", () => {
    const result = boardReducer(board, { type: "rename-column", columnId: "one", title: "Ideas" });
    expect(result.columns[0].title).toBe("Ideas");
    expect(result.columns[1]).toBe(board.columns[1]);
  });

  it("does not accept an empty column name", () => {
    expect(boardReducer(board, { type: "rename-column", columnId: "one", title: "  " })).toBe(board);
  });

  it("adds and deletes cards", () => {
    const card = { id: "d", title: "D", details: "Fourth" };
    const added = boardReducer(board, { type: "add-card", columnId: "two", card });
    expect(added.columns[1].cards).toHaveLength(2);
    expect(added.columns[1].cards[1]).toEqual(card);

    const deleted = boardReducer(added, { type: "delete-card", columnId: "two", cardId: "d" });
    expect(deleted.columns[1].cards).toEqual(board.columns[1].cards);
  });

  it("moves a card between columns at the requested position", () => {
    const result = boardReducer(board, {
      type: "move-card", cardId: "b", fromColumnId: "one", toColumnId: "two", toIndex: 0,
    });
    expect(result.columns[0].cards.map((card) => card.id)).toEqual(["a"]);
    expect(result.columns[1].cards.map((card) => card.id)).toEqual(["b", "c"]);
  });

  it("reorders cards inside a column", () => {
    const result = boardReducer(board, {
      type: "move-card", cardId: "a", fromColumnId: "one", toColumnId: "one", toIndex: 1,
    });
    expect(result.columns[0].cards.map((card) => card.id)).toEqual(["b", "a"]);
  });
});

