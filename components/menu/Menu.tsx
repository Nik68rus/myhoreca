import React, { useState } from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { UserRole } from '../../types/user';
import OwnerMenu from './OwnerMenu';
import styles from './Menu.module.scss';
import Spinner from '../layout/Spinner';
import Logo from '../Logo';
import { setActiveSection } from '../../redux/slices/layoutSlice';
import { Section } from '../../types/sections';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { authData } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const selectHandler = (sectionId: Section) => {
    dispatch(setActiveSection(sectionId));
  };

  let content: React.ReactNode = 'MENU';

  if (authData?.role === UserRole.OWNER) {
    content = <OwnerMenu onSelect={selectHandler} />;
  }

  return (
    <div className={cx(styles.menu, { [styles.menuShort]: collapsed })}>
      <div
        className={cx(styles.menuHeader, 'mb-15')}
        style={{ height: `54px` }}
      >
        {collapsed ? null : <Logo height={54} />}
        <button
          aria-label={collapsed ? 'Развернуть' : 'Свернуть'}
          onClick={setCollapsed.bind(this, !collapsed)}
          className={styles.expandButton}
        >
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </div>
      {content}
    </div>
  );
};

export default Menu;
