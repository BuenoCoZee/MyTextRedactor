import styles from "./ConfirmExitDialog.module.css";

interface ExitDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmExitDialog = ({ onConfirm, onCancel }: ExitDialogProps) => {
  return (
    <div className={styles["modal-overlay__exit"]}>
      <p className={styles["modal-overlay__exit-title"]}>
        Есть несохранённые изменения. Точно выйти?
      </p>
      <div className={styles["modal-overlay__exit-buttons"]}>
        <button
          className={styles["modal-button"]}
          onClick={() => {
            onConfirm();
          }}
        >
          Да
        </button>
        <button
          className={styles["modal-button"]}
          onClick={() => {
            onCancel();
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
