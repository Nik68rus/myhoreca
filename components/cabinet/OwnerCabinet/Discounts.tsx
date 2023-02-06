import React, { useEffect } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetDiscountsQuery } from '../../../redux/api/discount';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import DiscountItem from './DiscountItem';
import styles from './Discounts.module.scss';
import AddDiscountForm from './AddDiscountForm';

const Discounts = () => {
  const {
    data: discounts,
    isLoading,
    error,
    isFetching,
  } = useGetDiscountsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {(isLoading || isFetching) && <Spinner />}
      <Card className={styles.discounts}>
        <Heading>Скидки</Heading>
        {discounts?.length ? (
          <ul className="list">
            {discounts.map((discount) => (
              <DiscountItem key={discount.id} item={discount} />
            ))}
          </ul>
        ) : (
          <p>Вы еще не добавили ни одной скидки!</p>
        )}
        <AddDiscountForm />
      </Card>
    </>
  );
};

export default Discounts;
