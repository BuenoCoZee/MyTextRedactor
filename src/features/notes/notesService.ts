import type { Note } from "./types";

export const loadNotes = () => {
  const data = localStorage.getItem("NOTES_KEY");

  if (data !== null) {
    const parsedData = JSON.parse(data);
    return Array.isArray(parsedData) ? parsedData : [];
  } else {
    return [];
  }
};

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem("NOTES_KEY", JSON.stringify(notes));
};
