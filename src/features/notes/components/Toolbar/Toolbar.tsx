import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Filter } from "../../types";
import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

import styles from "./Toolbar.module.css";

interface ToolbarProps {
  isEditing: boolean;
  onCreateNote: () => void;
  onSave: () => void;
  onCancel: () => void;
  searchQuery: string;
  filter: Filter;
  setSearchQuery: (value: string) => void;
  setFilter: (filter: Filter) => void;
  editor: Editor | null;
  textColor: string;
  setTextColor: (color: string) => void;
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: () => void;
  username: string;
  onSignOut: () => void;
}

export const Toolbar = ({
  isEditing,
  onCreateNote,
  onSave,
  onCancel,
  searchQuery,
  filter,
  setSearchQuery,
  setFilter,
  editor,
  textColor,
  setTextColor,
  isOpenMobileMenu,
  setIsOpenMobileMenu,
  username,
  onSignOut,
}: ToolbarProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isFilterListOpened, setIsFilterListOpened] = useState<boolean>(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState<boolean>(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [savedRange, setSavedRange] = useState<{
    from: number;
    to: number;
  } | null>(null);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handlePaletteToggle = () => {
    if (!isColorPaletteOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });

      if (editor) {
        const { from, to } = editor.state.selection;
        setSavedRange({ from, to });
      }
    }

    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  const displayedFilterStatus = () => {
    switch (filter) {
      case "createdAtBeginning":
        return "сначала старые";

      case "createdAtEnd":
        return "сначала новые";

      case "title":
        return "по заголовку";

      case "updatedAt":
        return "по дате обновления";

      default:
        return "Сортировать";
    }
  };

  const isHeadingOne = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return false;
      return ctx.editor?.isActive("heading", { level: 1 });
    },
  });

  const isHeadingTwo = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return false;
      return ctx.editor?.isActive("heading", { level: 2 });
    },
  });

  const isBold = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("bold"),
  });

  const isItalic = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("italic"),
  });

  const isCode = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("code"),
  });

  const isBulletList = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("bulletList"),
  });

  const isOrderedList = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("orderedList"),
  });

  const isBlockquote = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("blockquote"),
  });

  const isUnderLine = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return false;
      return ctx.editor?.isActive("underline");
    },
  });

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className={styles["toolbar"]}>
      {isEditing === false ? (
        <div className={styles["toolbar__global"]}>
          <button
            className={
              isOpenMobileMenu
                ? `${styles["toolbar__global-burger"]} ${styles["isOpened"]}`
                : `${styles["toolbar__global-burger"]}`
            }
            onClick={setIsOpenMobileMenu}
          >
            <span className={styles["burger-line"]}></span>
            <span className={styles["burger-line"]}></span>
            <span className={styles["burger-line"]}></span>
          </button>
          <button
            className={styles["toolbar__global-create"]}
            onClick={onCreateNote}
          >
            +
          </button>
          <div className={styles["toolbar__global-filter"]}>
            <button
              className={styles["toolbar__global-filter-selected"]}
              onClick={() => {
                setIsFilterListOpened(!isFilterListOpened);
              }}
            >
              {displayedFilterStatus()}
            </button>
            <ul
              className={
                isFilterListOpened
                  ? `${styles["toolbar__global-filter-list"]} ${styles["isOpened"]}`
                  : `${styles["toolbar__global-filter-list"]}`
              }
            >
              <li
                className={styles["toolbar__global-filter-parameter"]}
                onClick={() => {
                  setFilter("createdAtBeginning");
                  setIsFilterListOpened(false);
                }}
              >
                сначала старые
              </li>
              <li
                className={styles["toolbar__global-filter-parameter"]}
                onClick={() => {
                  setFilter("createdAtEnd");
                  setIsFilterListOpened(false);
                }}
              >
                сначала новые
              </li>
              <li
                className={styles["toolbar__global-filter-parameter"]}
                onClick={() => {
                  setFilter("title");
                  setIsFilterListOpened(false);
                }}
              >
                по заголовку
              </li>
              <li
                className={styles["toolbar__global-filter-parameter"]}
                onClick={() => {
                  setFilter("updatedAt");
                  setIsFilterListOpened(false);
                }}
              >
                по дате обновления
              </li>
            </ul>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles["toolbar__global-search"]}
            placeholder="Поиск"
          />
          <div
            className={styles["toolbar__global-profile"]}
            onClick={toggleProfileMenu}
          >
            <img src="/icons/profile-icon.png" alt="profile" />
            <ul
              className={
                isProfileMenuOpen
                  ? `${styles["toolbar__global-profile-menu"]} ${styles["isOpen"]}`
                  : `${styles["toolbar__global-profile-menu"]}`
              }
            >
              <li className={styles["profile-menu__item-title"]}>
                Привет, {username}!
              </li>
              <li className={styles["profile-menu__item"]}>Профиль</li>
              <li className={styles["profile-menu__item"]} onClick={onSignOut}>
                Выйти
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles["toolbar__note"]}>
          <button className={styles["toolbar__note-button"]} onClick={onCancel}>
            <img src="/icons/cancel-icon.png" alt="cancel" />
          </button>
          <div className={styles["toolbar__note-edit"]}>
            <div
              className={`${styles["toolbar__note-edit-buttons"]} ${styles["format-buttons"]}`}
            >
              <div className={styles["format-buttons__container"]}>
                <div className={styles["format-buttons__container-color"]}>
                  {createPortal(
                    <input
                      value={textColor}
                      type="color"
                      className={`${styles["format-buttons__button-palette"]} ${isColorPaletteOpen ? styles["isOpen"] : ""}`}
                      style={{
                        top: `${coords.top + 10}px`,
                        left: `${coords.left - 20}px`,
                      }}
                      onChange={(e) => {
                        setTextColor(e.target.value);

                        if (savedRange && editor) {
                          editor
                            .chain()
                            .focus()
                            .setTextSelection(savedRange)
                            .setColor(e.target.value)
                            .run();

                          setSavedRange(null);
                        } else {
                          editor
                            ?.chain()
                            .focus()
                            .setColor(e.target.value)
                            .run();
                        }

                        setIsColorPaletteOpen(false);
                      }}
                    />,
                    document.body,
                  )}
                  <div
                    ref={buttonRef}
                    className={`${styles["format-buttons__button"]} ${styles["palette-button"]}`}
                    onClick={() => {
                      handlePaletteToggle();
                    }}
                  >
                    ✎
                    <span
                      className={styles["format-buttons__button-line"]}
                      style={{ backgroundColor: textColor }}
                    ></span>
                  </div>
                </div>

                <button
                  className={styles["format-buttons__button"]}
                  onClick={() => {
                    setTextColor("#78d9b8");
                  }}
                >
                  ↩
                </button>
              </div>
              <div className={styles["format-buttons__container"]}>
                <button
                  className={`${styles["format-buttons__button"]} ${isBold ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().unsetCode().toggleBold().run();
                  }}
                >
                  B
                </button>
                <button
                  className={`${styles["format-buttons__button"]} ${isItalic ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().unsetCode().toggleItalic().run();
                  }}
                >
                  I
                </button>
              </div>

              <div className={styles["format-buttons__container"]}>
                <button
                  className={`${styles["format-buttons__button"]} ${isCode ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleCode().run();
                  }}
                >
                  &lt;/&gt;
                </button>
                <button
                  className={`${styles["format-buttons__button"]} ${isUnderLine ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleUnderline().run();
                  }}
                >
                  A̲
                </button>
              </div>

              <div className={styles["format-buttons__container"]}>
                <button
                  className={`${styles["format-buttons__button"]} ${isHeadingOne ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleHeading({ level: 1 }).run();
                  }}
                >
                  H1
                </button>
                <button
                  className={`${styles["format-buttons__button"]} ${isHeadingTwo ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleHeading({ level: 2 }).run();
                  }}
                >
                  H2
                </button>
              </div>

              <div className={styles["format-buttons__container"]}>
                <button
                  className={`${styles["format-buttons__button"]} ${isBulletList ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleBulletList().run();
                  }}
                >
                  ☰
                </button>
                <button
                  className={`${styles["format-buttons__button"]} ${isOrderedList ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleOrderedList().run();
                  }}
                >
                  1.
                </button>
              </div>

              <div className={styles["format-buttons__container"]}>
                <button
                  className={`${styles["format-buttons__button"]} ${isBlockquote ? styles["isActive"] : ""}`}
                  onClick={() => {
                    editor?.chain().focus().toggleBlockquote().run();
                  }}
                >
                  «»
                </button>
              </div>
            </div>
          </div>
          <button className={styles["toolbar__note-button"]} onClick={onSave}>
            <img src="/icons/submit-icon.png" alt="submit" />
          </button>
        </div>
      )}
    </div>
  );
};
