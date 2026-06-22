import type { Note, ToggleField } from "../../types";
import { useDraggable } from "@dnd-kit/core";
import DOMPurify from "dompurify";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  note: Note;
  noteClass: string;
  onRequestDelete: (noteId: string) => void;
  onSelectNote: (note: Note) => void;
  toggleField: (id: string, field: ToggleField) => void;
  setIsEdit: (status: boolean) => void;
}

export const NoteCard = ({
  note,
  noteClass,
  onRequestDelete,
  onSelectNote,
  toggleField,
  setIsEdit,
}: NoteCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  const style = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  return (
    <li
      key={note.id}
      onClick={() => {
        onSelectNote(note);
        setIsEdit(true);
      }}
      ref={setNodeRef}
      style={{ transform: style }}
      {...attributes}
      className={styles["note"]}
    >
      <div
        className={`${noteClass} ${styles["note-item"]}`}
        style={{
          backgroundColor: note.bgColor,

          border: note.isFavorite
            ? `3px solid yellow`
            : `3px solid ${note.bgColor === "#2a2a2a" ? "#34b78b" : note.bgColor}`,
          boxShadow: note.isFavorite ? "0 0 4px 4px yellow" : undefined,
        }}
      >
        <span className={styles["drag-handle"]} {...listeners}>
          ⠿
        </span>
        <h2 className={styles["note-item__title"]}>{`${note.title}`}</h2>
        <div
          className={styles["note-item__content"]}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(note.content),
          }}
        ></div>
        <button
          className={styles["note-item__delete"]}
          style={{ backgroundColor: note.bgColor }}
          onClick={(e) => {
            e.stopPropagation();
            onRequestDelete(note.id);
          }}
        >
          <img src="/icons/delete-icon.svg" alt="delete" />
        </button>
        <button
          className={styles["note-item__favorite"]}
          style={{ backgroundColor: note.bgColor }}
          onClick={(e) => {
            e.stopPropagation();
            toggleField(note.id, "isFavorite");
          }}
        >
          <img
            src={note.isFavorite ? "/icons/star-fill.png" : "/icons/star.png"}
            alt="favorites"
          />
        </button>
        <button
          className={styles["note-item__archive"]}
          style={{ backgroundColor: note.bgColor }}
          onClick={(e) => {
            e.stopPropagation();
            toggleField(note.id, "isArchived");
          }}
        >
          <img
            src={note.isArchived ? "/icons/archived.png" : "/icons/archive.png"}
            alt="archive"
          />
        </button>
      </div>
    </li>
  );
};
