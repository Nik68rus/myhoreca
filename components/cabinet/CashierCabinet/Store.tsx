import React, { useEffect, useState } from 'react';
import styles from './Store.module.scss';
import cx from 'classnames';
import Card from '../../ui/Card';
import { useGetArrivalsQuery } from '../../../redux/api/arrival';
import { useAppSelector } from '../../../hooks/store';
import Spinner from '../../layout/Spinner';
import StockItem from '../OwnerCabinet/StockItem';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { IArrivalWithItem } from '../../../types/item';
import StoreItem from './StoreItem';

const Store = () => {
  const { activeShop } = useAppSelector((store) => store.shop);
  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredItems, setFilteredItems] = useState<IArrivalWithItem[]>([]);

  const {
    data: items,
    error,
    isLoading,
  } = useGetArrivalsQuery(activeShop ? activeShop.id : 0, {
    skip: !activeShop,
  });

  const { data: categories, error: catError } = useGetCategoriesQuery();

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(catError);
  }, [error, catError]);

  useEffect(() => {
    if (categories?.length) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (items) {
      setFilteredItems(
        items.filter((item) => item.item.categoryId === activeCategory)
      );
    }
  }, [activeCategory, items]);

  return (
    <section className={cx('container', styles.store)}>
      {isLoading ? (
        <Spinner block={true} />
      ) : (
        <Card>
          <div className="tabs">
            {categories &&
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cx('tabs__control', {
                    ['tabs__control--active']: cat.id === activeCategory,
                  })}
                >
                  {cat.title}
                </button>
              ))}
          </div>
          <ul className={styles.list}>
            {filteredItems &&
              filteredItems.map((item) => (
                <li key={item.id}>
                  <StoreItem item={item} />
                </li>
              ))}
          </ul>
        </Card>
      )}
    </section>
  );
};

export default Store;