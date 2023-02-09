import React, { useEffect, useMemo, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { handleRTKQError } from '../helpers/error';
import { useAppSelector } from '../hooks/store';
import { useGetStatQuery } from '../redux/api/consumption';
import styles from './DayMoney.module.scss';

const DayMoney = () => {
  const [stat, setStat] = useState({ total: 0, card: 0, transfer: 0, debt: 0 });
  const { activeShop } = useAppSelector((store) => store.shop);

  const dayStart = new Date().setHours(0, 0);
  const dayEnd = new Date().setHours(23, 59);

  const { data, error, isSuccess } = useGetStatQuery(
    {
      shopId: activeShop?.id || 0,
      from: new Date(dayStart).toISOString(),
      to: new Date(dayEnd).toISOString(),
    },
    {
      skip: !activeShop,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setStat(data);
    }
  }, [isSuccess, data]);

  return (
    <div className={styles.money}>
      <div className={styles.total}>
        {stat.total.toLocaleString('ru-Ru')} руб
      </div>
      <div className={styles.details}>
        <span>
          Картой: {stat.card}
          {stat.transfer > 0 ? ` (+${stat.transfer} перевод)` : null}
        </span>
        <span>
          Наличными: {stat.total - stat.card - stat.transfer - stat.debt}
          {stat.debt > 0 ? ` (+${stat.debt} в счет з/п)` : null}
        </span>
      </div>
    </div>
  );
};

export default DayMoney;
