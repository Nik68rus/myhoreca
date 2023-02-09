import React, { useCallback, useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetStatQuery } from '../../../redux/api/consumption';
import DatePicker from '../../DatePicker';
import Spinner from '../../layout/Spinner';
import Heading from '../../ui/Heading';

const StatMoney = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isLoading } = useGetStatQuery(
    {
      shopId: activeShop?.id || 0,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
    },
    {
      skip: !activeShop,
      refetchOnFocus: true,
    }
  );

  const dateChangeHandler = useCallback(
    (period: { start: Date; end: Date }) => {
      setFrom(period.start);
      setTo(period.end);
    },
    []
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <div>
      {isLoading && <Spinner />}
      <DatePicker onChange={dateChangeHandler} />
      {data && (
        <div>
          <Heading level={4} className="mb-3">
            Всего: {data.total}
          </Heading>
          <p>Картой: {data.card}</p>
          <p>Переводом: {data.transfer}</p>
          <p>В счет з/п: {data.debt}</p>
        </div>
      )}
    </div>
  );
};

export default StatMoney;
