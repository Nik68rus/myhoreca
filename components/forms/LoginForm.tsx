import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setCookie } from '../../helpers/cookies';
import { handleRTKQError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { Routes } from '../../types/routes';
import { IUserAuthData, IUserLoginData } from '../../types/user';
import FormControl from './FormControl';
import { useAppDispatch } from '../../hooks/store';
import { setAuth } from '../../redux/slices/userSlice';
import { useLoginMutation } from '../../redux/api/user';
import Spinner from '../layout/Spinner';
import { userDataDto } from '../../helpers/dto';
import Card from '../ui/Card';
import styles from './Form.module.scss';
import cx from 'classnames';
import Heading from '../ui/Heading';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // параметр user устанавливается после перехода по ссылке в активационном письме для главного пользователя
  const user = router.query.user as string | undefined;
  const activation = router.query.activation as string | undefined;

  const [formData, setFormData] = useState<IUserLoginData>({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(false);

  const { email, password } = formData;

  // валидация формы на фронте
  useEffect(() => {
    if (isEmail(email) && password.trim().length > 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  //перевод формы в режим логина после активации пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        email: user,
        password: '',
      });
    }
    if (activation) {
      toast.success(
        `Пользователь ${user} успешно активирован! Вы можете войти в аккаунт!`
      );
    }
  }, [activation, user]);
  // обработчик изменеия полей формы
  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // логин пользователя
  const [
    loginUser,
    { isLoading: logining, data: loggedInUser, error: loginError },
  ] = useLoginMutation();

  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    loginUser({ email: formData.email, password: formData.password });
  };

  useEffect(() => {
    handleRTKQError(loginError);
  }, [loginError]);

  useEffect(() => {
    if (loggedInUser) {
      setCookie('accessToken', loggedInUser.accessToken);
      setCookie('refreshToken', loggedInUser.refreshToken);
      dispatch(setAuth(userDataDto(loggedInUser)));
      loggedInUser.isActivated
        ? router.push(Routes.HOME)
        : router.push(Routes.ACTIVATION);
    }
  }, [loggedInUser, router, dispatch]);

  return (
    <div className={cx('container', styles.formContainer)}>
      {logining && <Spinner />}
      <form onSubmit={loginSubmitHandler}>
        <Card className="form">
          <Heading level={3} className="form__title mb-4">
            Авторизация
          </Heading>
          <FormControl
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={inputChangeHandler}
            placeholder="Введите e-mail"
          />
          <FormControl
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={inputChangeHandler}
            placeholder="Введите пароль"
            hint="Не менее 5 символов"
          />
          <div className="form__actions">
            <Link href={Routes.RECOVER}>Забыли пароль?</Link>
            <button type="submit" className="button" disabled={!isValid}>
              Войти
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
