import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import userAPI from '../../../api/userAPI';
import { handleError } from '../../../helpers/error';
import { ICompany } from '../../../models/company';
import { IUser } from '../../../models/user';
import {
  useGetEmployeesQuery,
  useInviteEmployeeMutation,
} from '../../../redux/api/user';
import Spinner from '../../layout/Spinner';
import InviteUserModal from '../../modals/InviteUserModal';

import styles from './Employees.module.scss';

interface Props {
  company: ICompany;
  onGoBack: () => void;
}

const Employees = ({ company, onGoBack }: Props) => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const {
    data: employees,
    isLoading: loading,
    error,
    refetch,
  } = useGetEmployeesQuery(company.id);

  useEffect(() => {
    if (!company) {
      onGoBack();
    }
  }, [company, onGoBack]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [inviteEmployee, { data: invitedUser, isSuccess }] =
    useInviteEmployeeMutation();

  const inviteHandler = async (email: string) => {
    console.log({ email, company });

    inviteEmployee({ email, company });
    // refetch();
    return { user: invitedUser, isSuccess };
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
              <button className="button button--small">Заблокировать</button>
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
        <InviteUserModal
          onClose={() => setInviteModalVisible(false)}
          onSuccess={inviteHandler}
        />
      )}
    </>
  );
};

export default Employees;
