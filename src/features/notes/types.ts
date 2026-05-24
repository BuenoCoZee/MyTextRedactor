export interface Note {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Tab = "all" | "favorites" | "archive";

export type Filter =
  | "title"
  | "createdAtBeginning"
  | "createdAtEnd"
  | "updatedAt"
  | "none";

export type FormatType = "bold" | "italic" | "code";
