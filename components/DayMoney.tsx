import React, { useEffect, useMemo, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { handleRTKQError } from '../helpers/error';
import { useAppSelector } from '../hooks/store';
import { useGetStatQuery } from '../redux/api/consumption';
import styles from './DayMoney.module.scss';

const DayMoney = () => {
  const [stat, setStat] = useState({ total: 0, card: 0, transfer: 0 });
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isSuccess, refetch } = useGetStatQuery(
    activeShop?.id || 0,
    { skip: !activeShop }
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
      <button className="button button--icon" onClick={() => refetch()}>
        <BiRefresh />
      </button>
      <div className={styles.total}>
        {stat.total.toLocaleString('ru-Ru')} руб
      </div>
      <div className={styles.details}>
        <span>
          Картой: {stat.card}
          {stat.transfer > 0 ? ` (+${stat.transfer} перевод)` : null}
        </span>
        <span>Наличными: {stat.total - stat.card - stat.transfer}</span>
      </div>
    </div>
  );
};

export default DayMoney;
