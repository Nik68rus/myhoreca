import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setCookie } from '../../helpers/cookies';
import { handleRTKQError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { Routes } from '../../types/routes';
import { IUserAuthData, IUserRegData, UserRole } from '../../types/user';
import FormControl from './FormControl';
import { IUser } from '../../models/user';
import { useAppDispatch } from '../../hooks/store';
import { setAuth } from '../../redux/slices/userSlice';
import {
  useActivateEmployeeMutation,
  useCreateUserMutation,
  useGetByCodeQuery,
  useLoginMutation,
  userApi,
} from '../../redux/api/user';
import Spinner from '../layout/Spinner';

const AuthForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // параметр user и activated устанавливается после перехода по ссылке в активационном письме для главного пользователя
  const user = router.query.user as string | undefined;
  const activated = router.query.activated as string | undefined;

  // параметр code устанавливается после перехода по ссылке активации из письма для кассира по инвайту
  const code = router.query.code as string | undefined;

  const isLogin = router.pathname === Routes.LOGIN; // режим логина или регистрации
  const isInvite = code ? true : false; // заполняем ли профиль по инвайту

  const initialState: IUserRegData = {
    email: user ? user : '',
    name: '',
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState<IUserRegData>(initialState);
  const [isValid, setIsValid] = useState(false);
  const [invitedUser, setInvitedUser] = useState<IUser>();

  const { email, name, password, password2 } = formData;

  // валидация формы на фронте
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

  // перевод формы в режим регистрации пользователя по инвайту
  const fetchCode = code || 'nocode';

  const { data, isLoading: inviteChecking } = useGetByCodeQuery(fetchCode, {
    skip: fetchCode === 'nocode',
  });

  useEffect(() => {
    if (data) {
      setInvitedUser(data);
    }
  }, [data]);

  //--------------

  useEffect(() => {
    if (user || invitedUser) {
      setFormData({
        email: user ? user : invitedUser ? invitedUser.email : '',
        name: '',
        password: '',
        password2: '',
      });
    }
  }, [user, invitedUser]);

  //перевод формы в режим логина после активации пользователя
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

  // обработчик изменеия полей формы
  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // создание главного пользователя
  const [
    createUser,
    { isLoading: creatingUser, error: signupError, data: createdUser },
  ] = useCreateUserMutation();

  const startSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    createUser({ ...formData, role: UserRole.OWNER });
  };

  useEffect(() => {
    if (signupError) {
      handleRTKQError(signupError);
    }
  }, [signupError]);

  useEffect(() => {
    if (createdUser) {
      setCookie('accessToken', createdUser.accessToken);
      router.push(Routes.ACTIVATION);
    }
  }, [createdUser, router]);

  // создание кассира по инвайту
  const [
    activateEmployee,
    {
      isLoading: activatingEmployee,
      error: activatingError,
      isSuccess: activatingSuccess,
    },
  ] = useActivateEmployeeMutation();
  const inviteSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log(formData);
    activateEmployee(formData);
  };

  useEffect(() => {
    if (activatingError) {
      handleRTKQError(activatingError);
    }
  }, [activatingError]);

  useEffect(() => {
    if (activatingSuccess) {
      router.push(`${Routes.LOGIN}?activated=true&user=${formData.email}`);
    }
  }, [activatingSuccess, router, formData.email]);

  // логин пользователя
  const [
    loginUser,
    { isLoading: logining, data: loggedInUser, error: loginError },
  ] = useLoginMutation();
  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    loginUser({ email: formData.email, password: formData.password });
  };

  useEffect(() => {
    if (loginError) {
      handleRTKQError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (loggedInUser) {
      setCookie('accessToken', loggedInUser.accessToken);
      dispatch(setAuth(loggedInUser as IUserAuthData));
      loggedInUser.isActivated
        ? router.push(Routes.HOME)
        : router.push(Routes.ACTIVATION);
    }
  }, [loggedInUser, router, dispatch]);

  return (
    <div className="container">
      {(creatingUser || logining || inviteChecking || activatingEmployee) && (
        <Spinner />
      )}
      <form
        onSubmit={
          isLogin
            ? loginSubmitHandler
            : isInvite
            ? inviteSubmitHandler
            : startSubmitHandler
        }
      >
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
            disabled={invitedUser !== undefined}
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
