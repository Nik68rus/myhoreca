import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Header.module.scss';
import Logo from '../Logo';
import { useRouter } from 'next/router';
import { deleteCookie } from '../../helpers/cookies';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resetAuth } from '../../redux/slices/userSlice';

const Header = () => {
  const router = useRouter();
  const { authData } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const isMain = router.pathname === '/';

  const logoutHandler = () => {
    deleteCookie('accessToken');
    dispatch(resetAuth());
    router.push(Routes.LOGIN);
  };

  return (
    <header>
      <div
        className={cx('container', styles.header, {
          [styles.headerMain]: isMain,
        })}
      >
        <Logo />
        {authData ? (
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
