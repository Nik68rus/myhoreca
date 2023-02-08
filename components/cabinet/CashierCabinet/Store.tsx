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
import Heading from '../../ui/Heading';
import { useGetGroupsQuery } from '../../../redux/api/group';
import sortItems, { IGroupReady } from '../../../helpers/groupSorting';
import StoreGroup from './StoreGroup';
import { useRouter } from 'next/router';
import { AccountRoutes } from '../../../types/routes';

function isGroup(item: IGroupReady | IArrivalWithItem): item is IGroupReady {
  return (item as IGroupReady).isGroup !== undefined;
}

const Store = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { activeShop } = useAppSelector((store) => store.shop);
  const [activeCategory, setActiveCategory] = useState(0);
  const [grouppedItems, setGrouppedItems] = useState<
    (IArrivalWithItem | IGroupReady)[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<
    (IArrivalWithItem | IGroupReady)[]
  >([]);

  const isWriteoff = slug && slug[0] === AccountRoutes.WRITEOFF;

  const {
    data: arrivals,
    error,
    isLoading,
  } = useGetArrivalsQuery(activeShop ? activeShop.id : 0, {
    skip: !activeShop,
    refetchOnFocus: true,
  });

  const {
    data: categories,
    error: catError,
    isLoading: catLoading,
  } = useGetCategoriesQuery();

  const { data: groups, error: groupsError } = useGetGroupsQuery();

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(catError);
    handleRTKQError(groupsError);
  }, [error, catError, groupsError]);

  useEffect(() => {
    if (categories?.length) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (groups && arrivals) {
      setGrouppedItems(sortItems(groups, arrivals));
    }
  }, [groups, arrivals]);

  useEffect(() => {
    if (grouppedItems.length && !isWriteoff) {
      setFilteredItems(
        grouppedItems.filter((gi) =>
          isGroup(gi)
            ? gi.categoryId === activeCategory
            : gi.item.categoryId === activeCategory
        )
      );
    }

    if (isWriteoff && arrivals) {
      setFilteredItems(arrivals.filter((ar) => ar.item.isCountable));
    }
  }, [activeCategory, grouppedItems, isWriteoff, arrivals]);

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
              <div className={cx('tabs', styles.tabs)}>
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
                filteredItems.map((item) =>
                  isGroup(item) ? (
                    <StoreGroup
                      id={item.id}
                      key={item.title}
                      title={item.title}
                      items={item.items}
                    />
                  ) : (
                    <li key={item.id}>
                      <StoreItem item={item} />
                    </li>
                  )
                )}
            </ul>
          </Card>
        </section>
      )}
    </>
  );
};

export default Store;
