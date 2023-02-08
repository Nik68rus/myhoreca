import React from 'react';
import styles from './Menu.module.scss';
import cx from 'classnames';

import {
  FaAngleRight,
  FaUtensils,
  FaCashRegister,
  FaUsers,
  FaStore,
  FaBoxes,
  FaPercent,
  FaLayerGroup,
} from 'react-icons/fa';
import { Section } from '../../types/sections';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { BiCoffeeTogo } from 'react-icons/bi';
import Link from 'next/link';
import { AccountRoutes, Routes } from '../../types/routes';
import { toggleMenu } from '../../redux/slices/layoutSlice';
import { useRouter } from 'next/router';

const menuItems = [
  {
    id: Section.SALES,
    title: Section.SALES,
    icon: <FaCashRegister />,
    path: AccountRoutes.SALES,
  },
  {
    id: Section.ITEMS,
    title: Section.ITEMS,
    icon: <FaUtensils />,
    path: AccountRoutes.ITEMS,
  },
  {
    id: Section.STOCK,
    title: Section.STOCK,
    icon: <FaBoxes />,
    path: AccountRoutes.STOCK,
  },
  {
    id: Section.DISCOUNT,
    title: Section.DISCOUNT,
    icon: <FaPercent />,
    path: AccountRoutes.DISCOUNT,
  },
  {
    id: Section.GROUPS,
    title: Section.GROUPS,
    icon: <FaLayerGroup />,
    path: AccountRoutes.GROUPS,
  },
  {
    id: Section.CUPS,
    title: Section.CUPS,
    icon: <BiCoffeeTogo />,
    path: AccountRoutes.CUPS,
  },
  {
    id: Section.EMPLOYYES,
    title: Section.EMPLOYYES,
    icon: <FaUsers />,
    path: AccountRoutes.EMPLOYEES,
  },
  {
    id: Section.SHOPS,
    title: Section.SHOPS,
    icon: <FaStore />,
    path: AccountRoutes.SHOPS,
  },
];

const OwnerMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const menuClickHandler = () => {
    dispatch(toggleMenu(false));
  };

  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.id} className={styles.item}>
          <Link
            className={cx(styles.button, {
              [styles.buttonActive]:
                (slug && item.path === slug[0]) ||
                (!slug && item.path === AccountRoutes.SALES),
            })}
            onClick={menuClickHandler}
            href={`${Routes.ACCOUNT}/${item.path}`}
          >
            {item.icon}
            <span className={styles.title}>{item.title}</span>
            <span className={styles.caret}>
              <FaAngleRight />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default OwnerMenu;
