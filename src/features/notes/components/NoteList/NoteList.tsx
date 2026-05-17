import type { Note } from "../../types";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
}

export const NoteList = ({
  notes,
  addNote,
  deleteNote,
  selectedNoteId,
  onSelectNote,
}: NoteListProps) => {
  const selectedNote = notes.find((n) => n.id === selectedNoteId);

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
                ♻️
              </button>
            </li>
          );
        })}
      </ul>

      <button
        className={styles["notes__add"]}
        onClick={() => {
          addNote({
            id: crypto.randomUUID(),
            title: "Заметка",
            content: "Текст заметки",
          });
        }}
      >
        Добавить
      </button>

      {selectedNoteId ? (
        <div className={styles["notes__content"]}>
          <h2>{selectedNote?.title}</h2>
          <p>{selectedNote?.content}</p>
        </div>
      ) : (
        "Выберите заметку"
      )}
    </div>
  );
};
