export interface Note {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  bgColor: NoteColor;
  userId: string;
}

export type Tab = "all" | "favorites" | "archive";

export type Filter =
  | "title"
  | "createdAtBeginning"
  | "createdAtEnd"
  | "updatedAt"
  | "none";

export type FormatType = "bold" | "italic" | "code";

export type NoteColor =
  | "#2a2a2a"
  | "#5A4D61"
  | "#8C6F72"
  | "#5A6960"
  | "#4D5D6B"
  | "#6B5E53";

export type ToggleField = "isFavorite" | "isArchived";
