"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Check, LayoutDashboard, Sparkles } from "lucide-react";
import { useReducer, useState } from "react";
import { initialBoard } from "@/lib/board-data";
import { boardReducer } from "@/lib/board-reducer";
import type { Card } from "@/lib/types";
import { KanbanCard } from "./kanban-card";
import { KanbanColumn } from "./kanban-column";

export function KanbanBoard() {
  const [board, dispatch] = useReducer(boardReducer, initialBoard);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeCard = (() => {
    for (const column of board.columns) {
      const card = column.cards.find((item) => item.id === activeCardId);
      if (card) return { card, columnId: column.id };
    }
    return null;
  })();

  const totalCards = board.columns.reduce((sum, column) => sum + column.cards.length, 0);
  const completedCards = board.columns.find((column) => column.id === "done")?.cards.length ?? 0;

  function handleDragStart(event: DragStartEvent) {
    setActiveCardId(event.active.data.current?.cardId ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveCardId(null);
    const { active, over } = event;
    if (!over) return;

    const cardId = active.data.current?.cardId as string | undefined;
    const fromColumnId = active.data.current?.columnId as string | undefined;
    const toColumnId = over.data.current?.columnId as string | undefined;
    if (!cardId || !fromColumnId || !toColumnId) return;

    const targetColumn = board.columns.find((column) => column.id === toColumnId);
    if (!targetColumn) return;
    const overCardId = over.data.current?.type === "card" ? (over.data.current.cardId as string) : null;
    const toIndex = overCardId
      ? targetColumn.cards.findIndex((card) => card.id === overCardId)
      : targetColumn.cards.length;

    dispatch({ type: "move-card", cardId, fromColumnId, toColumnId, toIndex });
  }

  return (
    <main>
      <header className="app-header">
        <a className="brand" href="#board" aria-label="Planka board home">
          <span className="brand-mark"><LayoutDashboard size={18} aria-hidden="true" /></span>
          <span>planka</span>
        </a>
        <div className="header-status">
          <span className="status-dot" />
          This session only
        </div>
      </header>

      <section className="board-shell" id="board">
        <div className="board-intro">
          <div>
            <div className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Product workspace</div>
            <h1>Launchpad</h1>
            <p>Move the work that matters from first thought to finished.</p>
          </div>
          <div className="progress-card" aria-label={`${completedCards} of ${totalCards} cards completed`}>
            <div className="progress-copy">
              <span><Check size={15} aria-hidden="true" /> Momentum</span>
              <strong>{completedCards}/{totalCards} complete</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${totalCards ? (completedCards / totalCards) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        <DndContext
          id="kanban-board-dnd"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragCancel={() => setActiveCardId(null)}
          onDragEnd={handleDragEnd}
        >
          <div className="board-grid" aria-label="Kanban board">
            {board.columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onRename={(title) => dispatch({ type: "rename-column", columnId: column.id, title })}
                onAdd={(card: Card) => dispatch({ type: "add-card", columnId: column.id, card })}
                onDelete={(cardId) => dispatch({ type: "delete-card", columnId: column.id, cardId })}
              />
            ))}
          </div>
          <DragOverlay>
            {activeCard ? (
              <KanbanCard card={activeCard.card} columnId={activeCard.columnId} onDelete={() => undefined} overlay />
            ) : null}
          </DragOverlay>
        </DndContext>
      </section>
    </main>
  );
}
