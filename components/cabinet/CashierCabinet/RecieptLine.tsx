import React, { useState } from 'react';
import {
  calculateTotal,
  changeItemToGo,
  IRecieptPosition,
  removeItem,
  removeLine,
  toggleSyrup,
} from '../../../redux/slices/recieptSlice';
import styles from './RecieptLine.module.scss';
import cx from 'classnames';
import { FaMinus, FaTimes } from 'react-icons/fa';
import { BiCoffee, BiCoffeeTogo } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { CashierSection } from '../../../types/sections';
import { TbDroplet, TbDropletOff } from 'react-icons/tb';
import { TfiSplitV } from 'react-icons/tfi';

interface Props {
  item: IRecieptPosition;
}

const RecieptLine = ({ item }: Props) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { activeSection } = useAppSelector((store) => store.layout);
  const { discount } = useAppSelector((store) => store.reciept);

  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const minusHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(removeItem(item));
    dispatch(calculateTotal());
  };

  const deleteHandler = () => {
    dispatch(removeLine(item.line));
    dispatch(calculateTotal());
    setEditing(false);
  };

  const togoHandler = () => {
    dispatch(changeItemToGo(item.line));
    setEditing(false);
  };

  const syrupHandler = () => {
    dispatch(toggleSyrup(item.line));
    dispatch(calculateTotal());
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

  const currentPrice = discount
    ? item.price * item.quantity * item.discount
    : item.price * item.quantity;

  return (
    <li className={styles.line} onClick={() => setEditing(!editing)}>
      <span className={styles.title}>
        {item.title}
        {item.toGo && item.cupId ? ' 🥤' : ''}
        {item.withSyrup && item.cupId ? ' 💧' : ''}
      </span>

      {getQuantityMarkup()}
      {!isWriteoff && (
        <span className={styles.price}>{Math.ceil(currentPrice)}</span>
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
          {item.quantity > 1 && (
            <button className="button button--icon">
              <TfiSplitV />
            </button>
          )}
          {!isWriteoff && item.cupId && (
            <>
              <button
                className="button button--icon"
                aria-label={item.toGo ? 'Здесь' : 'С собой'}
                onClick={togoHandler}
              >
                {item.toGo ? <BiCoffee /> : <BiCoffeeTogo />}
              </button>
              <button
                className="button button--icon"
                aria-label={item.withSyrup ? 'Без сиропа>' : 'С сиропом'}
                onClick={syrupHandler}
              >
                {item.withSyrup ? <TbDropletOff /> : <TbDroplet />}
              </button>
            </>
          )}
        </div>
      ) : null}
    </li>
  );
};

export default RecieptLine;
