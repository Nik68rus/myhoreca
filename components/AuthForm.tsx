import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userAPI from '../api/userAPI';
import { isEmail } from '../helpers/validation';
import { Routes } from '../types/routes';
import { IUserRegData } from '../types/user';

const AuthForm = () => {
  const router = useRouter();
  const isLogin = router.pathname === Routes.LOGIN;

  const initialState: IUserRegData = {
    email: '',
    name: '',
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState<IUserRegData>(initialState);
  const [isValid, setIsValid] = useState(false);

  const { email, name, password, password2 } = formData;

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signupSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log(formData);
    try {
      const userData = await userAPI.createUser(formData);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Что-то пошло не так, попробуйте позже!');
      }
    }
  };

  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    if (isLogin) {
      if (isEmail(email) && password.trim().length > 4) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (
        isEmail(email) &&
        name.trim().length > 2 &&
        password.trim().length > 4 &&
        password.trim() === password2.trim()
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [isLogin, email, name, password, password2]);

  return (
    <div className="container">
      <form onSubmit={isLogin ? loginSubmitHandler : signupSubmitHandler}>
        <div className="form">
          <h2 className="form__title">
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </h2>
          <div className="form__control">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={inputChangeHandler}
              placeholder="Введите e-mail"
            />
          </div>
          {!isLogin && (
            <div className="form__control">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={inputChangeHandler}
                placeholder="Введите имя"
              />
              <span className="form__hint">Не менее 3 символов</span>
            </div>
          )}
          <div className="form__control">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={inputChangeHandler}
              placeholder="Введите пароль"
            />
            <span className="form__hint">Не менее 5 символов</span>
          </div>
          {!isLogin && (
            <div className="form__control">
              <label htmlFor="password2">Повторите пароль</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={inputChangeHandler}
                placeholder="Повторите пароль"
              />
            </div>
          )}
          <div className="form__actions">
            {isLogin ? (
              <>
                <Link href={Routes.SIGNUP}>Регистрация</Link>
                <Link href={Routes.RECOVER}>Забыли пароль?</Link>
                <button type="submit" className="button" disabled={!isValid}>
                  Войти
                </button>
              </>
            ) : (
              <>
                <Link href={Routes.LOGIN}>Войти</Link>
                <button type="submit" className="button" disabled={!isValid}>
                  Зарегистрироваться
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
