import React, { useState, useEffect } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { ICategory } from '../../../models/category';
import FormControl from '../../forms/FormControl';
import styles from './CatItem.module.scss';
import cx from 'classnames';
import { useEditCategoryMutation } from '../../../redux/api/category';
import { handleError, handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';

interface Props {
  category: ICategory;
}

const CatItem = ({ category }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState('');

  const [editCategory, { data, error, isLoading }] = useEditCategoryMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  const editStartHandler = () => {
    setNewValue(category.title);
    setEditing(true);
  };

  const editFinishHandler = () => {
    editCategory({ id: category.id, title: newValue });
    setEditing(false);
  };

  return (
    <li
      key={category.id}
      className={cx(styles.item, { [styles.itemEditing]: editing })}
    >
      {isLoading && <Spinner />}
      {!editing ? (
        <>
          {category.title}
          <button
            className="button button--icon"
            aria-label="Редактировать"
            onClick={editStartHandler}
          >
            <FaEdit />
          </button>
        </>
      ) : (
        <>
          <FormControl
            type="text"
            id="title"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <div className={styles.actions}>
            <button
              className="button button--icon"
              aria-label="Подтвердить"
              onClick={editFinishHandler}
            >
              <FaCheck />
            </button>
            <button
              className="button button--icon"
              aria-label="Отмена"
              onClick={() => setEditing(false)}
            >
              <FaTimes />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default CatItem;
