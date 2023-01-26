import React, { useEffect, useState } from 'react';
import styles from './Store.module.scss';
import cx from 'classnames';
import Card from '../../ui/Card';
import { useGetArrivalsQuery } from '../../../redux/api/arrival';
import { useAppSelector } from '../../../hooks/store';
import Spinner from '../../layout/Spinner';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { IArrivalWithItem } from '../../../types/item';
import StoreItem from './StoreItem';
import { CashierSection } from '../../../types/sections';
import Heading from '../../ui/Heading';

const Store = () => {
  const { activeShop } = useAppSelector((store) => store.shop);
  const { activeSection } = useAppSelector((store) => store.layout);
  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredItems, setFilteredItems] = useState<IArrivalWithItem[]>([]);

  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const {
    data: arrivals,
    error,
    isLoading,
  } = useGetArrivalsQuery(activeShop ? activeShop.id : 0, {
    skip: !activeShop,
  });

  const {
    data: categories,
    error: catError,
    isLoading: catLoading,
  } = useGetCategoriesQuery();

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
    if (arrivals?.length) {
      setFilteredItems(
        arrivals.filter((arrival) =>
          isWriteoff
            ? arrival.item.isCountable
            : arrival.item.categoryId === activeCategory
        )
      );
    }
  }, [activeCategory, arrivals, isWriteoff]);

  return (
    <>
      {isLoading || catLoading ? (
        <Spinner />
      ) : (
        <section className={cx('container', styles.store)}>
          <Card>
            {isWriteoff ? (
              <Heading level={5} className={styles.heading}>
                Внимание! Вы в режиме списания!
              </Heading>
            ) : (
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
            )}
            <ul className={styles.list}>
              {filteredItems &&
                filteredItems.map((item, i) => (
                  <li key={item.id}>
                    <StoreItem item={item} />
                  </li>
                ))}
            </ul>
          </Card>
        </section>
      )}
    </>
  );
};

export default Store;
