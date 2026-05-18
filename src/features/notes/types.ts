export interface Note {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  //   createdAt: string;
  //   updatedAt: string;
}

export type Tab = "all" | "favorites" | "archive";
