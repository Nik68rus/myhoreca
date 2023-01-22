import Image from 'next/image';
import React from 'react';
import { IItem } from '../models/item';
import { useGetCategoriesQuery } from '../redux/api/category';
import styles from './Position.module.scss';
import Heading from './ui/Heading';
import cx from 'classnames';
import { getColor } from '../helpers/color';
import { isValidUrl } from '../helpers/validation';

interface Props {
  item: IItem;
}

const Position = ({ item }: Props) => {
  const { data } = useGetCategoriesQuery();

  const getCat = (id: number) => {
    let cat = 'Позиция';
    if (data) {
      const category = data.find((c) => c.id === id);
      cat = category ? category.title : 'Позиция';
    }
    return cat;
  };

  return (
    <div className={styles.item}>
      <div
        className={styles.image}
        style={{
          backgroundColor: `${getColor(item.id, item.id > 16 ? item.id : 16)}`,
        }}
      >
        {isValidUrl(item.imageUrl) ? (
          <Image
            unoptimized
            src={item.imageUrl}
            width={50}
            height={50}
            alt={item.title}
          />
        ) : (
          <span>{item.title.slice(0, 3).toUpperCase()}</span>
        )}
      </div>
      <div className={styles.text}>
        <h5 className={cx(styles.title, 'mb-0')}>{item.title}</h5>
        <p className={styles.category}>{getCat(item.categoryId)}</p>
      </div>
    </div>
  );
};

export default Position;
