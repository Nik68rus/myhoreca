import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCupStatQuery } from '../../../redux/api/cup';
import { ICupHistory } from '../../../services/CupService';
import { SortType } from '../../../types/item';
import { IShopData } from '../../../types/shop';
import Spinner from '../../layout/Spinner';
import styles from './StatCup.module.scss';

interface Props {
  shop: IShopData | null;
  from: Date;
  to: Date;
}

const StatCup = ({ shop, from, to }: Props) => {
  const [items, setItems] = useState<ICupHistory[]>([]);
  const [sorting, setSorting] = useState(SortType.ABC);
  const { data, isLoading, error } = useGetCupStatQuery(
    {
      shopId: shop?.id || 0,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
    },
    {
      skip: !shop,
    }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      setItems(
        data
          .slice()
          .sort((a, b) =>
            sorting === SortType.ABC
              ? a.title.localeCompare(b.title)
              : b.quantity - a.quantity
          )
      );
    }
  }, [data, sorting]);

  return (
    <div>
      {isLoading && <Spinner />}
      {items && items.length ? (
        <ul className="list">
          <li className={styles.line}>
            <span
              className="label label--interactive"
              onClick={() => setSorting(SortType.ABC)}
            >
              Наименование
            </span>
            <span
              className="label label--interactive"
              onClick={() => setSorting(SortType.QTY)}
            >
              Кол-во
            </span>
          </li>
          {items.map((cup) => (
            <li key={cup.cupId} className={styles.line}>
              <span>{cup.title}</span>
              <span>{cup.quantity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p> Ничего не найдено!</p>
      )}
    </div>
  );
};

export default StatCup;
