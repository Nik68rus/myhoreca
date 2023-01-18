import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { IShop } from '../../../models/shop';
import {
  useEditEmployeeMutation,
  useGetEmployeesQuery,
  useInviteEmployeeMutation,
} from '../../../redux/api/user';
import Spinner from '../../layout/Spinner';
import InviteUserModal from '../../modals/InviteUserModal';

import styles from './Employees.module.scss';

interface Props {
  onGoBack: () => void;
}

const Employees = ({ onGoBack }: Props) => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const { activeShop } = useAppSelector((store) => store.owner);

  const {
    data: employees,
    isLoading: loading,
    error,
    refetch,
  } = useGetEmployeesQuery(activeShop?.id || 0, { skip: !activeShop });

  useEffect(() => {
    if (!activeShop) {
      onGoBack();
    }
  }, [activeShop, onGoBack]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editEmployee, { error: editingError }] = useEditEmployeeMutation();

  useEffect(() => {
    if (editingError) {
      handleRTKQError(editingError);
    }
  }, [editingError]);

  const blockHandler = (id: number, status: boolean) => {
    editEmployee({ id, isBlocked: status });
  };

  return (
    <>
      {loading && <Spinner />}
      {employees && employees.length ? (
        <ul className={styles.list}>
          {employees.map((employee) => (
            <li key={employee.id} className={styles.item}>
              {employee.email}
              {employee.isActivated ? <FaCheckCircle /> : <FaMinusCircle />}
              <span className="tag">{employee.role}</span>
              <button
                className="button button--small"
                onClick={() => {
                  blockHandler(employee.id, !employee.isBlocked);
                }}
              >
                {employee.isBlocked ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>В данной точке еще нет кассиров</p>
      )}
      <button className="button" onClick={() => setInviteModalVisible(true)}>
        Пригласить
      </button>
      {inviteModalVisible && (
        <InviteUserModal onClose={() => setInviteModalVisible(false)} />
      )}
    </>
  );
};

export default Employees;
