import React from 'react';
import cx from 'classnames';
import { IMenuItem } from '../../services/ShopService';
import styles from './MenuItem.module.scss';
import {
  GiCoffeeBeans,
  GiCoffeeCup,
  GiCupcake,
  GiTeapotLeaves,
} from 'react-icons/gi';

interface Props {
  item: IMenuItem;
}

const getIcon = (catTitle: string) => {
  if (catTitle === 'Напитки') {
    return <GiCoffeeCup />;
  }

  if (catTitle === 'Десерты') {
    return <GiCupcake />;
  }

  if (catTitle === 'Чай') {
    return <GiTeapotLeaves />;
  } else {
    return <GiCoffeeBeans />;
  }
};

const MenuItem = ({ item }: Props) => {
  return (
    <div className={cx(styles.item, 'p-4')}>
      <div className={styles.icon}>{getIcon(item.category)}</div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.price}>{item.price}</div>
    </div>
  );
};

export default MenuItem;
