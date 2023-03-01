import React, { useState, useEffect, useCallback } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { useAppSelector } from '../../hooks/store';
import { IArrivalInput } from '../../types/item';
import Counter from '../Counter';
import Spinner from '../layout/Spinner';
import Heading from '../ui/Heading';
import Modal from './Modal';
import styles from './IncomeModal.module.scss';
import { useCreateArrivalMutation } from '../../redux/api/arrival';
import { IItem } from '../../models/item';
import { useGetLastPriceQuery } from '../../redux/api/arrival';
import { DEFAULT_ARRIVAL_PRICE } from '../../const';

type Props = {
  onClose: () => void;
  item: IItem;
};

const IncomeModal = ({ onClose, item }: Props) => {
  const [quantity, setQuantity] = useState(3);
  const [price, setPrice] = useState(DEFAULT_ARRIVAL_PRICE);
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data: lastPrice } = useGetLastPriceQuery({
    shopId: activeShop?.id || 0,
    itemId: item.id,
  });

  useEffect(() => {
    if (lastPrice) {
      setPrice(lastPrice);
    }
  }, [lastPrice]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data: IArrivalInput = {
      price,
      itemId: item.id,
      shopId: activeShop!.id,
    };
    if (item.isCountable) {
      data.quantity = quantity;
    }
    createArrival(data);
  };

  const [createArrival, { isLoading, error, isSuccess }] =
    useCreateArrivalMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const priceChangeHandler = useCallback((n: number) => setPrice(n), []);

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Приход">
        <form onSubmit={submitHandler} className={'form pt-8 ' + styles.form}>
          <Heading level={5} className="mb-5">
            {item.title} в {activeShop?.title}
          </Heading>
          <div className="form__group mb-5">
            {item.isCountable ? (
              <Counter
                label="Количество"
                initialValue={3}
                step={1}
                onChange={(n) => setQuantity(n)}
                className="mr-5"
              />
            ) : null}
            <Counter
              label="Цена"
              initialValue={price}
              step={10}
              onChange={priceChangeHandler}
            />
          </div>

          <div className="form__actions">
            <button type="submit" className="button button--success">
              Добавить
            </button>
            <button type="button" className="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default IncomeModal;
