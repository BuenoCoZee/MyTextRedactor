import { useState } from "react";
import type { Note } from "../types";
import { loadNotes, saveNotes } from "../notesService";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());

  const addNote = (noteItem: Note) => {
    setNotes((prevData) => {
      const updatedNotes = [...prevData, noteItem];
      saveNotes(updatedNotes);

      return updatedNotes;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prevData) => {
      const filteredData = prevData.filter((note) => note.id !== id);

      saveNotes(filteredData);

      return filteredData;
    });
  };

  return { notes, addNote, deleteNote };
};
