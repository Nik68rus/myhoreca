import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../types/routes';
import styles from './Header.module.scss';
import Logo from './Logo';

const Header = () => {
  return (
    <header>
      <div className={cx('container', styles.header)}>
        <Logo />
        <Link href={Routes.LOGIN} className="button">
          Войти
        </Link>
      </div>
    </header>
  );
};

export default Header;
