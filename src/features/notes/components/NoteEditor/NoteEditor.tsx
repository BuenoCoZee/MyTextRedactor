import styles from "./NoteEditor.module.css";
import { type ChangeEvent } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface NoteEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  textareaRef: React.Ref<HTMLTextAreaElement>;
}

export const NoteEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  textareaRef,
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
          ref={textareaRef}
        ></textarea>
        <div
          className={styles["editor__content-preview"]}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(content, { async: false })),
          }}
        ></div>
      </div>
    </div>
  );
};
