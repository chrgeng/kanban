export type Card = {
  id: string;
  title: string;
  details: string;
};

export type Column = {
  id: string;
  title: string;
  color: string;
  cards: Card[];
};

export type BoardState = {
  columns: Column[];
};

