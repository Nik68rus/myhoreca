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
import User from '../User';
import { setActiveSection } from '../../redux/slices/layoutSlice';
import { Section } from '../../types/sections';

const Header = () => {
  const router = useRouter();
  const { authData } = useAppSelector((store) => store.user);
  const { activeShop } = useAppSelector((store) => store.owner);
  const dispatch = useAppDispatch();

  const isMain = router.pathname === '/';
  const isAccount = router.pathname === Routes.ACCOUNT;

  const logoutHandler = () => {
    deleteCookie('accessToken');
    dispatch(resetAuth());
    router.push(Routes.LOGIN);
  };

  return (
    <header>
      <div
        className={cx('container mb-6', styles.header, {
          [styles.headerMain]: isMain,
          [styles.headerNoLogo]: isAccount,
        })}
      >
        {!isAccount && <Logo height={isMain ? 70 : 50} />}
        {isAccount && (
          <>
            <div className={styles.shop}>
              <span className={styles.label}>Выбрана точка:</span>
              {activeShop ? (
                <p className={styles.shopTitle}>{activeShop.title}</p>
              ) : (
                <button
                  className="button button--text"
                  onClick={() => dispatch(setActiveSection(Section.SHOPS))}
                >
                  Выбрать
                </button>
              )}
            </div>
            <div className={styles.date}>
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </>
        )}
        <div className={styles.actions}>
          {authData ? (
            <>
              <User name={authData.name} role={authData.role} />
              <button className="button button--heavy" onClick={logoutHandler}>
                Выйти
              </button>
            </>
          ) : (
            <Link href={Routes.LOGIN} className="button button--heavy">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
