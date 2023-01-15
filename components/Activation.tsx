import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import userAPI from '../api/userAPI';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';

const Activation = () => {
  const repeatHandler = () => {
    userAPI.sendActivationCode();
  };

  return (
    <div className="container">
      <div className="message">
        <p>
          Для продолжения работы следуйте инструкции по активации аккаунта,
          отправленной на Вашу почту.
        </p>
        <div className="message__actions">
          <button className="button" onClick={repeatHandler}>
            Отправить снова
          </button>
          <Link href={Routes.HOME} className="button">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activation;
