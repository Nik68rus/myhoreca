import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetSalaryQuery } from '../../../redux/api/salary';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import ShopSalary from './ShopSalary';

const Salary = () => {
  const [editing, setEditing] = useState(false);
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isFetching, isLoading } = useGetSalaryQuery(
    (activeShop && activeShop.id) ?? skipToken
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  if (!activeShop) {
    return <Card>Выберите точку продаж</Card>;
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Card className="mb-4">
            {isFetching && <Spinner />}
            {!editing ? (
              <div>
                <p className="m-0">
                   Зарплата для данной точки{' '}
                  {data ? (
                    <>
                      <b>{data.amount.toLocaleString('ru-RU')}</b> рублей за
                      смену
                    </>
                  ) : (
                    'не установлена'
                  )}
                </p>
                <button
                  className="button mt-4"
                  onClick={() => setEditing(true)}
                >
                  {data ? 'Изменить' : 'Установить'}
                </button>
              </div>
            ) : (
              <ShopSalary
                onFinish={() => setEditing(false)}
                value={data?.amount || undefined}
              />
            )}
          </Card>
          <Card>
            <Heading>Начисления</Heading>
          </Card>
        </>
      )}
    </>
  );
};

export default Salary;
