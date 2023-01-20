import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { setCookie } from '../../helpers/cookies';
import { handleRTKQError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { Routes } from '../../types/routes';
import { IUserRegData, UserRole } from '../../types/user';
import FormControl from './FormControl';
import { IUser } from '../../models/user';
import { useAppDispatch } from '../../hooks/store';
import {
  useActivateEmployeeMutation,
  useCreateUserMutation,
  useGetByCodeMutation,
  // useGetByCodeQuery,
} from '../../redux/api/user';
import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';
import { ISpace } from '../../models/space';
import Card from '../ui/Card';
import styles from './Form.module.scss';
import cx from 'classnames';
import Heading from '../ui/Heading';

const initialState: IUserRegData = {
  email: '',
  name: '',
  password: '',
  password2: '',
  space: '',
};

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // параметр code устанавливается после перехода по ссылке активации из письма для кассира по инвайту
  const code = router.query.code as string | undefined;
  const isInvite = code ? true : false; // заполняем ли профиль по инвайту

  const [formData, setFormData] = useState<IUserRegData>(initialState);
  const [isValid, setIsValid] = useState(false);
  const [invitedUser, setInvitedUser] = useState<IUser & { space: ISpace }>();

  const { email, name, password, password2, space } = formData;

  // валидация формы на фронте
  useEffect(() => {
    if (
      isEmail(email) &&
      name.trim().length > 2 &&
      space.trim().length > 2 &&
      password.trim().length > 4 &&
      password.trim() === password2.trim()
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, name, password, password2, space]);

  // перевод формы в режим регистрации пользователя по инвайту

  const [getUserByCode, { isLoading: inviteChecking, data }] =
    useGetByCodeMutation();

  useEffect(() => {
    if (code) {
      getUserByCode(code);
    }
  }, [code, getUserByCode]);

  useEffect(() => {
    if (data) {
      setInvitedUser(data);
    }
  }, [data]);

  //--------------

  useEffect(() => {
    if (invitedUser) {
      setFormData({
        ...initialState,
        email: invitedUser.email,
        space: invitedUser.space.title,
      });
    }
  }, [invitedUser]);

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
      // setCookie('accessToken', createdUser.accessToken);
      router.push(Routes.HOME);
      toast.success(
        'Для активации аккаунта следуйте инструкции, отправленной на вашу почту!'
      );
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
    activateEmployee({
      ...formData,
      id: invitedUser!.id,
      activationCode: invitedUser?.activationCode,
    });
  };

  useEffect(() => {
    if (activatingError) {
      handleRTKQError(activatingError);
    }
  }, [activatingError]);

  useEffect(() => {
    if (activatingSuccess) {
      router.push(`${Routes.LOGIN}?activated=true&user=${formData.email}`);
      toast.success(`Аккаунт активирован! Вы можете авторизоваться!`);
    }
  }, [activatingSuccess, router, formData.email]);

  return (
    <div className={cx('container', styles.formContainer)}>
      {(creatingUser || inviteChecking || activatingEmployee) && <Spinner />}
      <form onSubmit={isInvite ? inviteSubmitHandler : startSubmitHandler}>
        <Card className="form">
          <Heading level={3} className="form__title mb-4">
            Регистрация
          </Heading>
          <FormControl
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={inputChangeHandler}
            placeholder="Введите e-mail"
            disabled={invitedUser !== undefined}
          />
          <FormControl
            label="Компания"
            type="text"
            id="space"
            value={space}
            onChange={inputChangeHandler}
            placeholder="Введите название компании"
            hint="Не менее 3 символов"
            disabled={invitedUser !== undefined}
          />
          <FormControl
            label="Имя"
            type="text"
            id="name"
            value={name}
            onChange={inputChangeHandler}
            placeholder="Введите имя"
            hint="Не менее 3 символов"
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
          <FormControl
            label="Повторный пароль"
            type="password"
            id="password2"
            value={password2}
            onChange={inputChangeHandler}
            placeholder="Повторите пароль"
          />
          <div className="form__actions">
            <Link href={Routes.LOGIN}>Войти</Link>
            <button type="submit" className="button" disabled={!isValid}>
              Зарегистрироваться
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SignupForm;
