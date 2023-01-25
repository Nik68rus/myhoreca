import React, { useState } from 'react';
import {
  changeToGo,
  IRecieptPosition,
  removeItem,
} from '../../../redux/slices/recieptSlice';
import styles from './RecieptLine.module.scss';
import cx from 'classnames';
import { FaTimes } from 'react-icons/fa';
import { BiCoffee, BiCoffeeTogo } from 'react-icons/bi';
import { useAppDispatch } from '../../../hooks/store';

interface Props {
  item: IRecieptPosition;
}

const RecieptLine = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    dispatch(removeItem(item));
    setEditing(false);
  };

  const togoHandler = () => {
    dispatch(changeToGo(item));
    setEditing(false);
  };

  return (
    <li className={styles.line} onClick={() => setEditing(!editing)}>
      <span className={styles.title}>
        {item.title}
        {item.toGo ? ' (с)' : ''}
      </span>
      <span className={styles.price}>{item.price}</span>
      {editing ? (
        <div className={styles.actions}>
          <button
            className="button button--icon"
            aria-label={item.toGo ? 'Здесь' : 'С собой'}
            onClick={togoHandler}
          >
            {item.toGo ? <BiCoffee /> : <BiCoffeeTogo />}
          </button>
          <button
            className="button button--icon"
            aria-label="Удалить из чека"
            onClick={removeHandler}
          >
            <FaTimes />
          </button>
        </div>
      ) : null}
    </li>
  );
};

export default RecieptLine;
