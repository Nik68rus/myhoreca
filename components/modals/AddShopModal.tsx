import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../helpers/error';
import { useCreateShopMutation } from '../../redux/api/shop';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const AddShopModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState('');

  const [createShop, { error, isLoading, isSuccess }] = useCreateShopMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Точка ${title} создана успешно!`);
      onClose();
    }
  }, [isSuccess, title, onClose]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createShop(title);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Добавление точки продаж">
        <div className="form">
          <form onSubmit={submitHandler}>
            <FormControl
              className="mb-8"
              label="Название"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название"
              hint="Не менее 3 символов"
            />
            <div className="form__actions mt-8">
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

export default AddShopModal;
