import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { IShop } from '../../../models/shop';
import AddShopModal from '../../modals/AddShopModal';

import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { useGetShopsQuery } from '../../../redux/api/shop';
import { setActiveShop } from '../../../redux/slices/shopSlice';
import { shopDto } from '../../../helpers/dto';
import Heading from '../../ui/Heading';
import styles from './Shops.module.scss';
import Card from '../../ui/Card';
import ShopButton from './ShopButton';

const Shops = () => {
  const [addShopVisible, setAddShopVisible] = useState(false);
  const { activeShop } = useAppSelector((store) => store.shop);
  const dispatch = useAppDispatch();

  const { data: shops, isLoading, error } = useGetShopsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  const shopClickHandler = (shop: IShop) => {
    dispatch(setActiveShop(shopDto(shop)));
  };

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          <Heading level={5} className="mb-4">
            Ваши точки продаж:
          </Heading>
          <ul className={styles.list}>
            {shops &&
              shops.map((shop) => (
                <li key={shop.id} className={styles.item}>
                  <ShopButton shop={shop} />
                </li>
              ))}
            <li>
              <ShopButton shop={null} onAdd={() => setAddShopVisible(true)} />
            </li>
          </ul>
          {addShopVisible && (
            <AddShopModal onClose={() => setAddShopVisible(false)} />
          )}
        </Card>
      )}
    </>
  );
};

export default Shops;
