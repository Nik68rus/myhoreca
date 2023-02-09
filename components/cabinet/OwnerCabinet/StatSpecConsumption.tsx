import React, { useCallback, useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetSpecConsumptionQuery } from '../../../redux/api/consumption';
import DatePicker from '../../DatePicker';
import Spinner from '../../layout/Spinner';
import Heading from '../../ui/Heading';
import styles from './StatSpecConsumption.module.scss';

interface Props {
  type: 'discount' | 'writeoff';
}

const StatSpecConsumption = ({ type }: Props) => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isFetching } = useGetSpecConsumptionQuery(
    {
      from: from.toISOString(),
      to: to.toISOString(),
      shopId: activeShop?.id || 0,
      type,
    },
    { skip: !activeShop }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {}, [data]);

  const dateChangeHandler = useCallback(
    (period: { start: Date; end: Date }) => {
      setFrom(period.start);
      setTo(period.end);
    },
    []
  );

  return (
    <div>
      {isFetching && <Spinner />}
      <DatePicker onChange={dateChangeHandler} />
      <Heading level={4} className="mb-4">
        {type === 'discount' ? 'Скидки' : 'Списания:'}
      </Heading>
      {data && data.length ? (
        <ul className="list">
          {data.map((cons) => (
            <li
              key={cons.id}
              className={
                type === 'writeoff' ? styles.writeoffLine : styles.discountLine
              }
            >
              <span>
                {new Date(cons.createdAt).toLocaleDateString('ru-Ru', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
              <span>{cons.item.title}</span>
              <span>*{cons.quantity}</span>
              <span>{cons.consumption.user.name}</span>
              {type === 'discount' && <span>{cons.price}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default StatSpecConsumption;
