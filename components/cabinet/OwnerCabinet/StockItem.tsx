import React, { useEffect, useState } from 'react';
import {
  FaCheck,
  FaDollarSign,
  FaMinus,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import {
  useDeletePositionMutation,
  useEditPriceMutation,
} from '../../../redux/api/arrival';
import { IArrivalWithItem } from '../../../types/item';
import Counter from '../../Counter';
import Spinner from '../../layout/Spinner';
import WriteOffModal from '../../modals/WriteOffModal';
import Position from '../../Position';
import styles from './StockItem.module.scss';

interface Props {
  item: IArrivalWithItem;
}
const StockItem = ({ item }: Props) => {
  const [editPrice, { error, isSuccess, isLoading }] = useEditPriceMutation();
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price);
  const [writeOff, setWriteOff] = useState(false);

  const [deletePosition, { error: deleteError, isLoading: deleting }] =
    useDeletePositionMutation();

  const editStartHandler = () => {
    setEditing(true);
  };

  const editFinishHandler = () => {
    editPrice({ id: item.id, price: newPrice });
  };

  const deleteHandler = () => {
    deletePosition(item.id);
  };

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(deleteError);
  }, [error, deleteError]);

  useEffect(() => {
    if (isSuccess) setEditing(false);
  }, [isSuccess]);

  return (
    <li className={styles.item}>
      {(isLoading || deleting) && <Spinner />}
      <Position item={item.item} />
      <span>
        {item.quantity ? (
          item.quantity
        ) : (
          <button
            className="button button--icon"
            aria-label="Убрать из меню"
            onClick={deleteHandler}
          >
            <FaTrash />
          </button>
        )}
      </span>
      <span>
        {editing ? (
          <Counter
            initialValue={item.price}
            step={10}
            onChange={(n) => setNewPrice(n)}
          />
        ) : (
          item.price
        )}
      </span>
      <div className={styles.actions}>
        {editing ? (
          <>
            <button className="button button--icon" onClick={editFinishHandler}>
              <FaCheck />
            </button>
            <button
              className="button button--icon"
              onClick={() => setEditing(false)}
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button className="button button--icon" onClick={editStartHandler}>
              <FaDollarSign />
            </button>
            {item.item.isCountable && (
              <button
                className="button button--icon"
                onClick={() => setWriteOff(true)}
              >
                <FaMinus />
              </button>
            )}
          </>
        )}
      </div>
      {item.item.isCountable && (
        <span className={styles.time}>
          {new Date(item.createdAt).toLocaleDateString('ru-Ru', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )}
      {writeOff && (
        <WriteOffModal item={item} onClose={() => setWriteOff(false)} />
      )}
    </li>
  );
};

export default StockItem;
