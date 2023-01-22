import React, { useEffect } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetArrivalsQuery } from '../../../redux/api/arrival';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import styles from './Stock.module.scss';
import StockItem from './StockItem';

const Stock = () => {
  const { activeShop } = useAppSelector((store) => store.owner);
  const {
    data: stockItems,
    isLoading,
    error,
  } = useGetArrivalsQuery(activeShop?.id || 0, { skip: activeShop === null });

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          {!activeShop && (
            <p>Выберите nточку продаж для просмотра ее ассортимента!</p>
          )}
          {activeShop && stockItems && !stockItems.length && (
            <p>На витрине пусто</p>
          )}
          {activeShop && stockItems && stockItems.length && (
            <ul className="list">
              <li className={styles.stockItem}>
                <span>Наименование</span>
                <span>Кол</span>
                <span>Цена</span>
                <span>Действия</span>
              </li>
              {stockItems
                .slice()
                .sort((a, b) => b.quantity - a.quantity)
                .map((item) => (
                  <StockItem key={item.id} item={item} />
                ))}
            </ul>
          )}
        </Card>
      )}
    </>
  );
};

export default Stock;
