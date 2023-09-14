import React, { useEffect, useMemo, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { handleRTKQError } from '../helpers/error';
import { useAppSelector } from '../hooks/store';
import {
  useGetStatQuery,
  useGetTodayStatQuery,
} from '../redux/api/consumption';
import styles from './DayMoney.module.scss';
import classNames from 'classnames';

interface IDayMoneyProps {
  main?: boolean;
}

const DayMoney = ({main}: IDayMoneyProps) => {
  const [stat, setStat] = useState({ total: 0, card: 0, transfer: 0, debt: 0 });
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isSuccess, refetch } = useGetTodayStatQuery(
    activeShop?.id || 0,
    { skip: !activeShop, refetchOnFocus: true }
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
    <div className={classNames(styles.money, main && styles.main)}>
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
          {stat.debt > 0 ? ` (+${stat.debt} за з/п)` : null}
        </span>
      </div>
    </div>
  );
};

export default DayMoney;
