"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import type { Card } from "@/lib/types";

type AddCardFormProps = {
  columnId: string;
  onAdd: (card: Card) => void;
};

export function AddCardForm({ columnId, onAdd }: AddCardFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setTitle("");
    setDetails("");
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAdd({ id: crypto.randomUUID(), title: cleanTitle, details: details.trim() });
    close();
  }

  if (!isOpen) {
    return (
      <button className="add-card-trigger" type="button" onClick={() => setIsOpen(true)}>
        <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
        Add card
      </button>
    );
  }

  return (
    <form className="add-card-form" onSubmit={submit} data-testid={`add-form-${columnId}`}>
      <input
        ref={titleRef}
        aria-label="Card title"
        placeholder="Card title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
      />
      <textarea
        aria-label="Card details"
        placeholder="Add a few details (optional)"
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        maxLength={280}
        rows={3}
      />
      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={!title.trim()}>
          Add card
        </button>
        <button className="icon-button subtle" type="button" onClick={close} aria-label="Cancel adding card">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

