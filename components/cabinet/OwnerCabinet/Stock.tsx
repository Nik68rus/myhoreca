import React, { useEffect } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetArrivalsQuery } from '../../../redux/api/arrival';
import Spinner from '../../layout/Spinner';
import Position from '../../Position';
import Card from '../../ui/Card';

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
      {isLoading && <Spinner />}
      {!isLoading && (
        <Card>
          {!activeShop && (
            <p>Выберите nточку продаж для просмотра ее ассортимента!</p>
          )}
          {activeShop && stockItems && !stockItems.length && (
            <p>На витрине пусто</p>
          )}
          {activeShop && stockItems && stockItems.length && (
            <div>
              {stockItems.map((item) => (
                <div key={item.id}>{item.price}</div>
                // <Position key={item.id} item={item} />
              ))}
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default Stock;
