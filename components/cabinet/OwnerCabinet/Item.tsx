import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { IItem } from '../../../models/item';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { useEditItemMutation } from '../../../redux/api/item';
import Spinner from '../../layout/Spinner';
import AddItemModal from '../../modals/AddItemModal';
// import { IItemWithCategory } from '../../../types/item';
import IncomeModal from '../../modals/IncomeModal';
import Position from '../../Position';
import styles from './Item.module.scss';

interface Props {
  item: IItem;
}

const Item = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);

  const editStartHandler = () => {
    setNewValue(item.title);
    setEditing(true);
  };

  const { data: categories } = useGetCategoriesQuery();
  const [editItem, { isLoading, error }] = useEditItemMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  const visibilityToggleHandler = () => {
    console.log(item);

    editItem({ id: item.id, isVisible: !item.isVisible, cupId: item.cupId });
  };

  return (
    <div className={styles.item}>
      <Position item={item} />
      <div className={styles.actions}>
        <button
          className="button button--icon"
          aria-label="Редактировать"
          onClick={() => setEditing(true)}
        >
          <FaEdit />
        </button>

        {isLoading ? (
          <Spinner inline={true} />
        ) : (
          <button
            className="button button--icon"
            aria-label={item.isVisible ? 'Скрыть' : 'Вернуть'}
            onClick={visibilityToggleHandler}
          >
            {item.isVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        <button
          className="button button--icon"
          aria-label="Приход"
          onClick={() => setIncomeModalVisible(true)}
        >
          <FaPlus />
        </button>
      </div>
      {incomeModalVisible && (
        <IncomeModal item={item} onClose={() => setIncomeModalVisible(false)} />
      )}
      {editing && (
        <AddItemModal
          onClose={() => setEditing(false)}
          categories={categories || []}
          item={item}
        />
      )}
    </div>
  );
};

export default Item;
