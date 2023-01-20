import React, { useState, useEffect } from 'react';
import { useGetItemsQuery } from '../../../redux/api/item';
import Spinner from '../../layout/Spinner';
import AddItemModal from '../../modals/AddItemModal';
import CategoryModal from '../../modals/CategoryModal';
import Card from '../../ui/Card';
import styles from './Items.module.scss';

const Items = () => {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);

  const { data: items, isLoading } = useGetItemsQuery();

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          {items && items.length ? (
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
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
            <AddItemModal onClose={() => setItemModalVisible(false)} />
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
