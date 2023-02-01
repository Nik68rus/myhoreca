import React, { useState, useEffect, useRef } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import FormControl from '../../forms/FormControl';
import styles from './CatItem.module.scss';
import cx from 'classnames';
import { useEditCategoryMutation } from '../../../redux/api/category';
import { handleError, handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';

interface Props {
  title: string;
  id: number;
}

const CatItem = ({ id, title }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [width, setWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  const [editCategory, { error, isLoading }] = useEditCategoryMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    setWidth(textRef.current?.offsetWidth || 0);
  }, [newValue, editing]);

  const editStartHandler = () => {
    setNewValue(title);
    setEditing(true);
  };

  const editFinishHandler = () => {
    editCategory({ id, title: newValue });
    setEditing(false);
  };

  const editForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editFinishHandler();
      }}
    >
      <span className={styles.hidden} ref={textRef}>
        {newValue}
      </span>
      <input
        className={styles.input}
        type="text"
        id="title"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        style={{ width }}
      />
    </form>
  );

  return (
    <li className={cx(styles.item, { [styles.editing]: editing })}>
      <button
        className={styles.button}
        onClick={() => setEditing(false)}
        disabled={!editing}
      >
        <FaTimes />
      </button>

      {editing ? editForm : <span>{title}</span>}

      <button
        className={styles.button}
        onClick={editing ? editFinishHandler : editStartHandler}
      >
        {isLoading ? (
          <Spinner inline={true} />
        ) : editing ? (
          <FaCheck />
        ) : (
          <FaEdit />
        )}
      </button>
    </li>
  );
};

export default CatItem;
