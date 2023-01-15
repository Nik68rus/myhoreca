import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userAPI from '../../api/userAPI';
import { handleError } from '../../helpers/error';
import { Routes } from '../../types/routes';
import FormControl from './FormControl';
import Spinner from '../layout/Spinner';

const NewPasswordForm = () => {
  const router = useRouter();
  const code = router.query.code as string;

  const initialState = {
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [badCode, setBadCode] = useState(false);

  const { password, password2 } = formData;

  useEffect(() => {
    if (password.trim() === password2.trim() && password.length > 4) {
      setIsValid(true);
    }
  }, [password, password2]);

  useEffect(() => {
    const checkCode = async () => {
      if (code) {
        try {
          const result = await userAPI.validateRecoverCode(code);
          if (!result) {
            throw new Error('Неверный код');
          }
        } catch (error) {
          setBadCode(true);
        } finally {
          setLoading(false);
        }
      }
    };

    checkCode();
  }, [code]);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await userAPI.finishRecover(code, formData);
      toast.success(`Пароль для пользователя ${result} обновлен!`);
      router.push(Routes.LOGIN);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

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
      </div>
    </div>
  );
};

export default NewPasswordForm;
