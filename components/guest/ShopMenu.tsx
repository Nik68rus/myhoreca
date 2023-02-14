import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IGroup } from '../../models/group';
import { IMenuItem } from '../../services/ShopService';
import Card from '../ui/Card';
import cx from 'classnames';
import styles from './ShopMenu.module.scss';
import MenuSection from './MenuSection';
import { groupMenuItems, IGroupReady } from '../../helpers/groupSorting';

interface Props {
  items: IMenuItem[];
  groups: IGroup[];
}

interface ICat {
  id: number;
  title: string;
}

const getCats = (items: IMenuItem[]) => {
  const cats: ICat[] = [];
  items.forEach((item) => {
    const existingCat = cats.find((cat) => cat.id === item.categoryId);
    if (!existingCat) {
      cats.push({ id: item.categoryId, title: item.category });
    }
  });
  return cats.sort((a, b) => a.id - b.id);
};

const ShopMenu = ({ items, groups }: Props) => {
  const cats = getCats(items);
  const [activeCategory, setActiveCategory] = useState(cats[0].id);
  const [activeTab, setActiveTab] = useState(cats[0].id);
  const [menuItems, setMenuItems] = useState(groupMenuItems(groups, items));
  const [tabsSticky, setTabsSticky] = useState(false);
  const activeSectionRef = useRef<HTMLHeadingElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // console.log(items);
  // console.log(groups);
  // console.log(cats);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    setTabsSticky(!inView);
  }, [inView]);

  useEffect(() => {
    const main = document.querySelector('main')!;
    if (activeSectionRef.current && containerRef.current) {
      const y =
        activeSectionRef.current.getBoundingClientRect().top -
        containerRef.current.getBoundingClientRect().top -
        50;
      main.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => {
        setActiveTab(activeCategory);
      }, 600);
    }
  }, [activeCategory, activeSectionRef]);

  return (
    <Card>
      <div ref={containerRef}>
        <div className={styles.tabsWrapper} ref={ref}>
          <div
            className={cx('tabs', styles.tabs, {
              [styles.tabsSticky]: tabsSticky,
            })}
          >
            {cats &&
              cats.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={cx('tabs__control', {
                    ['tabs__control--active']: cat.id === activeTab,
                  })}
                >
                  {cat.title}
                </button>
              ))}
          </div>
        </div>
        {cats.map((cat) => {
          const itemProps =
            activeCategory === cat.id ? { ref: activeSectionRef } : {};
          return (
            <div key={cat.id} className={styles.menuSection} {...itemProps}>
              <MenuSection
                id={cat.id}
                onActive={(id) => {
                  setActiveTab(id);
                }}
                title={cat.title}
                items={menuItems
                  .filter((item) => item.categoryId === cat.id)
                  .sort((a, b) => a.title.localeCompare(b.title))}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ShopMenu;
