import React, { useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import { handleError } from '../../helpers/error';
import FormControl from '../FormControl/FormControl';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const AddCompanyModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState('');

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(title);
    try {
      const company = await companyAPI.createCompany(title);
      onClose();
      toast.success(`Точка ${company} создана успешно!`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal onClose={onClose} heading="Добавление точки продаж">
      <div className="form">
        <form onSubmit={submitHandler}>
          <FormControl
            label="Название"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
            hint="Не менее 3 символов"
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
  );
};

export default AddCompanyModal;
