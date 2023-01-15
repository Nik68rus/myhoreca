import Link from 'next/link';
import React, { useState } from 'react';
import userAPI from '../../api/userAPI';
import { handleError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { Routes } from '../../types/routes';
import FormControl from './FormControl';

const RecoverForm = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const startRecover = async () => {
    try {
      await userAPI.startRecover(email);
      setSent(true);
    } catch (error) {
      handleError(error);
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await startRecover();
  };

  if (sent) {
    return (
      <section className="container">
        <div className="message">
          <p>
            Для сброса пароля следуйте инструкции, отправленной на вашу почту{' '}
            {email}
          </p>
          <div className="message__actions">
            <button className="button" onClick={startRecover}>
              Отправить снова
            </button>
            <Link href={Routes.HOME} className="button">
              На главную
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <h1 className="visually-hidden">
        Страница восстановления забытого праоля
      </h1>
      <form onSubmit={submitHandler}>
        <div className="form">
          <h2 className="form__title">Восстановление праоля</h2>
          <FormControl
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите e-mail"
          />
          <div className="form__actions">
            <Link href={Routes.LOGIN}>Войти</Link>
            <button type="submit" className="button" disabled={!isEmail(email)}>
              Отправить
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RecoverForm;
