import React from 'react';
import { FaPlus, FaStore } from 'react-icons/fa';
import { IShop } from '../../../models/shop';
import cx from 'classnames';
import styles from './ShopButton.module.scss';
import { setActiveShop } from '../../../redux/slices/shopSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';

interface Props {
  shop: IShop | null;
  onAdd?: () => void;
}

const ShopButton = ({ shop, onAdd }: Props) => {
  const { activeShop } = useAppSelector((store) => store.shop);
  const dispatch = useAppDispatch();

  const clickHandler = (shop: IShop) => {
    dispatch(setActiveShop(shop));
  };
  if (shop) {
    return (
      <button
        onClick={clickHandler.bind(this, shop)}
        className={cx(styles.button, {
          [styles.active]: shop.id === activeShop?.id,
        })}
      >
        <span className={styles.icon}>
          <FaStore />
        </span>
        {shop.title}
      </button>
    );
  }

  if (shop === null && onAdd) {
    return (
      <button onClick={() => onAdd()} className={styles.button}>
        <span className={styles.icon}>
          <FaPlus />
        </span>
        Добавить
      </button>
    );
  }

  return null;
};

export default ShopButton;
