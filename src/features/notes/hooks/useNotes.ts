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

  const toggleField = (id: string, field: keyof Note) => {
    setNotes((prevData) => {
      const updatedData = prevData.map((prevNote) => {
        return prevNote.id === id
          ? { ...prevNote, [field]: !prevNote[field] }
          : prevNote;
      });

      saveNotes(updatedData);

      return updatedData;
    });
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prevData) => {
      const updatedData = prevData.map((prevNote) => {
        return prevNote.id === id
          ? {
              ...prevNote,
              title: title,
              content: content,
              updatedAt: new Date().toISOString(),
            }
          : prevNote;
      });

      saveNotes(updatedData);

      return updatedData;
    });
  };

  return { notes, addNote, deleteNote, toggleField, updateNote };
};
