import React, { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import {
  useDeleteDiscountMutation,
  useEditDiscountMutation,
} from '../../../redux/api/discount';
import { IDiscountWithCategory } from '../../../types/discount';
import Counter from '../../Counter';
import Spinner from '../../layout/Spinner';
import styles from './DiscountItem.module.scss';

interface Props {
  item: IDiscountWithCategory;
}

const DiscountItem = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(item.value);

  const [
    editDiscount,
    { isLoading: editLoading, error: editError, isSuccess },
  ] = useEditDiscountMutation();
  const [deleteDiscount, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteDiscountMutation();

  useEffect(() => {
    handleRTKQError(editError);
    handleRTKQError(deleteError);
  }, [editError, deleteError]);

  const stopEditing = useCallback(() => {
    setEditing(false);
    setNewValue(item.value);
  }, [item.value]);

  useEffect(() => {
    if (isSuccess) {
      stopEditing();
    }
  }, [isSuccess, stopEditing]);

  const deleteHandler = () => {
    deleteDiscount(item.id);
  };

  const editHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editDiscount({ discountId: item.id, value: newValue });
  };

  return (
    <>
      {(editLoading || deleteLoading) && <Spinner />}
      <li className={styles.discount}>
        <span className={styles.title}>
          {item.category.title} - {item.value} %
        </span>
        {editing ? (
          <form className="form" onSubmit={editHandler}>
            <div className="form__group">
              <Counter
                initialValue={newValue}
                step={5}
                onChange={(n) => setNewValue(n)}
              />
              <div className={styles.actions}>
                <button
                  type="submit"
                  className="button button--icon"
                  aria-label="Утвердить изменения"
                >
                  <FaCheck />
                </button>
                <button
                  type="reset"
                  className="button button--icon"
                  onClick={stopEditing}
                  aria-label={'Отменить редактирование'}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className={styles.actions}>
            <button
              className="button button--icon"
              onClick={() => setEditing(true)}
              aria-label="Редактировать скидку"
            >
              <FaEdit />
            </button>

            <button
              className="button button--icon"
              onClick={deleteHandler}
              aria-label={'Удалить скидку'}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default DiscountItem;
