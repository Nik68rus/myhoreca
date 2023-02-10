import React, { useCallback, useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetSpecConsumptionQuery } from '../../../redux/api/consumption';
import { IShopData } from '../../../types/shop';
import Spinner from '../../layout/Spinner';
import Heading from '../../ui/Heading';
import styles from './StatSpecConsumption.module.scss';

interface Props {
  type: 'discount' | 'writeoff';
  shop: IShopData | null;
  from: Date;
  to: Date;
}

const StatSpecConsumption = ({ type, shop, from, to }: Props) => {
  const { data, error, isFetching } = useGetSpecConsumptionQuery(
    {
      from: from.toISOString(),
      to: to.toISOString(),
      shopId: shop?.id || 0,
      type,
    },
    { skip: !shop }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {}, [data]);

  return (
    <div>
      {isFetching && <Spinner />}
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
