import Link from 'next/link';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';
import { UserRole } from '../types/user';
import styles from './Hero.module.scss';

const Hero = () => {
  const { authData } = useContext(AuthContext);

  return (
    <section className={styles.hero}>
      <div className={styles.bgVideo}>
        <video autoPlay muted loop className={styles.video}>
          <source src="./assets/intro.mp4" type="video/mp4" />
        </video>
      </div>
      {authData && authData.role === UserRole.OWNER && (
        <div className={styles.details}>
          <h1 className="heading heading--h1">Здравствуйте, {authData.name}</h1>
          <p> Скоро здесь будут основные данные за сегодняшний день</p>
          <Link href={Routes.ACCOUNT} className="button">
            Кабинет директора
          </Link>
        </div>
      )}
      {authData && authData.role === UserRole.CASHIER && (
        <div className={styles.details}>
          <h1 className="heading heading--h1">Здравствуйте, {authData.name}</h1>
          <p> Вы можете приступить к работе</p>
          <Link href={Routes.ACCOUNT} className="button">
            Кабинет кассира
          </Link>
        </div>
      )}
      {!authData && (
        <div className={styles.details}>
          <h1>My HoReCa</h1>
          <p>Контролируйте удаленно свой бизнес</p>
          <Link href={Routes.START} className="button">
            Зарегистрироваться
          </Link>
        </div>
      )}
    </section>
  );
};

export default Hero;
