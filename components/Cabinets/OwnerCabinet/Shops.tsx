import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { IShop } from '../../../models/shop';
import AddShopModal from '../../modals/AddShopModal';

import styles from './Shops.module.scss';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { useGetShopsQuery } from '../../../redux/api/shop';
import { setActiveShop } from '../../../redux/slices/ownerSlice';
import { shopDto } from '../../../helpers/dto';

const Shops = () => {
  const [addShopVisible, setAddShopVisible] = useState(false);
  const { activeShop } = useAppSelector((store) => store.owner);
  const dispatch = useAppDispatch();

  const { data: shops, isLoading, error } = useGetShopsQuery();

  useEffect(() => {
    if (error) {
      handleRTKQError(error);
    }
  }, [error]);

  const shopClickHandler = (shop: IShop) => {
    dispatch(setActiveShop(shopDto(shop)));
  };

  let shopBlock = <p>Вы не добавили ни одной точки продаж</p>;

  if (shops && shops.length) {
    shopBlock = (
      <>
        <h3>Ваши точки продаж:</h3>
        <ul className={styles.list}>
          {shops.map((shop) => (
            <li key={shop.id} className={styles.item}>
              {shop.title}{' '}
              <button
                className={cx('button button--small', {
                  ['button--outline']: shop.title !== activeShop?.title,
                })}
                onClick={shopClickHandler.bind(this, shop)}
              >
                Выбрать
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      {isLoading && <Spinner />}
      {shopBlock}
      <button className="button" onClick={() => setAddShopVisible(true)}>
        Добавить
      </button>
      {addShopVisible && (
        <AddShopModal onClose={() => setAddShopVisible(false)} />
      )}
    </div>
  );
};

export default Shops;
