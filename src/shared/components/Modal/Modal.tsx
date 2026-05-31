import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-overlay__container"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
