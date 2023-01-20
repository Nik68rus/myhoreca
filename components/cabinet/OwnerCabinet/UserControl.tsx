import React, { useEffect } from 'react';
import { FaCheckCircle, FaMinusCircle, FaSpinner } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { IUser } from '../../../models/user';
import { useEditEmployeeMutation } from '../../../redux/api/user';
import User from '../../User';
import cx from 'classnames';
import styles from './UserControl.module.scss';

interface Props {
  user: IUser;
}

const UserControl = ({ user }: Props) => {
  const [editEmployee, { error: editingError }] = useEditEmployeeMutation();

  const blockHandler = (id: number, status: boolean) => {
    editEmployee({ id, isBlocked: status });
  };

  useEffect(() => {
    handleRTKQError(editingError);
  }, [editingError]);

  return (
    <div className={styles.userLine}>
      <User {...user} />
      <span className={styles.mail}>{user.email}</span>
      <span
        className={cx(styles.status, {
          [styles.blocked]: user.isBlocked,
          [styles.waiting]: !user.isActivated && !user.isBlocked,
        })}
      >
        {user.isBlocked ? (
          <FaMinusCircle />
        ) : user.isActivated ? (
          <FaCheckCircle />
        ) : (
          <FaSpinner />
        )}
      </span>
      <button
        className="button button--small button--heavy"
        onClick={() => {
          blockHandler(user.id, !user.isBlocked);
        }}
      >
        {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
      </button>
    </div>
  );
};

export default UserControl;
