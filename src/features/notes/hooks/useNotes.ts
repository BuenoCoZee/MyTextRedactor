import { useEffect, useState } from "react";
import type { Note, NoteColor, ToggleField } from "../types";
import { notesService } from "../notesService";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNote = async (noteItem: Note) => {
    const dbNote = {
      title: noteItem.title,
      content: noteItem.content,
      is_favorite: noteItem.isFavorite,
      is_archived: noteItem.isArchived,
      bg_color: noteItem.bgColor,
    };

    try {
      const newNote = await notesService.createNote(dbNote);
      setNotes((prevData) => {
        const updatedNotes = [...prevData, newNote];

        return updatedNotes;
      });
    } catch (err) {
      console.error("ошибка при создании заметки", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await notesService.deleteNote(id);
      setNotes((prevData) => {
        const filteredData = prevData.filter((note) => note.id !== id);

        return filteredData;
      });
    } catch (err) {
      console.error("Ошибка при удалении заметки", err);
    }
  };

  const updateNote = async (
    id: string,
    title: string,
    content: string,
    noteColor: NoteColor,
  ) => {
    const dbNote = { title: title, content: content, bg_color: noteColor };

    try {
      await notesService.updateNote(id, dbNote);
      setNotes((prevData) => {
        const updatedData = prevData.map((prevNote) => {
          return prevNote.id === id
            ? {
                ...prevNote,
                title: title,
                content: content,
                bgColor: noteColor,
              }
            : prevNote;
        });

        return updatedData;
      });
    } catch (err) {
      console.error("Ошибка при редактировании заметки", err);
    }
  };

  const toggleField = async (id: string, field: ToggleField) => {
    const currentNote = notes.find((note) => note.id === id);

    if (!currentNote) return;

    const fieldMap = { isFavorite: "is_favorite", isArchived: "is_archived" };
    const dbField = fieldMap[field];
    const dbData = { [dbField]: !currentNote[field] };

    try {
      await notesService.updateNote(id, dbData);
    } catch (err) {
      console.error("Ошибка при изменении состояния заметки", err);
    }

    setNotes((prevData) => {
      const updatedData = prevData.map((prevNote) => {
        return prevNote.id === id
          ? { ...prevNote, [field]: !prevNote[field] }
          : prevNote;
      });

      return updatedData;
    });
  };

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);

      try {
        const data = await notesService.getAll();
        setNotes(data);
      } catch (err) {
        console.error("Не удалось загрузить заметки", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  return { notes, addNote, deleteNote, toggleField, updateNote, isLoading };
};
