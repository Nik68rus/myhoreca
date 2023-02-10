import React, { useCallback, useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetStatQuery } from '../../../redux/api/consumption';
import { IShopData } from '../../../types/shop';
import Spinner from '../../layout/Spinner';
import Heading from '../../ui/Heading';

interface Props {
  shop: IShopData | null;
  from: Date;
  to: Date;
}

const StatMoney = ({ shop, from, to }: Props) => {
  const { data, error, isLoading } = useGetStatQuery(
    {
      shopId: shop?.id || 0,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
    },
    {
      skip: !shop,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <div>
      {isLoading && <Spinner />}
      {data && (
        <div>
          <Heading level={4} className="mb-3">
            Всего: {data.total.toLocaleString('ru-Ru')} руб
          </Heading>
          <p>Картой: {data.card}</p>
          <p>Переводом: {data.transfer}</p>
          <p>Наличными: {data.total - data.card - data.transfer - data.debt}</p>
          <p>В счет з/п: {data.debt}</p>
        </div>
      )}
    </div>
  );
};

export default StatMoney;
