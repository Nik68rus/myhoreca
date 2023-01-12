import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const isMain = router.pathname === '/';
  return (
    <header>
      <div
        className={cx('container', styles.header, {
          [styles.headerMain]: isMain,
        })}
      >
        <Logo />
        <Link href={Routes.LOGIN} className="button">
          Войти
        </Link>
      </div>
    </header>
  );
};

export default Header;
