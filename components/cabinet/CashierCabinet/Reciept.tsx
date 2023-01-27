import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Reciept.module.scss';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import LogoFull from '../../LogoFull';
import RecieptLine from './RecieptLine';
import Checkbox from '../../forms/Checkbox';
import { removeAll } from '../../../redux/slices/recieptSlice';
import { useCreateConsumptionMutation } from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { IConsumptionInput } from '../../../types/item';
import { CashierSection } from '../../../types/sections';
import FormControl from '../../forms/FormControl';
import DayMoney from '../../DayMoney';

const Reciept = () => {
  const [byCard, setByCard] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isToGo, setIsToGo] = useState(false);
  const [comment, setComment] = useState('');
  const { activeSection } = useAppSelector((store) => store.layout);
  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const [makeConsumption, { data, error, isLoading, isSuccess }] =
    useCreateConsumptionMutation();

  const { items, total } = useAppSelector((store) => store.reciept);
  const dispatch = useAppDispatch();
  const { activeShop } = useAppSelector((store) => store.shop);

  const clearHandler = useCallback(() => {
    dispatch(removeAll());
    setByCard(false);
    setIsDiscount(false);
    setIsToGo(false);
    setComment('');
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
      byCard: isWriteoff ? false : byCard,
      isDiscount: isWriteoff ? false : isDiscount,
      items: items.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        price: isWriteoff ? 0 : item.price,
        toGo: isWriteoff ? false : item.toGo,
      })),
      total: isWriteoff
        ? 0
        : items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    if (comment.trim().length > 0) {
      data.comment = comment.trim();
    }

    makeConsumption(data);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className={styles.reciept}>
        <div className={cx('container', styles.container)}>
          {/* <LogoFull className="mb-6" /> */}
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
                onChange={(e) => setByCard(e.target.checked)}
                className={styles.checkbox}
              />
              <Checkbox
                label="Скидка"
                id="isDiscount"
                checked={isDiscount}
                onChange={(e) => setIsDiscount(e.target.checked)}
                className={styles.checkbox}
              />
              <Checkbox
                label="С собой"
                id="toGo"
                className={styles.checkbox}
                checked={isToGo}
                onChange={(e) => setIsToGo(e.target.checked)}
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
