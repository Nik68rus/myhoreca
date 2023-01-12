import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { Routes } from '../../types/routes';
import styles from './Activation.module.scss';

const Activation = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authCtx.isAuth) {
      router.push(Routes.LOGIN);
    }
  }, [authCtx.isAuth, router]);

  return (
    <div className="container">
      <div className={styles.message}>
        <p>
          Для продолжения работы следуйте инструкции по активации аккаунта,
          отправленной на Вашу почту.
        </p>
        <div className={styles.actions}>
          <button className="button">Отправить снова</button>
          <Link href={Routes.HOME} className="button">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activation;
