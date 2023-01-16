import React, { useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import { handleError } from '../../helpers/error';
import { ICompany } from '../../models/company';
import FormControl from '../forms/FormControl';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  onSuccess: (company: ICompany) => void;
  heading: string;
};

const AddCompanyModal = ({ onClose, onSuccess, heading }: Props) => {
  const [title, setTitle] = useState('');

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(title);
    try {
      const company = await companyAPI.createCompany(title);
      onSuccess(company);
      onClose();
      toast.success(`Точка ${company.title} создана успешно!`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal onClose={onClose} heading={heading}>
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