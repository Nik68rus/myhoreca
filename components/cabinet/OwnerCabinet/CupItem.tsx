import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import {
  useDeleteCupMutation,
  useEditCupMutation,
} from '../../../redux/api/cup';
import FormControl from '../../forms/FormControl';
import Spinner from '../../layout/Spinner';
import styles from './CupItem.module.scss';

interface Props {
  id: number;
  title: string;
}

const CupItem = ({ id, title }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [deleteCup, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteCupMutation();
  const [editCup, { isLoading: editLoading, error: editError, isSuccess }] =
    useEditCupMutation();

  useEffect(() => {
    handleRTKQError(deleteError);
    handleRTKQError(editError);
  }, [deleteError, editError]);

  const deleteHandler = () => {
    deleteCup(id);
  };

  const editHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editCup({ cupId: id, title: newTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      setEditing(false);
      setNewTitle(title);
    }
  }, [isSuccess, title]);

  return (
    <>
      {(deleteLoading || editLoading) && <Spinner />}
      <li className={styles.cup}>
        {editing ? (
          <form className="form" onSubmit={editHandler}>
            <div className="form__group">
              <FormControl
                type="text"
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className={styles.editActions}>
                <button
                  type="submit"
                  className="button button--icon"
                  aria-label="Редактировать"
                >
                  <FaCheck />
                </button>
                <button
                  type="reset"
                  className="button button--icon"
                  aria-label="Отмена"
                  onClick={() => {
                    setEditing(false);
                    setNewTitle(title);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <span>{title}</span>
            <div className={styles.actions}>
              <button
                className="button button--icon"
                aria-label="Редактировать"
                onClick={() => setEditing(true)}
              >
                <FaEdit />
              </button>
              <button
                className="button button--icon"
                aria-label="Удалить"
                onClick={deleteHandler}
              >
                <FaTimes />
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default CupItem;
