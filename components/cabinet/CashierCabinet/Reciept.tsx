import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Reciept.module.scss';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import RecieptLine from './RecieptLine';
import Checkbox from '../../forms/Checkbox';
import {
  IRecieptPosition,
  removeAll,
  setAllToGo,
  setDiscount,
  setLastReciept,
} from '../../../redux/slices/recieptSlice';
import {
  useCreateConsumptionMutation,
  useGetLastQuery,
} from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { IConsumptionInput, PayType } from '../../../types/item';
import { CashierSection } from '../../../types/sections';
import FormControl from '../../forms/FormControl';

const Reciept = () => {
  const [byCard, setByCard] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [comment, setComment] = useState('');
  const { activeSection } = useAppSelector((store) => store.layout);
  const { discount, isToGo } = useAppSelector((store) => store.reciept);
  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const [makeConsumption, { data, error, isLoading, isSuccess }] =
    useCreateConsumptionMutation();

  const { items, total } = useAppSelector((store) => store.reciept);
  const dispatch = useAppDispatch();
  const { activeShop } = useAppSelector((store) => store.shop);

  // const { data: lastReciept, error: lastError } = useGetLastQuery(
  //   activeShop?.id || 0,
  //   { skip: activeShop === null }
  // );

  // useEffect(() => {
  //   if (lastReciept !== undefined) {

  //     // lastReciept ? dispatch(setLastReciept({createdAt: new Date(lastReciept?.createdAt)})) : dispatch(set);
  //   }
  // }, [lastReciept, dispatch]);

  const getPrice = (item: IRecieptPosition) => {
    let price = item.price;
    if (isWriteoff) {
      return 0;
    }
    if (discount) {
      price = Math.ceil(item.price * item.discount);
    }
    return price;
  };

  const getPayType = () => {
    if (isWriteoff) {
      return PayType.WRITEOFF;
    } else if (byCard) {
      return PayType.CARD;
    } else if (isTransfer) {
      return PayType.TRANSFER;
    } else {
      return PayType.CASH;
    }
  };

  const payChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.id === 'byCard') {
      setByCard(e.target.checked);
      setIsTransfer(false);
    }
    if (e.target.id === 'isTransfer') {
      setIsTransfer(e.target.checked);
      setByCard(false);
    }
  };

  const clearHandler = useCallback(() => {
    dispatch(removeAll());
    setByCard(false);
    setIsTransfer(false);
    setComment('');
    dispatch(setDiscount(false));
    dispatch(setAllToGo(false));
  }, [dispatch]);

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      clearHandler();
    }
  }, [isSuccess, clearHandler]);

  const consumptionHandler = () => {
    const data: IConsumptionInput = {
      shopId: activeShop!.id,
      isSale: isWriteoff ? false : true,
      payType: getPayType(),
      isDiscount: isWriteoff ? false : discount,
      items: items.map((item) => ({
        itemId: item.itemId,
        cupId: item.toGo ? item.cupId : null,
        quantity: item.quantity,
        price: getPrice(item),
        toGo: isWriteoff ? false : item.toGo,
      })),
      total: isWriteoff
        ? 0
        : items.reduce((acc, item) => acc + getPrice(item) * item.quantity, 0),
    };

    if (comment.trim().length > 0) {
      data.comment = comment.trim();
    }

    makeConsumption(data);
  };

  const discountHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setDiscount(e.target.checked));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className={styles.reciept}>
        <div className={cx('container', styles.container)}>
          <div className={cx(styles.date, 'mb-5')}>
            <span>{new Date().toLocaleDateString('ru-Ru')}</span>
            <span>
              {new Date().toLocaleTimeString('ru-Ru', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <ul className={styles.list}>
            {items.map((item) => (
              <RecieptLine key={item.itemId} item={item} />
            ))}
          </ul>
        </div>

        {isWriteoff ? (
          <FormControl
            label="Комментарий"
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Причина при желании"
          />
        ) : (
          <>
            <div className={cx(styles.total, 'mt-6')}>
              <span>Итого:</span> <b>{total.toLocaleString('ru-RU')} руб</b>
            </div>
            <div className={styles.modifiers}>
              <Checkbox
                label="Картой"
                id="byCard"
                checked={byCard}
                onChange={payChangeHandler}
                className={styles.checkbox}
              />
              <Checkbox
                label="Перевод"
                id="isTransfer"
                checked={isTransfer}
                onChange={payChangeHandler}
                className={styles.checkbox}
              />
              <Checkbox
                label="Скидка"
                id="isDiscount"
                checked={discount}
                onChange={discountHandler}
                className={styles.checkbox}
              />
              <Checkbox
                label="С собой"
                id="toGo"
                className={styles.checkbox}
                checked={isToGo}
                onChange={(e) => dispatch(setAllToGo(e.target.checked))}
              />
            </div>
          </>
        )}
        <div className={styles.actions}>
          <button
            className={cx(styles.button, styles.buttonOk)}
            disabled={!items.length}
            onClick={consumptionHandler}
          >
            {isWriteoff ? 'Списать' : 'OK'}
          </button>
          <button
            className={cx(styles.button, styles.buttonCancel)}
            onClick={clearHandler}
          >
            Отмена
          </button>
        </div>
      </section>
    </>
  );
};

export default Reciept;
