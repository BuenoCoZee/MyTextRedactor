import styles from "./NoteEditor.module.css";
import { type ChangeEvent } from "react";

interface NoteEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const NoteEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: NoteEditorProps) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  return (
    <div className={styles["editor"]}>
      <label className={styles["editor__label"]}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Заголовок"
        />
      </label>

      <div className={styles["editor__content"]}>
        <textarea
          name="content"
          className={styles["editor__content-textarea"]}
          value={content}
          onChange={handleTextareaChange}
          placeholder="Что бы записать..."
        ></textarea>
      </div>
    </div>
  );
};
