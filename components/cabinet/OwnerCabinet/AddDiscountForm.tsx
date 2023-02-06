import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../../helpers/error';
import { ICategory } from '../../../models/category';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { useCreateDiscountMutation } from '../../../redux/api/discount';
import Select from '../../forms/Select';
import styles from './AddDiscountForm.module.scss';
import cx from 'classnames';
import Counter from '../../Counter';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import Spinner from '../../layout/Spinner';

const AddDiscountForm = () => {
  const [addMode, setAddMode] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [value, setValue] = useState(0);

  const { data: categories, error: catError } = useGetCategoriesQuery();

  const [addDiscount, { isLoading, isSuccess, error: createError }] =
    useCreateDiscountMutation();

  useEffect(() => {
    handleRTKQError(catError);
    handleRTKQError(createError);
  }, [catError, createError]);

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

  const selectHandler = (cat: { id: number; title: string } | null) => {
    if (cat) {
      setSelectedCatId(cat.id);
    }
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
      {isLoading && <Spinner />}
      {addMode && categories && categories.length && (
        <div className={cx('form', styles.form)}>
          <form onSubmit={submitHandler}>
            <div className="form__group">
              <Select
                className="mb-0"
                items={categories}
                label="Категория: "
                onSelect={selectHandler}
                selected={selectedCatId ? selectedCatId : categories[0].id}
              />
              <div className={styles.buttons}>
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
    </>
  );
};

export default AddDiscountForm;
