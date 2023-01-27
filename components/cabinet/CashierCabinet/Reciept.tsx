import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Reciept.module.scss';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import LogoFull from '../../LogoFull';
import RecieptLine from './RecieptLine';
import Checkbox from '../../forms/Checkbox';
import { removeAll } from '../../../redux/slices/recieptSlice';
import {
  useCreateSaleMutation,
  useCreateWriteoffMutation,
} from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { IConsumptionInput, IWriteoffLine } from '../../../types/item';
import { CashierSection } from '../../../types/sections';
import WriteoffLine from './WriteoffLine';

const Reciept = () => {
  const [byCard, setByCard] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isToGo, setIsToGo] = useState(false);
  const { activeSection } = useAppSelector((store) => store.layout);
  const isWriteoff = activeSection === CashierSection.WRITEOFF;

  const [makeSale, { data, error, isLoading, isSuccess }] =
    useCreateSaleMutation();
  const [
    makeWriteoff,
    { error: woError, isSuccess: woSuccess, isLoading: woLoading },
  ] = useCreateWriteoffMutation();

  const { items, total } = useAppSelector((store) => store.reciept);
  const dispatch = useAppDispatch();
  const { activeShop } = useAppSelector((store) => store.shop);

  const clearHandler = useCallback(() => {
    dispatch(removeAll());
  }, [dispatch]);

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(woError);
  }, [error, woError]);

  useEffect(() => {
    if (isSuccess) {
      clearHandler();
      setByCard(false);
      setIsDiscount(false);
      setIsToGo(false);
    }
  }, [isSuccess, clearHandler]);

  useEffect(() => {
    if (woSuccess) {
      clearHandler();
    }
  }, [clearHandler, woSuccess]);

  const saleList = items.map((item) => (
    <RecieptLine key={`line-${item.line}`} item={item} />
  ));

  const collapsedItems: IWriteoffLine[] = useMemo(() => {
    const mapedItems: IWriteoffLine[] = [];

    items.forEach((item) => {
      const index = mapedItems.findIndex((mi) => mi.itemId === item.itemId);
      if (index >= 0) {
        mapedItems[index].quantity++;
      } else {
        mapedItems.push({
          itemId: item.itemId,
          title: item.title,
          quantity: 1,
        });
      }
    });

    return mapedItems;
  }, [items]);

  const writeoffList = collapsedItems.map((item) => (
    <WriteoffLine key={item.itemId} item={item} />
  ));

  const saleHandler = () => {
    const data: IConsumptionInput = {
      shopId: activeShop!.id,
      isSale: true,
      byCard,
      isDiscount,
      items: items.map((item) => ({
        itemId: item.itemId,
        price: item.price,
        toGo: item.toGo,
      })),
      total: items.reduce((acc, item) => acc + item.price, 0),
    };

    makeSale(data);
  };

  const writeOffHandler = () => {
    // makeWriteoff();
  };

  return (
    <>
      {(isLoading || woLoading) && <Spinner />}
      <section className={styles.reciept}>
        <div className={cx('container', styles.container)}>
          {/* <LogoFull className="mb-6" /> */}
          <div className={cx(styles.date, 'mb-5')}>
            <span>{new Date().toLocaleDateString('ru-Ru', {})}</span>
            <span>
              {new Date().toLocaleTimeString('ru-Ru', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <ul className={styles.list}>
            {isWriteoff ? writeoffList : saleList}
          </ul>
        </div>
        {!isWriteoff && (
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
            onClick={isWriteoff ? writeOffHandler : saleHandler}
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
