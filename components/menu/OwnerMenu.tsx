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
import { Routes } from '../../types/routes';
import { toggleMenu } from '../../redux/slices/layoutSlice';

const menuItems = [
  {
    id: Section.SALES,
    title: Section.SALES,
    icon: <FaCashRegister />,
    path: 'sales',
  },
  {
    id: Section.ITEMS,
    title: Section.ITEMS,
    icon: <FaUtensils />,
    path: 'items',
  },
  { id: Section.STOCK, title: Section.STOCK, icon: <FaBoxes />, path: 'stock' },
  {
    id: Section.DISCOUNT,
    title: Section.DISCOUNT,
    icon: <FaPercent />,
    path: 'discounts',
  },
  {
    id: Section.GROUPS,
    title: Section.GROUPS,
    icon: <FaLayerGroup />,
    path: 'groups',
  },
  {
    id: Section.CUPS,
    title: Section.CUPS,
    icon: <BiCoffeeTogo />,
    path: 'cups',
  },
  {
    id: Section.EMPLOYYES,
    title: Section.EMPLOYYES,
    icon: <FaUsers />,
    path: 'employees',
  },
  { id: Section.SHOPS, title: Section.SHOPS, icon: <FaStore />, path: 'shops' },
];

interface Props {
  onSelect: (id: Section) => void;
}

const OwnerMenu = ({ onSelect }: Props) => {
  const { activeSection, menuOpen } = useAppSelector((store) => store.layout);
  const dispatch = useAppDispatch();

  const menuClickHandler = (section: Section) => {
    onSelect(section);
    dispatch(toggleMenu(false));
  };

  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.id} className={styles.item}>
          <button
            className={cx(styles.button, {
              [styles.buttonActive]: item.id === activeSection,
            })}
            onClick={menuClickHandler.bind(this, item.id)}
          >
            {item.icon}
            <span className={styles.title}>{item.title}</span>
            <span className={styles.caret}>
              <FaAngleRight />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OwnerMenu;
