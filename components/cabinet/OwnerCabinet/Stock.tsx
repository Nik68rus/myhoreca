import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetArrivalsQuery } from '../../../redux/api/arrival';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import styles from './Stock.module.scss';
import StockItem from './StockItem';
import cx from 'classnames';

const Stock = () => {
  const [countable, setCountable] = useState(true);
  const { activeShop } = useAppSelector((store) => store.shop);
  const {
    data: stockItems,
    isLoading,
    error,
    isFetching,
  } = useGetArrivalsQuery(activeShop?.id || 0, { skip: activeShop === null });

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {isFetching && <Spinner />}
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          {!activeShop && (
            <p>Выберите nточку продаж для просмотра ее ассортимента!</p>
          )}
          {activeShop && stockItems && !stockItems.length ? (
            <p>На витрине пусто</p>
          ) : null}
          {activeShop && stockItems && stockItems.length ? (
            <>
              <div className="tabs">
                <button
                  onClick={() => setCountable(true)}
                  className={cx('tabs__control', {
                    ['tabs__control--active']: countable,
                  })}
                >
                  Штучные
                </button>
                <button
                  onClick={() => setCountable(false)}
                  className={cx('tabs__control', {
                    ['tabs__control--active']: !countable,
                  })}
                >
                  Бесконечные
                </button>
              </div>

              <ul className="list">
                <li className={styles.stockItem}>
                  <span>Наименование</span>
                  <span>Кол</span>
                  <span>Цена</span>
                  <span>Действия</span>
                </li>
                {stockItems
                  .slice()
                  .filter((si) => si.item.isCountable === countable)
                  .map((item) => (
                    <StockItem key={item.id} item={item} />
                  ))}
              </ul>
            </>
          ) : null}
        </Card>
      )}
    </>
  );
};

export default Stock;
