import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Header.module.scss';
import Logo from '../Logo';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from '../../helpers/cookies';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resetAuth } from '../../redux/slices/userSlice';
import User from '../User';
import SelectShopModal from '../modals/SelectShopModal';
import { useDeleteTokenMutation } from '../../redux/api/refresh';
import { RxHamburgerMenu } from 'react-icons/rx';
import { toggleMenu } from '../../redux/slices/layoutSlice';

const Header = () => {
  const router = useRouter();
  const { authData } = useAppSelector((store) => store.user);
  const { activeShop } = useAppSelector((store) => store.shop);
  const { menuOpen } = useAppSelector((store) => store.layout);
  const dispatch = useAppDispatch();
  const [shopModalVisible, setShopModalVisible] = useState(false);
  const [short, setShort] = useState(false);

  const isMain = router.pathname === '/';
  const isAccount = router.pathname === Routes.ACCOUNT;

  const [deleteToken, { isSuccess, reset }] = useDeleteTokenMutation();

  const menuToggleHandler = () => {
    dispatch(toggleMenu(!menuOpen));
  };

  const logoutHandler = () => {
    deleteToken();
  };

  useEffect(() => {
    if (isSuccess) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      dispatch(resetAuth());
      reset();
    }
  }, [isSuccess, dispatch, reset]);

  useEffect(() => {
    const breakpointSm = window.matchMedia('(max-width: 767px)');

    const bpChecker = () => {
      if (breakpointSm.matches) {
        setShort(true);
      } else {
        setShort(false);
      }
    };
    bpChecker();
    breakpointSm.addListener(bpChecker);
  }, []);

  return (
    <header
      className={cx(styles.header, {
        [styles.headerMain]: isMain,
      })}
    >
      <div className={cx('container', styles.headerContainer)}>
        {!isAccount && <Logo height={isMain ? 70 : 50} short={short} />}
        {isAccount && (
          <>
            <button
              className={cx('button button--icon', styles.menuToggle)}
              onClick={menuToggleHandler}
            >
              <RxHamburgerMenu />
            </button>
            <div className={styles.shop}>
              <span className={styles.label}>Выбрана точка:</span>
              <button
                className="button button--text"
                onClick={() => setShopModalVisible(true)}
              >
                {activeShop ? activeShop.title : 'Выбрать'}
              </button>
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
              <button
                className={cx('button button--heavy', styles.exitBtn)}
                onClick={logoutHandler}
              >
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
      {shopModalVisible && (
        <SelectShopModal onClose={() => setShopModalVisible(false)} />
      )}
    </header>
  );
};

export default Header;
