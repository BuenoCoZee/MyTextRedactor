import { supabase } from "../../shared/api/supabase";
import type { Note, NoteColor } from "./types";

interface NoteFromDB {
  id: string;
  title: string;
  content: string;
  is_favorite: boolean;
  is_archived: boolean;
  bg_color: NoteColor;
  created_at: string;
  updated_at: string;
}

function mapNoteFromDB(dbNote: NoteFromDB): Note {
  return {
    id: dbNote.id,
    title: dbNote.title,
    content: dbNote.content,
    isFavorite: dbNote.is_favorite,
    isArchived: dbNote.is_archived,
    bgColor: dbNote.bg_color,
    createdAt: dbNote.created_at,
    updatedAt: dbNote.updated_at,
  };
}

export const notesService = {
  async getAll(): Promise<Note[]> {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка при получении заметок", error.message);
      throw error;
    }

    return data.map(mapNoteFromDB) || [];
  },

  async createNote(noteData: {
    title: string;
    content: string;
    is_favorite: boolean;
    is_archived: boolean;
    bg_color: NoteColor;
  }): Promise<Note> {
    const { data, error } = await supabase
      .from("notes")
      .insert([noteData])
      .select()
      .single();

    if (error) {
      console.error("Ошибка при создании заметки:", error.message);
      throw error;
    }

    return mapNoteFromDB(data);
  },

  async updateNote(
    id: string,
    data: {
      title?: string;
      content?: string;
      is_favorite?: boolean;
      is_archived?: boolean;
      bg_color?: string;
    },
  ): Promise<void> {
    const { error } = await supabase.from("notes").update(data).eq("id", id);

    if (error) {
      console.error(`Ошибка при обновлении заметки с id ${id}`, error.message);
      throw error;
    }
  },

  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.error(`Ошибка при удалении заметки с id ${id}`, error.message);
      throw error;
    }
  },
};
