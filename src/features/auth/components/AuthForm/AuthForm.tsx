import { useState, type ChangeEvent } from "react";
import styles from "./AuthForm.module.css";
import { useAuth } from "../../../../app/providers/useAuth";

export const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [mailValue, setMailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { signIn, signUp } = useAuth();

  const handleMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailValue(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmitLogin = async () => {
    if (mailValue.length === 0 || passwordValue.length === 0) return;
    setSubmitting(true);

    try {
      await signIn(mailValue, passwordValue);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitRegister = async () => {
    if (
      mailValue.length === 0 ||
      passwordValue.length === 0 ||
      username.length === 0
    )
      return;
    setSubmitting(true);

    try {
      await signUp(mailValue, passwordValue, username);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className={styles["auth-form"]}>
      <h2 className={styles["auth-form__title"]}>
        {!isLoginMode ? "Регистрация" : "Авторизация"}
      </h2>
      {!isLoginMode && (
        <input
          type="text"
          className={styles["auth-form__username"]}
          placeholder="Имя пользователя"
          onChange={handleUsernameChange}
        />
      )}

      {error && <p className={styles["auth-form__error"]}>{error}</p>}
      <input
        type="email"
        value={mailValue}
        onChange={(e) => {
          handleMailChange(e);
        }}
        className={styles["auth-form__email"]}
        placeholder="email"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => {
          handlePasswordChange(e);
        }}
        className={styles["auth-form__password"]}
        placeholder="Пароль"
      />
      <button
        type="submit"
        onClick={isLoginMode ? handleSubmitLogin : handleSubmitRegister}
        className={styles["auth-form__login"]}
        disabled={submitting}
      >
        {!isLoginMode ? "Создать аккаунт" : "Войти"}
      </button>
      <div className={styles["auth-form__change"]}>
        <p> {!isLoginMode ? "Уже есть аккаунт?" : "Нет аккаунта?"}</p>

        <button
          className={styles["auth-form__change-signUp"]}
          onClick={toggleLoginMode}
        >
          {!isLoginMode ? "Войти" : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
};
