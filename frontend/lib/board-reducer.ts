import type { BoardState, Card } from "./types";

export type BoardAction =
  | { type: "rename-column"; columnId: string; title: string }
  | { type: "add-card"; columnId: string; card: Card }
  | { type: "delete-card"; columnId: string; cardId: string }
  | { type: "move-card"; cardId: string; fromColumnId: string; toColumnId: string; toIndex: number };

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "rename-column": {
      const title = action.title.trim();
      if (!title) return state;
      return {
        columns: state.columns.map((column) =>
          column.id === action.columnId ? { ...column, title } : column,
        ),
      };
    }
    case "add-card":
      return {
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cards: [...column.cards, action.card] }
            : column,
        ),
      };
    case "delete-card":
      return {
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cards: column.cards.filter((card) => card.id !== action.cardId) }
            : column,
        ),
      };
    case "move-card": {
      const source = state.columns.find((column) => column.id === action.fromColumnId);
      const card = source?.cards.find((item) => item.id === action.cardId);
      if (!source || !card) return state;

      const columns = state.columns.map((column) => ({ ...column, cards: [...column.cards] }));
      const sourceColumn = columns.find((column) => column.id === action.fromColumnId);
      const targetColumn = columns.find((column) => column.id === action.toColumnId);
      if (!sourceColumn || !targetColumn) return state;

      const sourceIndex = sourceColumn.cards.findIndex((item) => item.id === action.cardId);
      sourceColumn.cards.splice(sourceIndex, 1);
      const targetIndex = Math.max(0, Math.min(action.toIndex, targetColumn.cards.length));
      targetColumn.cards.splice(targetIndex, 0, card);
      return { columns };
    }
  }
}

