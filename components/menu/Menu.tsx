import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { UserRole } from '../../types/user';
import OwnerMenu from './OwnerMenu';
import styles from './Menu.module.scss';
import Logo from '../Logo';
import { setActiveSection, toggleMenu } from '../../redux/slices/layoutSlice';
import { Section } from '../../types/sections';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaTimes,
} from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useDeleteTokenMutation } from '../../redux/api/refresh';
import { deleteCookie } from '../../helpers/cookies';
import { resetAuth } from '../../redux/slices/userSlice';

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { authData } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const menuOpen = useAppSelector((store) => store.layout.menuOpen);

  const [deleteToken, { isSuccess, reset }] = useDeleteTokenMutation();

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

  const selectHandler = (sectionId: Section) => {
    dispatch(setActiveSection(sectionId));
  };

  let content: React.ReactNode = 'MENU';

  if (authData?.role === UserRole.OWNER) {
    content = <OwnerMenu onSelect={selectHandler} />;
  }

  return (
    <div
      className={cx(styles.menu, {
        [styles.menuShort]: collapsed,
        [styles.open]: menuOpen,
      })}
    >
      <div
        className={cx(styles.menuHeader, 'mb-15')}
        style={{ height: `54px` }}
      >
        {collapsed ? null : <Logo className={styles.logo} height={54} />}
        <button
          aria-label={collapsed ? 'Развернуть' : 'Свернуть'}
          onClick={setCollapsed.bind(this, !collapsed)}
          className={styles.expandButton}
        >
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
        <button
          className={styles.mobileBtn}
          onClick={() => dispatch(toggleMenu(false))}
        >
          <FaTimes />
        </button>
      </div>
      {content}
      <div className={styles.menuFooter}>
        <button className={styles.button} onClick={logoutHandler}>
          <BiLogOut />
          <span className={styles.title}>Выйти</span>
          <span className={styles.caret}>
            <FaAngleRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
