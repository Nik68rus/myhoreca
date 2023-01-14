import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import userAPI from '../../api/userAPI';
import AuthContext from '../../context/AuthContext';
import { setCookie } from '../../helpers/cookies';
import { handleError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { Routes } from '../../types/routes';
import { IUserRegData, UserRole } from '../../types/user';
import FormControl from '../FormControl/FormControl';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const isLogin = router.pathname === Routes.LOGIN;
  const isStart = router.pathname === Routes.START;
  // const isSignup = router.pathname === Routes.SIGNUP;

  const activated = router.query.activated as string | undefined;
  const user = router.query.user as string | undefined;

  const initialState: IUserRegData = {
    email: user ? user : '',
    name: '',
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState<IUserRegData>(initialState);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user,
        name: '',
        password: '',
        password2: '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && activated === 'true') {
      setFormData({
        email: user,
        name: '',
        password: '',
        password2: '',
      });
      toast.success(
        `Пользователь ${user} успешно активирован! Вы можете войти в аккаунт!`
      );
    }
  }, [user, activated]);

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
  };

  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const user = await userAPI.login(formData.email, formData.password);
      authCtx.setAuthData(user);
      setCookie('accessToken', user.accessToken);

      if (user.isActivated) {
        router.push(Routes.ACCOUNT);
      } else {
        router.push(Routes.ACTIVATION);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const startSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const user = await userAPI.createUser(formData, UserRole.OWNER);
      if (user) {
        authCtx.setAuthData(user);
        setCookie('accessToken', user.accessToken);
        router.push(Routes.ACTIVATION);
      }
    } catch (error) {
      handleError(error);
    }
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
      <form onSubmit={isLogin ? loginSubmitHandler : startSubmitHandler}>
        <div className="form">
          <h2 className="form__title">
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </h2>
          <FormControl
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={inputChangeHandler}
            placeholder="Введите e-mail"
          />
          {!isLogin && (
            <FormControl
              label="Имя"
              type="text"
              id="name"
              value={name}
              onChange={inputChangeHandler}
              placeholder="Введите имя"
              hint="Не менее 3 символов"
            />
          )}
          <FormControl
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={inputChangeHandler}
            placeholder="Введите пароль"
            hint="Не менее 5 символов"
          />

          {!isLogin && (
            <FormControl
              label="Повторный пароль"
              type="password"
              id="password2"
              value={password2}
              onChange={inputChangeHandler}
              placeholder="Повторите пароль"
            />
          )}
          <div className="form__actions">
            {isLogin ? (
              <>
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
