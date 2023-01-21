import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { useAppSelector } from '../../hooks/store';
import { IArrivalInput, IItemWithCategory } from '../../types/item';
import Counter from '../Counter';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Heading from '../ui/Heading';
import Modal from './Modal';
import styles from './IncomeModal.module.scss';
import { useCreateArrivalMutation } from '../../redux/api/arrival';

type Props = {
  onClose: () => void;
  item: IItemWithCategory;
};

const IncomeModal = ({ onClose, item }: Props) => {
  const [quantity, setQuantity] = useState(3);
  const [price, setPrice] = useState(150);

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

  const { activeShop } = useAppSelector((store) => store.owner);

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

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Приход">
        <form onSubmit={submitHandler} className={'form ' + styles.form}>
          <Heading level={5} className="mb-5">
            {item.title} в {activeShop?.title}
          </Heading>
          <div className="form__group">
            {item.isCountable ? (
              <Counter
                label="Количество"
                initialValue={3}
                step={1}
                onChange={(n) => setQuantity(n)}
              />
            ) : null}
            <Counter
              label="Цена"
              initialValue={150}
              step={10}
              onChange={(n) => setPrice(n)}
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