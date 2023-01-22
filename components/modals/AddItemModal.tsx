import React, { useState, useEffect } from 'react';
import { ICategory } from '../../models/category';
import {
  useCreateItemMutation,
  useEditItemMutation,
} from '../../redux/api/item';
import Checkbox from '../forms/Checkbox';
import FormControl from '../forms/FormControl';
import Select from '../forms/Select';
import Spinner from '../layout/Spinner';
import Modal from './Modal';
import styles from './AddItemModal.module.scss';
import { handleRTKQError } from '../../helpers/error';
import { IItem } from '../../models/item';

type Props = {
  onClose: () => void;
  categories: ICategory[];
  item?: IItem;
};

const AddItemModal = ({ onClose, categories, item }: Props) => {
  const [formData, setFormData] = useState({
    categoryId: item ? item.categoryId : categories[0].id,
    title: item ? item.title : '',
    imageUrl: item ? item.imageUrl : '',
    isCountable: item ? item.isCountable : true,
  });

  const [
    createItem,
    { isLoading: createLoading, error: createError, isSuccess: createSuccess },
  ] = useCreateItemMutation();

  const [
    editItem,
    { error: editError, isLoading: editLoading, isSuccess: editSuccess },
  ] = useEditItemMutation();

  const createHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createItem(formData);
  };

  const editHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    editItem({ ...formData, id: item!.id });
  };

  useEffect(() => {
    handleRTKQError(createError);
    handleRTKQError(editError);
  }, [createError, editError]);

  useEffect(() => {
    if (createSuccess) {
      onClose();
    }
    if (editSuccess) {
      onClose();
    }
  }, [onClose, createSuccess, editSuccess]);

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
      {(createLoading || editLoading) && <Spinner />}
      <Modal onClose={onClose} heading="Добавить товар">
        <div className="form">
          <form
            onSubmit={item ? editHandler : createHandler}
            className={styles.form}
          >
            <Select
              items={categories}
              label="Категория: "
              onSelect={selectHandler}
              selected={item ? item.categoryId : categories[0].id}
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
                {item ? 'Изменить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddItemModal;
