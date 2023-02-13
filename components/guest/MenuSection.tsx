import React, { useEffect, useRef } from 'react';
import { IMenuItem } from '../../services/ShopService';
import MenuItem from './MenuItem';
import styles from './MenuSection.module.scss';
import { useInView } from 'react-intersection-observer';

interface Props {
  id: number;
  title: string;
  items: IMenuItem[];
  onActive: (id: number) => void;
  // intersectionNode: HTMLDivElement;
}

const MenuSection = ({ id, title, items, onActive }: Props) => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
    rootMargin: '20px',
  });

  useEffect(() => {
    if (
      entry &&
      entry.boundingClientRect.y > 0 &&
      entry.boundingClientRect.y < 150
    ) {
      onActive(id);
    }
    console.log(title);

    console.log(inView);
    console.log(entry);
  }, [inView, entry, title, id, onActive]);

  return (
    <div>
      <h3 className="heading mb-2" ref={ref}>
        {title}
      </h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;
