import type { Note } from "../../types";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  toggleField: (id: string, field: keyof Note) => void;
  setIsEdit: (status: boolean) => void;
}

export const NoteList = ({
  notes,
  deleteNote,
  selectedNoteId,
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
            <li
              className={
                note.id === selectedNoteId
                  ? `${styles["notes__list-item"]} ${styles["isSelected"]}`
                  : `${styles["notes__list-item"]}`
              }
              key={note.id}
              onClick={() => {
                onSelectNote(note.id);
              }}
            >
              <h2
                className={styles["notes__list-item-title"]}
              >{`${note.title}`}</h2>
              <p className={styles["notes__list-item-content"]}>
                {note.content}
              </p>
              <button
                className={styles["notes__list-item-delete"]}
                onClick={() => {
                  deleteNote(note.id);
                }}
              >
                <img src="/icons/delete-icon.svg" alt="delete" />
              </button>
              <button
                className={styles["notes__list-item-favorite"]}
                onClick={() => {
                  toggleField(note.id, "isFavorite");
                }}
              >
                <img
                  src={
                    note.isFavorite ? "/icons/star-fill.png" : "/icons/star.png"
                  }
                  alt="favorites"
                />
              </button>
              <button
                className={styles["notes__list-item-archive"]}
                onClick={() => toggleField(note.id, "isArchived")}
              >
                <img
                  src={
                    note.isArchived
                      ? "/icons/archived.png"
                      : "/icons/archive.png"
                  }
                  alt="archive"
                />
              </button>
              <button
                className={styles["notes__list-item-edit"]}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEdit(true);
                }}
              >
                <img src="/icons/edit.png" alt="edit" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
