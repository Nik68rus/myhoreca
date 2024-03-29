import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Reciept.module.scss';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import RecieptLine from './RecieptLine';
import Checkbox from '../../forms/Checkbox';
import {
  calculateTotal,
  IRecieptPosition,
  removeAll,
  setAllToGo,
  setDiscount,
  setLastReciept,
  setSyrup,
} from '../../../redux/slices/recieptSlice';
import {
  useCreateConsumptionMutation,
  useGetLastQuery,
} from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { IConsumptionInput, PayType } from '../../../types/item';
import FormControl from '../../forms/FormControl';
import { lastRecieptDto, recieptItemDto } from '../../../helpers/dto';
import LastReciept from './LastReciept';
import { useGetSyrupQuery } from '../../../redux/api/arrival';
import { useRouter } from 'next/router';
import { AccountRoutes } from '../../../types/routes';
import DiscountPayModal from '../../modals/DiscountPayModal';
import ChangeCalculationModal from '../../modals/ChangeCalculationModal';

const Reciept = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [byCard, setByCard] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [comment, setComment] = useState('');
  const [discountPayTypeModal, setDiscountPayTypeModal] = useState(false);
  const [changeCalculationModal, setChangeCalculationModal] = useState(false);
  const [isDebt, setIsDebt] = useState(false);
  const { discount, isToGo } = useAppSelector((store) => store.reciept);
  const isWriteoff = slug && slug[0] === AccountRoutes.WRITEOFF;

  const [makeConsumption, { error, isLoading, isSuccess }] =
    useCreateConsumptionMutation();

  const { items, total } = useAppSelector((store) => store.reciept);
  const dispatch = useAppDispatch();
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data: lastReciept } = useGetLastQuery(activeShop?.id || 0, {
    skip: activeShop === null,
    refetchOnFocus: true,
  });

  const { data: shopSyrup } = useGetSyrupQuery(activeShop?.id || 0, {
    skip: !activeShop,
  });

  useEffect(() => {
    if (lastReciept !== undefined) {
      dispatch(setLastReciept(lastRecieptDto(lastReciept)));
    }
  }, [lastReciept, dispatch]);

  useEffect(() => {
    if (shopSyrup) {
      dispatch(setSyrup(recieptItemDto(shopSyrup)));
    }
  }, [shopSyrup, dispatch]);

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
    } else if (isDebt) {
      return PayType.DEBT;
    } else if (byCard) {
      return PayType.CARD;
    } else if (isTransfer) {
      return PayType.TRANSFER;
    } else {
      return PayType.CASH;
    }
  };

  const payChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (e.target.id === 'byCard') {
        setByCard(e.target.checked);
        setIsTransfer(false);
        setIsDebt(false);
      }
      if (e.target.id === 'isTransfer') {
        setIsTransfer(e.target.checked);
        setByCard(false);
        setIsDebt(false);
      }
    }, []);

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

  useEffect(() => {
    if (isDebt) {
      setByCard(false);
      setIsTransfer(false);
    }
  }, [isDebt]);

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
        withSyrup: item.withSyrup,
      })),
      total: isWriteoff
        ? 0
        : items.reduce((acc, item) => acc + getPrice(item) * item.quantity, 0),
    };

    if (comment.trim().length > 0) {
      data.comment = comment.trim();
    }

    makeConsumption(data);
    setIsDebt(false);
  };

  const discountHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        dispatch(setDiscount(e.target.checked));
        dispatch(calculateTotal());
        if (e.target.checked) {
          setDiscountPayTypeModal(true);
        } else {
          setIsDebt(false);
        }
      },
      [dispatch]
    );

  const toGoHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch(setAllToGo(e.target.checked));
    },
    [dispatch]
  );

  const payDetailsHandler = () => {
    setDiscountPayTypeModal(true);
  };

  const calculateChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setChangeCalculationModal(e.target.checked);
    }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <section className={styles.reciept}>
        {!items.length ? (
          <LastReciept />
        ) : (
          <>
            <div className={cx('container', styles.container)}>
              <div className={cx(styles.date, 'mb-3')}>
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
                  <RecieptLine key={item.line} item={item} />
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
                {discount && (
                  <p className={styles.discountPayType}>
                    Выбрана оплата {isDebt ? 'в счет з/п' : 'сейчас'}
                  </p>
                )}
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
                    onChange={toGoHandler}
                  />
                  <Checkbox
                    label="Сдача"
                    id="change"
                    className={styles.checkbox}
                    checked={changeCalculationModal}
                    onChange={calculateChangeHandler}
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
          </>
        )}
      </section>
      {discountPayTypeModal && (
        <DiscountPayModal
          onClose={() => setDiscountPayTypeModal(false)}
          choiceHandler={(payInDebt) => setIsDebt(payInDebt)}
        />
      )}
      {changeCalculationModal && (
        <ChangeCalculationModal
          onClose={() => setChangeCalculationModal(false)}
          amount={total}
        />
      )}
    </>
  );
};

export default Reciept;
