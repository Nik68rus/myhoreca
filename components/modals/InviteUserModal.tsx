import React, { useState } from 'react';
import { toast } from 'react-toastify';
import companyAPI from '../../api/companyAPI';
import userAPI from '../../api/userAPI';
import { handleError } from '../../helpers/error';
import { ICompany } from '../../models/company';
import { IUser } from '../../models/user';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  onSuccess: (
    email: string
  ) => Promise<{ user: IUser | undefined; isSuccess: boolean }>;
};

const InviteUserModal = ({ onClose, onSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSuccess(email);
      console.log(result);

      // if (result.isSuccess) {
      //   toast.success(`Пользователю ${result.user.email} отправлено приглашение!`);
      //   onClose();
      // } else {
      //   throw Error('Что-то пошло не так!');
      // }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
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
