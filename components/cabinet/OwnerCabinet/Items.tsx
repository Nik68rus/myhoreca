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
import FormControl from '../../forms/FormControl';
import { IItem } from '../../../models/item';
import { FaSearch } from 'react-icons/fa';

const Items = () => {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setfilteredItems] = useState<IItem[]>([]);

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

  useEffect(() => {
    if (items && searchTerm.trim().length > 2) {
      const searchResult = items.filter(
        (item) =>
          item.title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) >= 0
      );
      setfilteredItems(searchResult);
    } else {
      setfilteredItems([]);
    }
  }, [searchTerm, items]);

  const getFilteredList = () => {
    if (searchTerm.trim().length > 2 && filteredItems.length) {
      return (
        <ul className="list">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))}
        </ul>
      );
    } else if (searchTerm.trim().length > 2 && !filteredItems.length) {
      return <p>Ничего не найдено</p>;
    } else {
      return null;
    }
  };

  const getDevidedList = () => {
    if (items && items.length) {
      return (
        <>
          <div className="tabs">
            <button
              onClick={() => setHidden(false)}
              className={cx('tabs__control', {
                ['tabs__control--active']: !hidden,
              })}
            >
              Популярные
            </button>
            <button
              onClick={() => setHidden(true)}
              className={cx('tabs__control', {
                ['tabs__control--active']: hidden,
              })}
            >
              Скрытые
            </button>
          </div>

          <ul className="list">
            {items
              .slice()
              .filter((item) => item.isVisible === !hidden)
              .map((item) => (
                <li key={item.id}>
                  <Item item={item} />
                </li>
              ))}
          </ul>
        </>
      );
    } else {
      return <p className={styles.empty}>Товаров пока нет</p>;
    }
  };

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <>
          <Card className={cx('mb-3', styles.search)}>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch />
            </form>
          </Card>
          <Card>
            {searchTerm.trim().length > 2
              ? getFilteredList()
              : getDevidedList()}
            <div className={styles.actions}>
              <button
                className="button"
                onClick={() => setItemModalVisible(true)}
              >
                Добавить товар
              </button>
              <button
                className="button"
                onClick={() => setCatModalVisible(true)}
              >
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
        </>
      )}
    </>
  );
};

export default Items;
