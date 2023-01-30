import React, { useState, useEffect } from 'react';
import { handleRTKQError } from '../../helpers/error';
import { useCreateCategoryMutation } from '../../redux/api/category';
import Categories from '../cabinet/OwnerCabinet/Categories';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const CategoryModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [isValid, setIsValid] = useState(false);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createCategory(title);
  };

  useEffect(() => {
    if (title.trim().length >= 3) {
      setIsValid(true);
    }
  }, [title]);

  const [createCategory, { error, isLoading, isSuccess }] =
    useCreateCategoryMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    isSuccess && setTitle('');
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Управление категориями">
        <Categories />
        <div className="form">
          <form onSubmit={submitHandler}>
            <div className="form__group mb-9">
              <FormControl
                label="Название"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название категории"
                hint="Не менее 3 символов"
              />
              <button
                type="submit"
                className="button button--success"
                disabled={!isValid}
              >
                Добавить
              </button>
            </div>
          </form>
          <button type="button" className="button" onClick={onClose}>
            Отмена
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryModal;
