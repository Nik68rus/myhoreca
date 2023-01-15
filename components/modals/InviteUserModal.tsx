import React, { useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import userAPI from '../../api/userAPI';
import { handleError } from '../../helpers/error';
import { ICompany } from '../../models/company';
import FormControl from '../forms/FormControl';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const InviteUserModal = ({ onClose }: Props) => {
  const [email, setEmail] = useState('');

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await userAPI.inviteEmployee(email);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal onClose={onClose} heading="Пригласить пользователя">
      <div className="form">
        <form onSubmit={submitHandler}>
          <FormControl
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите e-mail"
          />
          <div className="form__actions">
            <button type="button" className="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="button button--success">
              Пригласить
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InviteUserModal;
