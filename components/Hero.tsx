import Link from 'next/link';
import { useAppSelector } from '../hooks/store';
import { Routes } from '../types/routes';
import { UserRole } from '../types/user';
import styles from './Hero.module.scss';
import Heading from './ui/Heading';

const Hero = () => {
  const { authData } = useAppSelector((store) => store.user);

  return (
    <section className={styles.hero}>
      <div className={styles.bgVideo}>
        <video autoPlay muted loop playsInline className={styles.video}>
          <source src="./assets/intro.mp4" type="video/mp4" />
        </video>
      </div>
      {authData && authData.role === UserRole.OWNER && (
        <div className={styles.details}>
          <Heading level={1}>Здравствуйте, {authData.name}</Heading>
          <p> Скоро здесь будут основные данные за сегодняшний день</p>
          <Link href={Routes.ACCOUNT} className="button">
            Личный кабинет
          </Link>
        </div>
      )}
      {authData && authData.role === UserRole.CASHIER && (
        <div className={styles.details}>
          <Heading level={1}>Здравствуйте, {authData.name}</Heading>
          <p> Вы можете приступить к работе</p>
          <Link href={Routes.ACCOUNT} className="button">
            Кабинет кассира
          </Link>
        </div>
      )}
      {!authData && (
        <div className={styles.details}>
          <Heading level={1}>My HoReCa</Heading>
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
