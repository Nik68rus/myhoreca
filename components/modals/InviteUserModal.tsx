import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import userAPI from '../../api/userAPI';
import { handleError, handleRTKQError } from '../../helpers/error';
import { ICompany } from '../../models/company';
import { IUser } from '../../models/user';
import { useInviteEmployeeMutation } from '../../redux/api/user';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  // onSuccess: () => void;
  company: ICompany;
};

const InviteUserModal = ({ onClose, company }: Props) => {
  const [email, setEmail] = useState('');

  const [inviteEmployee, { data: invitedUser, isSuccess, isLoading, error }] =
    useInviteEmployeeMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    inviteEmployee({ email, company });
  };

  useEffect(() => {
    if (error) {
      handleRTKQError(error);
    }
  }, [error]);

  useEffect(() => {
    if (invitedUser) {
      toast.success(
        `Пользователю ${invitedUser.email} отправлено приглашение!`
      );
      // onSuccess();
      onClose();
    }
  }, [invitedUser, onClose]);

  return (
    <>
      {isLoading && <Spinner />}
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
    </>
  );
};

export default InviteUserModal;
