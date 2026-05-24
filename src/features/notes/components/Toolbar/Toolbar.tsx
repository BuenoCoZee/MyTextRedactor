import { useState } from "react";
import type { Filter, FormatType } from "../../types";
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
  onFormat: (formatType: FormatType) => void;
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
  onFormat,
}: ToolbarProps) => {
  const [isFilterListOpened, setIsFilterListOpened] = useState<boolean>(false);

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

  return (
    <div className={styles["toolbar"]}>
      {isEditing === false ? (
        <div className={styles["toolbar__global"]}>
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
        </div>
      ) : (
        <div className={styles["toolbar__note"]}>
          <button className={styles["toolbar__note-cancel"]} onClick={onCancel}>
            <img src="/icons/cancel-icon.png" alt="cancel" />
          </button>
          <div className={styles["toolbar__note-edit"]}>
            <div
              className={`${styles["toolbar__note-edit-buttons"]} ${styles["format-buttons"]}`}
            >
              <button
                className={styles["format-buttons__button"]}
                onClick={() => {
                  onFormat("bold");
                }}
              >
                B
              </button>
              <button
                className={styles["format-buttons__button"]}
                onClick={() => {
                  onFormat("italic");
                }}
              >
                I
              </button>
              <button
                className={styles["format-buttons__button"]}
                onClick={() => {
                  onFormat("code");
                }}
              >
                &lt;/&gt;
              </button>
            </div>
            <button className={styles["toolbar__note-button"]} onClick={onSave}>
              <img src="/icons/submit-icon.png" alt="submit" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
