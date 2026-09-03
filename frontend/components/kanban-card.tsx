"use client";

/* eslint-disable react-hooks/refs -- dnd-kit exposes callback refs and listener props for render-time attachment. */

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2 } from "lucide-react";
import type { Card } from "@/lib/types";

type KanbanCardProps = {
  card: Card;
  columnId: string;
  onDelete: () => void;
  overlay?: boolean;
};

export function KanbanCard({ card, columnId, onDelete, overlay = false }: KanbanCardProps) {
  const sortable = useSortable({
    id: `card:${card.id}`,
    data: { type: "card", cardId: card.id, columnId },
    disabled: overlay,
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <article
      ref={sortable.setNodeRef}
      style={style}
      className={`kanban-card${sortable.isDragging ? " is-dragging" : ""}${overlay ? " is-overlay" : ""}`}
      data-testid={`card-${card.id}`}
    >
      <div className="card-topline">
        <button
          className="drag-handle"
          type="button"
          aria-label={`Move ${card.title}`}
          {...sortable.attributes}
          {...sortable.listeners}
        >
          <GripVertical size={16} aria-hidden="true" />
        </button>
        <button className="delete-button" type="button" aria-label={`Delete ${card.title}`} onClick={onDelete}>
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
      <h3>{card.title}</h3>
      {card.details ? <p>{card.details}</p> : null}
    </article>
  );
}
