import { useState, type ChangeEvent } from "react";
import { useAuth } from "../../../../app/providers/useAuth";
import styles from "./ProfilePage.module.css";
import { supabase } from "../../../../shared/api/supabase";

interface ProfilePageProps {
  onCloseProfile: () => void;
}

export const ProfilePage = ({ onCloseProfile }: ProfilePageProps) => {
  const { user } = useAuth();

  const [newPasswordValue, setNewPasswordValue] = useState<string>("");
  const [submitNewPasswordValue, setSubmitNewPasswordValue] =
    useState<string>("");

  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const handleNewPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPasswordValue(e.target.value);
    if (passwordMessage !== "") setPasswordMessage("");
  };
  const handleSubmitNewPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitNewPasswordValue(e.target.value);
    if (passwordMessage !== "") setPasswordMessage("");
  };

  const handlePasswordChange = async () => {
    if (newPasswordValue !== submitNewPasswordValue) {
      setPasswordMessage("Пароли не совпадают");
      return;
    }

    if (newPasswordValue.length < 6) {
      setPasswordMessage("Пароль слишком короткий");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPasswordValue,
    });
    if (error) {
      setPasswordMessage("Ошибка при изменении пароля!");
      return;
    } else {
      setPasswordMessage("Данные обновлены!");
      setNewPasswordValue("");
      setSubmitNewPasswordValue("");
      return;
    }
  };

  return (
    <div className={styles["profile"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["profile__column"]}>
          <div className={styles["profile__column-image"]}>
            {user?.user_metadata.username[0] || user?.email?.[0] || "?"}
          </div>
          <h3 className={styles["profile__column-username"]}>
            {user?.user_metadata.username}
          </h3>
        </div>
        <div className={styles["profile__column"]}>
          <button
            className={styles["profile__column-back"]}
            onClick={onCloseProfile}
          >
            На главную
          </button>
          <h3 className={styles["profile__column-title"]}>Информация</h3>
          <div className={styles["profile__column-data"]}>
            <div className={styles["profile__column-data-line"]}>
              <p>Создан:</p>
              <p>{user?.created_at.slice(0, 10)}</p>
            </div>
            <div className={styles["profile__column-data-line"]}>
              <p>Email:</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className={styles["profile__column-security"]}>
            <h3 className={styles["profile__column-security-title"]}>
              Сменить пароль
            </h3>
            <div className={styles["profile__column-security-password"]}>
              <div className={styles["password-container"]}>
                <label htmlFor="new-pass">Новый пароль</label>
                <input
                  type="password"
                  value={newPasswordValue}
                  onChange={handleNewPassChange}
                  id="new-pass"
                />
              </div>
              <div className={styles["password-container"]}>
                <label htmlFor="submit-new-pass" className={styles["password-container__label"]}>
                  Подтверждение нового пароля
                </label>
                <input
                  type="password"
                  value={submitNewPasswordValue}
                  onChange={handleSubmitNewPassChange}
                  id="submit-new-pass"
                  className={styles["password-container__input"]}
                />
              </div>
              <div className={styles["password-message"]}>
                {passwordMessage && <p>{passwordMessage}</p>}
              </div>
            </div>

            <button
              type="submit"
              className={styles["profile__column-security-submit"]}
              onClick={handlePasswordChange}
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
