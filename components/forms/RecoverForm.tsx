import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { isEmail } from '../../helpers/validation';
import { useStartRecoveryMutation } from '../../redux/api/user';
import { Routes } from '../../types/routes';
import FormControl from './FormControl';

const RecoverForm = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const [startRecover, { error, isSuccess }] = useStartRecoveryMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    startRecover(email);
  };

  useEffect(() => {
    if (error) {
      handleRTKQError(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setSent(true);
    }
  }, [isSuccess]);

  if (sent) {
    return (
      <section className="container">
        <div className="message">
          <p>
            Для сброса пароля следуйте инструкции, отправленной на вашу почту{' '}
            {email}
          </p>
          <div className="message__actions">
            <button className="button" onClick={() => startRecover(email)}>
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
        Страница восстановления забытого пароля
      </h1>
      <form onSubmit={submitHandler}>
        <div className="form">
          <h2 className="form__title">Восстановление пароля</h2>
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
