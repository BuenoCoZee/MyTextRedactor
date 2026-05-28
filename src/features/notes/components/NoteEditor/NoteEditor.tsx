import { useEffect, type ChangeEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Editor } from "@tiptap/react";

import styles from "./NoteEditor.module.css";
import type { NoteColor } from "../../types";
import { Color, TextStyle } from "@tiptap/extension-text-style";

interface NoteEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onEditorReady: (editor: Editor | null) => void;
  noteColor: NoteColor;
  setNoteColor: (color: NoteColor) => void;
  onColorChange: (color: string) => void;
}

export const NoteEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onEditorReady,
  noteColor,
  setNoteColor,
  onColorChange,
}: NoteEditorProps) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  const convertToHex = (color: string) => {
    if (!color) return "#78d9b8";

    if (color.startsWith("#")) return color;

    const match = color.match(/\d+/g);

    if (!match || match.length < 3) return "#78d9b8";

    const [r, g, b] = match.slice(0, 3).map(Number);
    const hex = [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");

    return "#" + hex;
  };

  const editor = useEditor({
    extensions: [StarterKit, Color, TextStyle],
    content: content,

    editorProps: {
      handleKeyDown: (_, event: KeyboardEvent) => {
        if (event.key === "Tab") {
          event.preventDefault();
          editor.chain().focus().insertContent("\t").run();
          return true;
        }
        return false;
      },

      attributes: {
        class: styles["editor__content-field"],
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);
    },

    onSelectionUpdate: ({ editor }) => {
      const rawColor = editor.getAttributes("textStyle").color;
      const hexColor = convertToHex(rawColor);

      onColorChange(hexColor);
    },
  });

  useEffect(() => {
    if (editor) {
      onEditorReady(editor);
    }

    return () => {
      onEditorReady(null);
    };
  }, [editor]);

  return (
    <div className={styles["editor"]} style={{ backgroundColor: noteColor }}>
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
        <EditorContent editor={editor} />
      </div>

      <ul className={styles["editor__colors"]}>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#2a2a2a" }}
          onClick={() => {
            setNoteColor("#2a2a2a");
          }}
        ></li>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#5A4D61" }}
          onClick={() => {
            setNoteColor("#5A4D61");
          }}
        ></li>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#8C6F72" }}
          onClick={() => {
            setNoteColor("#8C6F72");
          }}
        ></li>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#5A6960" }}
          onClick={() => {
            setNoteColor("#5A6960");
          }}
        ></li>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#4D5D6B" }}
          onClick={() => {
            setNoteColor("#4D5D6B");
          }}
        ></li>
        <li
          className={styles["editor__colors-color"]}
          style={{ backgroundColor: "#6B5E53" }}
          onClick={() => {
            setNoteColor("#6B5E53");
          }}
        ></li>
      </ul>
    </div>
  );
};
