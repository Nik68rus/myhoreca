import React, { useState } from 'react';
import { IArrivalWithItem } from '../../../types/item';
import styles from './StoreItem.module.scss';
import cx from 'classnames';
import { getColor } from '../../../helpers/color';
import { isValidUrl } from '../../../helpers/validation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { addItem, selectItemCount } from '../../../redux/slices/recieptSlice';
import { recieptItemDto } from '../../../helpers/dto';

interface Props {
  item: IArrivalWithItem;
}

const StoreItem = ({ item }: Props) => {
  const position = item.item;
  const dispatch = useAppDispatch();

  const bookedAmount = useAppSelector(selectItemCount(position.id));

  const clickHandler = () => {
    dispatch(addItem(recieptItemDto(item)));
  };

  return (
    <button
      className={styles.storeItem}
      onClick={clickHandler}
      disabled={bookedAmount === item.quantity}
    >
      <div
        className={styles.image}
        style={{
          backgroundColor: `${getColor(
            position.id,
            position.id > 16 ? position.id : 16
          )}`,
        }}
      >
        {isValidUrl(position.imageUrl) ? (
          <Image
            unoptimized
            src={position.imageUrl}
            width={50}
            height={50}
            alt={position.title}
          />
        ) : (
          <span>{position.title.slice(0, 3).toUpperCase()}</span>
        )}
      </div>
      <h4 className={cx(styles.title, 'mb-0')}>{position.title}</h4>
    </button>
  );
};

export default StoreItem;
