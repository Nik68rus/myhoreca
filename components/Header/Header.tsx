import Link from 'next/link';
import React, { useContext } from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';
import { deleteCookie } from '../../helpers/cookies';

const Header = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const isMain = router.pathname === '/';

  const logoutHandler = () => {
    deleteCookie('accessToken');
    authCtx.setAuthData(null);
  };

  return (
    <header>
      <div
        className={cx('container', styles.header, {
          [styles.headerMain]: isMain,
        })}
      >
        <Logo />
        {authCtx.authData ? (
          <button className="button" onClick={logoutHandler}>
            Выйти
          </button>
        ) : (
          <Link href={Routes.LOGIN} className="button">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
