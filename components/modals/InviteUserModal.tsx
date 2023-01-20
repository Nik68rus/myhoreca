import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../helpers/error';
import { useAppSelector } from '../../hooks/store';
import { IUser } from '../../models/user';
import { useInviteEmployeeMutation } from '../../redux/api/user';
import FormControl from '../forms/FormControl';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const InviteUserModal = ({ onClose }: Props) => {
  const [email, setEmail] = useState('');
  const { activeShop } = useAppSelector((store) => store.owner);

  const [inviteEmployee, { data: invitedUser, isLoading, error }] =
    useInviteEmployeeMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (activeShop) {
      inviteEmployee({ email, shop: activeShop });
    }
  };

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (invitedUser) {
      toast.success(
        `Пользователю ${invitedUser.email} отправлено приглашение!`
      );
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
