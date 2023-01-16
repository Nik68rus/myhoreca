import React, { useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import { handleError } from '../../helpers/error';
import { IItem } from '../../models/item';
import { IItemInput } from '../../types/item';
import Checkbox from '../forms/Checkbox';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  onSuccess: (item: IItemInput) => Promise<IItem>;
};

const AddItemModal = ({ onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    isCountable: true,
  });

  const [loading, setLoading] = useState(false);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSuccess(formData);
      onClose();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      {loading && <Spinner />}
      <Modal onClose={onClose} heading="Добавить товар">
        <div className="form">
          <form onSubmit={submitHandler}>
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
