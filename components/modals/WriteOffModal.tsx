import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { useAppSelector } from '../../hooks/store';
import { IArrivalInput, IArrivalWithItem } from '../../types/item';
import Counter from '../Counter';
import Spinner from '../layout/Spinner';
import Heading from '../ui/Heading';
import Modal from './Modal';
import styles from './IncomeModal.module.scss';
import { useCreateArrivalMutation } from '../../redux/api/arrival';
import { IItem } from '../../models/item';
import FormControl from '../forms/FormControl';
import { useCreateWriteoffMutation } from '../../redux/api/consumption';

type Props = {
  onClose: () => void;
  item: IArrivalWithItem;
};

const WriteOffModal = ({ onClose, item }: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [comment, setComment] = useState('');

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = {
      shopId: item.shopId,
      itemId: item.item.id,
      quantity,
      comment: comment.trim().length ? comment.trim() : undefined,
    };

    writeOffItem(data);
  };

  const { activeShop } = useAppSelector((store) => store.shop);

  const [writeOffItem, { error, isLoading, isSuccess }] =
    useCreateWriteoffMutation();

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
      <Modal onClose={onClose} heading="Списание">
        <form onSubmit={submitHandler} className={'form ' + styles.form}>
          <Heading level={5} className="mb-5">
            {item.item.title} из {activeShop?.title}
          </Heading>
          {item.item.isCountable ? (
            <Counter
              label="Количество"
              initialValue={quantity}
              step={1}
              onChange={(n) => setQuantity(n)}
              className="mb-6"
            />
          ) : (
            <p>Товар учитывается не по количеству!</p>
          )}
          <FormControl
            type="text"
            label="Комментарий"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Укажите причину по желанию"
          />

          <div className="form__actions">
            <button type="button" className="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="button button--success">
              Списать
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default WriteOffModal;