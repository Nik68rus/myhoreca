import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { IConsumption } from '../../models/consumption';
import { IUser } from '../../models/user';
import { useGetRecieptDetailsQuery } from '../../redux/api/consumption';
import { useGetUserDataQuery } from '../../redux/api/user';
import { IConsumptionWithItem } from '../../types/item';
import Spinner from '../layout/Spinner';
import Heading from '../ui/Heading';
import Modal from './Modal';
import styles from './RecieptModal.module.scss';

type Props = {
  onClose: () => void;
  reciept: IConsumption;
};

const RecieptModal = ({ onClose, reciept }: Props) => {
  const [positions, setPositions] = useState<IConsumptionWithItem[]>([]);
  const [creator, setCreator] = useState<IUser | null>(null);
  const { isSuccess, data, isLoading, error } = useGetRecieptDetailsQuery(
    reciept.id
  );
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    isSuccess: userSuccess,
  } = useGetUserDataQuery(reciept.userId);

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(userError);
  }, [error, userError]);

  useEffect(() => {
    isSuccess && setPositions(data);
    userSuccess && setCreator(userData);
  }, [isSuccess, data, userSuccess, userData]);

  const dateString = new Date(reciept.createdAt).toLocaleDateString('ru-Ru', {
    day: '2-digit',
    month: 'long',
  });

  const timeString = new Date(reciept.createdAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading={`Чек`} className={styles.modal}>
        <Heading level={5} className="mb-5">
          от {dateString} {timeString}
        </Heading>
        {creator && <div className="mb-5">Кассир: {creator.name}</div>}
        <ul className="list">
          {positions.map((position) => (
            <li key={position.id}>
              <span>{position.item.title}</span>
              <span>
                * {position.quantity} = {position.price * position.quantity}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          Итого: {reciept.total.toLocaleString('ru-RU')} руб
        </div>
        <div className={styles.extra}>
          <div>Оплата {reciept.byCard ? 'картой' : 'наличными'}</div>
          {reciept.isDiscount ? <div>Скидка сотрудника</div> : null}
        </div>
      </Modal>
    </>
  );
};

export default RecieptModal;
