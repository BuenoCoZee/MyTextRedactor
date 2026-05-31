import type { Note, ToggleField } from "../../types";
import { NoteCard } from "../NoteCard/NoteCard";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onRequestDelete: (noteId: string) => void;
  onSelectNote: (note: Note) => void;
  toggleField: (id: string, field: ToggleField) => void;
  setIsEdit: (status: boolean) => void;
}

export const NoteList = ({
  notes,
  onRequestDelete,
  onSelectNote,
  toggleField,
  setIsEdit,
}: NoteListProps) => {
  return (
    <div className={styles["notes"]}>
      <h1 className={styles["notes__count"]}>Заметок: {notes.length}</h1>
      <ul className={styles["notes__list"]}>
        {notes.map((note) => {
          return (
            <NoteCard
              note={note}
              noteClass="notes__list-item"
              onRequestDelete={onRequestDelete}
              onSelectNote={onSelectNote}
              toggleField={toggleField}
              setIsEdit={setIsEdit}
              key={note.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
