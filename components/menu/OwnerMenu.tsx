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
} from 'react-icons/fa';
import { Section } from '../../types/sections';
import { useAppSelector } from '../../hooks/store';

const menuItems = [
  { id: Section.ITEMS, title: Section.ITEMS, icon: <FaUtensils /> },
  { id: Section.SHOPS, title: Section.SHOPS, icon: <FaStore /> },
  { id: Section.EMPLOYYES, title: Section.EMPLOYYES, icon: <FaUsers /> },
  { id: Section.STOCK, title: Section.STOCK, icon: <FaBoxes /> },
  { id: Section.SALES, title: Section.SALES, icon: <FaCashRegister /> },
];

interface Props {
  onSelect: (id: Section) => void;
}

const OwnerMenu = ({ onSelect }: Props) => {
  const { activeSection } = useAppSelector((store) => store.layout);

  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.id} className={styles.item}>
          <button
            className={cx(styles.button, {
              [styles.buttonActive]: item.id === activeSection,
            })}
            onClick={() => onSelect(item.id)}
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
