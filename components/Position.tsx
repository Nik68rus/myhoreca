import Image from 'next/image';
import React from 'react';
import { IItemWithCategory } from '../types/item';
import styles from './Position.module.scss';
import Heading from './ui/Heading';

interface Props {
  item: IItemWithCategory;
}

const Position = ({ item }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Image
          unoptimized
          src={item.imageUrl}
          width={50}
          height={50}
          alt={item.title}
        />
      </div>
      <div className={styles.text}>
        <Heading level={5} className="mb-0">
          {item.title}
        </Heading>
        <p className={styles.category}>{item.category.title}</p>
      </div>
    </div>
  );
};

export default Position;
