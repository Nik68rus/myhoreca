import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { IGroupReady, IMenuGroupItem } from '../../helpers/groupSorting';
import { IMenuItem } from '../../services/ShopService';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import styles from './MenuSection.module.scss';

interface Props {
  id: number;
  title: string;
  items: (IMenuItem | IGroupReady<IMenuGroupItem>)[];
  onActive: (id: number) => void;
}

function isGroup(
  item: IGroupReady<IMenuGroupItem> | IMenuItem
): item is IGroupReady<IMenuGroupItem> {
  return (item as IGroupReady<IMenuGroupItem>).isGroup !== undefined;
}

const MenuSection = ({ id, title, items, onActive }: Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const scrollHandler = () => {
      if (
        headingRef.current!.getBoundingClientRect().top > 0 &&
        headingRef.current!.getBoundingClientRect().top < 60
      ) {
        onActive(id);
      }
    };
    const main = document.querySelector('main')!;
    main.addEventListener('scroll', scrollHandler);
    return () => {
      main.removeEventListener('scroll', scrollHandler);
    };
  }, [id, onActive]);

  return (
    <div>
      <h3 className="heading mb-2" ref={headingRef}>
        {title}
      </h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            {isGroup(item) ? (
              <MenuGroup group={item} category={title} />
            ) : (
              <MenuItem item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;
