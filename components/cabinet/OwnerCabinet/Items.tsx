import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { useGetItemsQuery } from '../../../redux/api/item';
import Spinner from '../../layout/Spinner';
import AddItemModal from '../../modals/AddItemModal';
import CategoryModal from '../../modals/CategoryModal';
import Card from '../../ui/Card';
import Item from './Item';
import styles from './Items.module.scss';
import cx from 'classnames';

const Items = () => {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { data: items, isLoading, error } = useGetItemsQuery();
  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategoriesQuery();

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(catError);
  }, [error, catError]);

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          {items && items.length ? (
            <>
              <div className={styles.tabs}>
                <button
                  onClick={() => setHidden(false)}
                  className={cx(styles.tabControl, {
                    [styles.tabControlActive]: !hidden,
                  })}
                >
                  Популярные
                </button>
                <button
                  onClick={() => setHidden(true)}
                  className={cx(styles.tabControl, {
                    [styles.tabControlActive]: hidden,
                  })}
                >
                  Скрытые
                </button>
              </div>

              <ul className="list">
                {items
                  .slice()
                  .filter((item) => item.isVisible === !hidden)
                  .sort((a, b) => {
                    return a.isCountable ? -1 : 1;
                  })
                  .map((item) => (
                    <li key={item.id}>
                      <Item item={item} />
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <p className={styles.empty}>Товаров пока нет</p>
          )}
          <div className={styles.actions}>
            <button
              className="button"
              onClick={() => setItemModalVisible(true)}
            >
              Добавить товар
            </button>
            <button className="button" onClick={() => setCatModalVisible(true)}>
              Управление категориями
            </button>
          </div>
          {itemModalVisible && (
            <AddItemModal
              onClose={() => setItemModalVisible(false)}
              categories={categories || []}
            />
          )}
          {catModalVisible && (
            <CategoryModal onClose={() => setCatModalVisible(false)} />
          )}
        </Card>
      )}
    </>
  );
};

export default Items;
