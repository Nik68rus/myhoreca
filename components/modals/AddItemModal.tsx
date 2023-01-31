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
import { useGetCupsQuery } from '../../redux/api/cup';
import { ICup } from '../../models/cup';

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
    cupId: item ? item.cupId : undefined,
  });

  // const [cupId, setCupId] = useState<null | number>(null);

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

  const { data: cups, error: cupsError } = useGetCupsQuery();

  useEffect(() => {
    handleRTKQError(createError);
    handleRTKQError(editError);
    handleRTKQError(cupsError);
  }, [createError, editError, cupsError]);

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

  const selectHandler = (cat: ICategory | null) => {
    if (cat) {
      setFormData({ ...formData, categoryId: cat.id });
    }
  };

  const cupSelectHandler = (cup: null | ICup) => {
    if (cup) {
      setFormData({ ...formData, cupId: cup.id });
    } else {
      setFormData({ ...formData, cupId: undefined });
    }
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
              className="mb-5"
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
            <Select
              className="mb-5"
              items={cups ? cups : []}
              label="Стаканчик: "
              withNull={true}
              onSelect={(cup) => cupSelectHandler(cup)}
              selected={item ? item.cupId : null}
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
