import Link from 'next/link';
import React from 'react';
import { Routes } from '../../types/routes';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.bgVideo}>
        <video autoPlay muted loop className={styles.video}>
          <source src="./assets/intro.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.details}>
        <h1>My HoReCa</h1>
        <p>Контролируйте удаленно свой бизнес</p>
        <Link href={Routes.START} className="button">
          Начать
        </Link>
      </div>
    </section>
  );
};

export default Hero;
