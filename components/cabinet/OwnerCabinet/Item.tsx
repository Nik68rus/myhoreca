import Image from 'next/image';
import React, { useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { IItemWithCategory } from '../../../types/item';
import IncomeModal from '../../modals/IncomeModal';
import Position from '../../Position';
import Heading from '../../ui/Heading';
import styles from './Item.module.scss';

interface Props {
  item: IItemWithCategory;
}

const Item = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);

  const editStartHandler = () => {
    setNewValue(item.title);
    setEditing(true);
  };

  return (
    <div className={styles.item}>
      <Position item={item} />
      <div className={styles.actions}>
        <button
          className="button button--icon"
          aria-label="Редактировать"
          // onClick={editStartHandler}
        >
          <FaEdit />
        </button>

        <button
          className="button button--icon"
          aria-label="Редактировать"
          onClick={() => setIncomeModalVisible(true)}
        >
          <FaPlus />
        </button>
      </div>
      {incomeModalVisible && (
        <IncomeModal item={item} onClose={() => setIncomeModalVisible(false)} />
      )}
    </div>
  );
};

export default Item;
