import Link from 'next/link';
import { useAppSelector } from '../hooks/store';
import { Routes } from '../types/routes';
import { UserRole } from '../types/user';
import styles from './Hero.module.scss';
import Heading from './ui/Heading';
import DayMoney from './DayMoney';

const COVERS = ["./assets/intro.mp4", "./assets/intro2.mp4", "./assets/intro3.mp4", "./assets/intro4.mp4",  "./assets/intro5.mp4"];

function getRandom(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const Hero = () => {
  const { authData } = useAppSelector((store) => store.user);

  const coverNum = getRandom(0, 5);

  return (
    <section className={styles.hero}>
      <div className={styles.bgVideo}>
        <video autoPlay muted loop playsInline className={styles.video}>
          <source src={COVERS[coverNum]} type="video/mp4" />
        </video>
      </div>
      {authData && authData.role === UserRole.OWNER && (
        <div className={styles.details}>
          <Heading level={1} className="mb-10">Здравствуйте, {authData.name}</Heading>
          <Heading level={5} className="mb-10">cегодня {new Date().toLocaleDateString('ru-RU', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
          </Heading>
          <p className="mt-0 mb-1">Продажи за день:</p>
          <DayMoney main />
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
          <p>Авторизируйтесь для продолжения работы</p>
          <div className={styles.actions}>
            <Link href={Routes.START} className="button button--heavy">
              Зарегистрироваться
            </Link>
            <Link href={Routes.SHOPLIST} className="button">
              Посмотреть меню
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
