import React, { useState, useEffect } from 'react';
import { ICategory } from '../../models/category';
import { useCreateItemMutation } from '../../redux/api/item';
import Checkbox from '../forms/Checkbox';
import FormControl from '../forms/FormControl';
import Select from '../forms/Select';
import Spinner from '../layout/Spinner';
import Modal from './Modal';
import styles from './AddItemModal.module.scss';
import { handleRTKQError } from '../../helpers/error';

type Props = {
  onClose: () => void;
  categories: ICategory[];
};

const AddItemModal = ({ onClose, categories }: Props) => {
  const [formData, setFormData] = useState({
    categoryId: categories[0].id,
    title: '',
    imageUrl: '',
    isCountable: true,
  });

  const [createItem, { isLoading, error, isSuccess }] = useCreateItemMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createItem(formData);
  };

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [onClose, isSuccess]);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkboxChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { checked, name } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const selectHandler = (cat: ICategory) => {
    setFormData({ ...formData, categoryId: cat.id });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Добавить товар">
        <div className="form">
          <form onSubmit={submitHandler} className={styles.form}>
            <Select
              items={categories}
              label="Категория: "
              onSelect={selectHandler}
            />
            <FormControl
              label="Название"
              type="text"
              id="title"
              value={formData.title}
              onChange={inputChangeHandler}
              placeholder="Введите название товара"
              hint="Не менее 3 символов"
            />
            <FormControl
              label="Изображение"
              type="text"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={inputChangeHandler}
              placeholder="Введите ссылку на изображение"
            />
            <Checkbox
              id="isCountable"
              label="учет по количеству"
              onChange={checkboxChangeHandler}
              checked={formData.isCountable}
            />
            <div className="form__actions">
              <button type="button" className="button" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="button button--success">
                Добавить
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddItemModal;
