"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { AddCardForm } from "./add-card-form";
import { KanbanCard } from "./kanban-card";
import type { Card, Column } from "@/lib/types";

type KanbanColumnProps = {
  column: Column;
  onRename: (title: string) => void;
  onAdd: (card: Card) => void;
  onDelete: (cardId: string) => void;
};

export function KanbanColumn({ column, onRename, onAdd, onDelete }: KanbanColumnProps) {
  const [title, setTitle] = useState(column.title);
  const { setNodeRef, isOver } = useDroppable({
    id: `column:${column.id}`,
    data: { type: "column", columnId: column.id },
  });

  function commitTitle() {
    const cleanTitle = title.trim();
    if (cleanTitle) onRename(cleanTitle);
    else setTitle(column.title);
  }

  return (
    <section className={`kanban-column${isOver ? " is-over" : ""}`} aria-label={`${column.title} column`}>
      <div className="column-accent" style={{ backgroundColor: column.color }} />
      <header className="column-header">
        <input
          className="column-title"
          aria-label={`Rename ${column.title} column`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={commitTitle}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
            if (event.key === "Escape") {
              setTitle(column.title);
              event.currentTarget.blur();
            }
          }}
          maxLength={32}
        />
        <span className="card-count" aria-label={`${column.cards.length} cards`}>
          {column.cards.length}
        </span>
      </header>

      <div className="card-list" ref={setNodeRef} data-testid={`column-${column.id}`}>
        <SortableContext items={column.cards.map((card) => `card:${card.id}`)} strategy={verticalListSortingStrategy}>
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={column.id}
              onDelete={() => onDelete(card.id)}
            />
          ))}
        </SortableContext>
        {column.cards.length === 0 ? <p className="empty-column">Drop a card here</p> : null}
      </div>

      <AddCardForm columnId={column.id} onAdd={onAdd} />
    </section>
  );
}

