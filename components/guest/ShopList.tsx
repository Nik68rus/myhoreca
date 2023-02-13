import React from 'react';
import { IShop } from '../../models/shop';
import { Routes } from '../../types/routes';
import ShopButton from '../cabinet/OwnerCabinet/ShopButton';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import styles from './ShopList.module.scss';

interface Props {
  shops: IShop[];
}

const ShopList = ({ shops }: Props) => {
  return (
    <Card className="mt-6">
      <Heading>Список зарегистрированных точек:</Heading>
      {shops.length ? (
        <ul className={styles.list}>
          {shops.map((shop) => (
            <li key={shop.id} className={styles.item}>
              <ShopButton shop={shop} href={`${Routes.SHOPLIST}/${shop.id}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Здесь еще ничего нет!</p>
      )}
    </Card>
  );
};

export default ShopList;
