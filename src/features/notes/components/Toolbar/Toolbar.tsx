import styles from "./Toolbar.module.css";

interface ToolbarProps {
  isEditing: boolean;
  onCreateNote: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const Toolbar = ({
  isEditing,
  onCreateNote,
  onSave,
  onCancel,
}: ToolbarProps) => {
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
        </div>
      ) : (
        <div className={styles["toolbar__note"]}>
          <button className={styles["toolbar__note-button"]} onClick={onCancel}>
            <img src="/icons/cancel-icon.png" alt="cancel" />
          </button>
          <button className={styles["toolbar__note-button"]} onClick={onSave}>
            <img src="/icons/submit-icon.png" alt="submit" />
          </button>
        </div>
      )}
    </div>
  );
};
