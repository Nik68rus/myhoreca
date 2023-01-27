import React, { useState } from 'react';
import {
  changeToGo,
  IRecieptPosition,
  removeItem,
  removeLine,
} from '../../../redux/slices/recieptSlice';
import styles from './RecieptLine.module.scss';
import cx from 'classnames';
import { FaMinus, FaTimes } from 'react-icons/fa';
import { BiCoffee, BiCoffeeTogo } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { CashierSection } from '../../../types/sections';

interface Props {
  item: IRecieptPosition;
}

const RecieptLine = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { activeSection } = useAppSelector((store) => store.layout);

  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const minusHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(removeItem(item));
    // setEditing(false);
  };

  const deleteHandler = () => {
    dispatch(removeLine(item.itemId));
    setEditing(false);
  };

  const togoHandler = () => {
    dispatch(changeToGo(item.itemId));
    setEditing(false);
  };

  const getQuantityMarkup = () => {
    if (isWriteoff) {
      return <span className={styles.quantity}>{item.quantity}</span>;
    } else if (item.quantity > 1) {
      return <span className={styles.quantity}>x{item.quantity} =</span>;
    } else {
      return null;
    }
  };

  return (
    <li className={styles.line} onClick={() => setEditing(!editing)}>
      <span className={styles.title}>
        {item.title}
        {item.toGo ? '(с)' : ''}
      </span>

      {getQuantityMarkup()}
      {!isWriteoff && (
        <span className={styles.price}>{item.price * item.quantity}</span>
      )}
      {editing ? (
        <div className={styles.actions}>
          <button
            className="button button--icon"
            aria-label="Уменьшить количество"
            onClick={minusHandler}
          >
            <FaMinus />
          </button>
          <button
            className="button button--icon"
            aria-label="Удалить из чека"
            onClick={deleteHandler}
          >
            <FaTimes />
          </button>
          {!isWriteoff && (
            <button
              className="button button--icon"
              aria-label={item.toGo ? 'Здесь' : 'С собой'}
              onClick={togoHandler}
            >
              {item.toGo ? <BiCoffee /> : <BiCoffeeTogo />}
            </button>
          )}
        </div>
      ) : null}
    </li>
  );
};

export default RecieptLine;
