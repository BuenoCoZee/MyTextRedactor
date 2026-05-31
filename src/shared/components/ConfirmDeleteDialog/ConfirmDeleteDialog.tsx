import styles from "./ConfirmDeleteDialog.module.css";

interface DeleteDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteDialog = ({
  onConfirm,
  onCancel,
}: DeleteDialogProps) => {
  return (
    <div className={styles["modal-overlay__delete"]}>
      <p className={styles["modal-overlay__delete-title"]}>
        Вы уверены, что хотите удалить заметку?
      </p>
      <div className={styles["modal-overlay__delete-buttons"]}>
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
