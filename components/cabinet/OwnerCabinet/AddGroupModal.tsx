import React, { useCallback, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import { useCreateGroupMutation } from '../../../redux/api/group';
import FormControl from '../../forms/FormControl';
import cx from 'classnames';
import Select from '../../forms/Select';
import styles from './AddGroupModal.module.scss';
import { FaPlus } from 'react-icons/fa';
import Spinner from '../../layout/Spinner';
import { ICategory } from '../../../models/category';

const AddGroupModal = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const { data: categories, error: catError } = useGetCategoriesQuery();

  const [
    createGroup,
    { isLoading, error: createError, isSuccess: createSuccess },
  ] = useCreateGroupMutation();

  useEffect(() => {
    if (categories?.length) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (createSuccess) {
      setTitle('');
    }
  }, [createSuccess]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      createGroup({ title, categoryId });
    },
    [categoryId, createGroup, title]
  );

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    []
  );

  const catSelectHandler = useCallback(
    (cat: { id: number; title: string } | null) => {
      setCategoryId(cat?.id || 0);
    },
    []
  );

  return (
    <>
      {isLoading && <Spinner />}

      {categories && (
        <form className="form" onSubmit={submitHandler}>
          <div className={cx('form__group', styles.form)}>
            <FormControl
              type="text"
              id="title"
              value={title}
              onChange={changeHandler}
            />
            <Select
              items={categories}
              label="Категория: "
              onSelect={catSelectHandler}
              selected={categories[0].id}
            />
            <button
              className="button button--icon"
              disabled={title.trim().length < 3}
            >
              <FaPlus />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddGroupModal;
