import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { IShop } from '../../models/shop';
import { useCreateCategoryMutation } from '../../redux/api/category';
import { useGetShopsQuery } from '../../redux/api/shop';
import Categories from '../cabinet/OwnerCabinet/Categories';
import ShopButton from '../cabinet/OwnerCabinet/ShopButton';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';
import styles from './SelectShopModal.module.scss';

type Props = {
  onClose: () => void;
};

const SelectShopModal = ({ onClose }: Props) => {
  const [shops, setShops] = useState<IShop[]>([]);
  const { data, error, isSuccess, isLoading } = useGetShopsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    isSuccess && setShops(data);
  }, [isSuccess, data]);

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Доступные для работы точки">
        <ul className={styles.list}>
          {shops.map((shop) => (
            <li key={shop.id} onClick={() => onClose()}>
              <ShopButton shop={shop} />
            </li>
          ))}
        </ul>
        <button type="button" className="button" onClick={onClose}>
          Отмена
        </button>
      </Modal>
    </>
  );
};

export default SelectShopModal;
