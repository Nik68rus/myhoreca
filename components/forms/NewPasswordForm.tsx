import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../helpers/error';
import { Routes } from '../../types/routes';
import FormControl from './FormControl';
import Spinner from '../layout/Spinner';
import {
  useFinishRecoveryMutation,
  useValidateRecoveryQuery,
} from '../../redux/api/user';

const NewPasswordForm = () => {
  const router = useRouter();
  const code = router.query.code as string;

  const initialState = {
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [badCode, setBadCode] = useState(false);

  const { password, password2 } = formData;

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //валидация формы на фронте
  useEffect(() => {
    if (password.trim() === password2.trim() && password.length > 4) {
      setIsValid(true);
    }
  }, [password, password2]);

  //валидация кода восстановления и поиск пользователя по нему
  const fetchCode = code || 'nocode';

  const { isError, isSuccess, isLoading } = useValidateRecoveryQuery(
    fetchCode,
    {
      skip: fetchCode === 'nocode',
    }
  );

  //обработка неверного когда
  useEffect(() => {
    if (isError) {
      setBadCode(true);
    }
  }, [isError]);

  //установка нового пароля для пользователя
  const [
    setPassword,
    {
      isLoading: settingLoading,
      isError: settingError,
      isSuccess: settingSuccess,
      data: result,
    },
  ] = useFinishRecoveryMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setPassword({ code, body: formData });
  };

  //обработка ошибки установки пароля
  useEffect(() => {
    if (settingError) {
      handleRTKQError(settingError);
    }
  }, [settingError]);

  //успех установки пароля
  useEffect(() => {
    if (settingSuccess) {
      toast.success(`Пароль для пользователя ${result} обновлен!`);
      router.push(`${Routes.LOGIN}?user=${result}`);
    }
  }, [settingSuccess, router, result]);

  //ui если код неверный
  if (badCode) {
    return (
      <div className="container">
        <div className="message">Неверный код сброса</div>
        <div className="message__actions">
          <Link href={Routes.HOME} className="button">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form">
        {isLoading && <Spinner />}
        {isSuccess && (
          <form onSubmit={submitHandler}>
            <h2 className="form__title">Сброс пароля</h2>
            <FormControl
              label="Новый пароль"
              type="password"
              id="password"
              value={password}
              onChange={inputChangeHandler}
              placeholder="Введите пароль"
              hint="Не менее 5 символов"
            />
            <FormControl
              label="Повторите пароль"
              type="password"
              id="password2"
              value={password2}
              onChange={inputChangeHandler}
              placeholder="Повторите пароль"
            />

            <div className="form__actions">
              <Link href={Routes.LOGIN}>Войти</Link>
              <button className="button" disabled={!isValid}>
                Отправить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewPasswordForm;
