import styles from "./NoteEditor.module.css";
import type { Note } from "../../types";
import { useState, type ChangeEvent } from "react";

interface NoteEditorProps {
  note: Note;
  onSave: (id: string, title: string, content: string) => void;
  onCancel: () => void;
}

export const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [content, setContent] = useState<string>(note?.content ?? "");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(() => e.target.value);
  };

  return (
    <div className={styles["editor"]}>
      <div className={styles["editor__buttons"]}>
        <button
          className={styles["editor__buttons-cancel"]}
          onClick={() => {
            onCancel();
          }}
        >
          Отмена
        </button>
        <button
          className={styles["editor__buttons-save"]}
          onClick={() => onSave(note!.id, title, content)}
        >
          Сохранить
        </button>
      </div>
      <label className={styles["editor__label"]}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </label>

      <div className={styles["editor__content"]}>
        <textarea
          name="content"
          className={styles["editor__content-textarea"]}
          value={content}
          onChange={handleTextareaChange}
        ></textarea>
      </div>
    </div>
  );
};
