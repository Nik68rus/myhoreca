import React, { useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/store';
import { removeItemFromReciept } from '../../../redux/slices/recieptSlice';
import { IWriteoffLine } from '../../../types/item';
import styles from './WriteoffLine.module.scss';

interface Props {
  item: IWriteoffLine;
}

const WriteoffLine = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();

  const minusHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromReciept(item.itemId));
  };

  return (
    <li className={styles.line} onClick={() => setEditing(!editing)}>
      <span className={styles.title}>{item.title}</span>{' '}
      <span>{item.quantity}</span>
      {editing && (
        <div className={styles.actions}>
          <button className="button button--icon" onClick={minusHandler}>
            <FaMinus />
          </button>
        </div>
      )}
    </li>
  );
};

export default WriteoffLine;
