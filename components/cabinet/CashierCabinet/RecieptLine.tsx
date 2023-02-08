import React, { useCallback, useMemo, useState } from 'react';
import {
  calculateTotal,
  changeItemToGo,
  IRecieptPosition,
  removeItem,
  removeLine,
  toggleSyrup,
} from '../../../redux/slices/recieptSlice';
import styles from './RecieptLine.module.scss';
import { FaMinus, FaTimes } from 'react-icons/fa';
import { BiCoffee, BiCoffeeTogo } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { TbDroplet, TbDropletOff } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { AccountRoutes } from '../../../types/routes';

interface Props {
  item: IRecieptPosition;
}

const RecieptLine = ({ item }: Props) => {
  const router = useRouter();
  const { slug } = router.query;

  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();
  const discount = useAppSelector((store) => store.reciept.discount);

  const isWriteoff = slug && slug[0] === AccountRoutes.WRITEOFF;

  const minusHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(removeItem(item));
      dispatch(calculateTotal());
    },
    [dispatch, item]
  );

  const deleteHandler = useCallback(() => {
    dispatch(removeLine(item.line));
    dispatch(calculateTotal());
    setEditing(false);
  }, [dispatch, item.line]);

  const togoHandler = useCallback(() => {
    dispatch(changeItemToGo(item.line));
    setEditing(false);
  }, [dispatch, item.line]);

  const syrupHandler = useCallback(() => {
    dispatch(toggleSyrup(item.line));
    dispatch(calculateTotal());
  }, [dispatch, item.line]);

  const itemClickHandler = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const quantityMarkup = useMemo(() => {
    if (isWriteoff) {
      return <span className={styles.quantity}>{item.quantity}</span>;
    } else if (item.quantity > 1) {
      return <span className={styles.quantity}>x{item.quantity} =</span>;
    } else {
      return null;
    }
  }, [isWriteoff, item.quantity]);

  const currentPrice = discount
    ? item.price * item.quantity * item.discount
    : item.price * item.quantity;

  return (
    <li className={styles.line} onClick={itemClickHandler}>
      <span className={styles.title}>
        {item.title}
        {item.toGo && item.cupId ? ' 🥤' : ''}
        {item.withSyrup && item.cupId ? ' 💧' : ''}
      </span>

      {quantityMarkup}
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

export default React.memo(RecieptLine);
