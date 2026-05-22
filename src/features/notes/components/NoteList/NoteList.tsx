import type { Note } from "../../types";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
  onSelectNote: (note: Note) => void;
  toggleField: (id: string, field: keyof Note) => void;
  setIsEdit: (status: boolean) => void;
}

export const NoteList = ({
  notes,
  deleteNote,
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
              className={`${styles["notes__list-item"]}`}
              key={note.id}
              onClick={() => {
                onSelectNote(note);
                setIsEdit(true);
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
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                <img src="/icons/delete-icon.svg" alt="delete" />
              </button>
              <button
                className={styles["notes__list-item-favorite"]}
                onClick={(e) => {
                  e.stopPropagation();
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleField(note.id, "isArchived");
                }}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};
