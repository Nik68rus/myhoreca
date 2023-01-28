import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../../helpers/error';
import { ICategory } from '../../../models/category';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import {
  useCreateDiscountMutation,
  useGetDiscountsQuery,
} from '../../../redux/api/discount';
import Counter from '../../Counter';
import Select from '../../forms/Select';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import DiscountItem from './DiscountItem';
import styles from './Discounts.module.scss';

const Discounts = () => {
  const [addMode, setAddMode] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [value, setValue] = useState(0);
  const { data: categories, error: catError } = useGetCategoriesQuery();

  const [addDiscount, { isLoading, isSuccess, error: createError }] =
    useCreateDiscountMutation();

  const {
    data: discounts,
    isLoading: disLoading,
    error: disError,
    isFetching,
  } = useGetDiscountsQuery();

  useEffect(() => {
    handleRTKQError(catError);
    handleRTKQError(createError);
    handleRTKQError(disError);
  }, [catError, createError, disError]);

  useEffect(() => {
    if (isSuccess) {
      setAddMode(false);
      setSelectedCatId(0);
      setValue(0);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (categories?.length) {
      setSelectedCatId(categories[0].id);
    }
  }, [categories]);

  const selectHandler = (cat: ICategory) => {
    setSelectedCatId(cat.id);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value > 0) {
      addDiscount({ categoryId: selectedCatId, value });
    } else {
      toast.error('Значение скидки должно быть больше 0');
    }
  };

  return (
    <>
      {(isLoading || disLoading || isFetching) && <Spinner />}
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
        {addMode && categories && categories.length && (
          <div className="form">
            <form onSubmit={submitHandler}>
              <div className="form__group">
                <Select
                  className="mb-0"
                  items={categories}
                  label="Категория: "
                  onSelect={selectHandler}
                  selected={selectedCatId ? selectedCatId : categories[0].id}
                />
                <Counter
                  initialValue={0}
                  step={5}
                  onChange={(n) => setValue(n)}
                />
                <button type="submit" className="button button--icon">
                  <FaCheck />
                </button>
                <button
                  className="button button--icon"
                  onClick={() => setAddMode(false)}
                >
                  <FaTimes />
                </button>
              </div>
            </form>
          </div>
        )}
        {!addMode && (
          <button
            className="button button--icon"
            aria-label="Добавить новую скидку"
            onClick={() => setAddMode(true)}
          >
            <FaPlus />
          </button>
        )}
      </Card>
    </>
  );
};

export default Discounts;
