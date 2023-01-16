import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import userAPI from '../../../api/userAPI';
import { handleError } from '../../../helpers/error';
import { ICompany } from '../../../models/company';
import { IUser } from '../../../models/user';
import Spinner from '../../layout/Spinner';
import InviteUserModal from '../../modals/InviteUserModal';

import styles from './Employees.module.scss';

interface Props {
  company: ICompany | undefined;
  onGoBack: () => void;
}

const Employees = ({ company, onGoBack }: Props) => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [employees, setEmployees] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!company) {
      onGoBack();
    }
  }, [company, onGoBack]);

  useEffect(() => {
    const getData = async () => {
      console.log('fetch employee');

      if (company) {
        setLoading(true);
        const data = await userAPI.getEmployees(company.id);
        setEmployees(data);
      }
    };

    try {
      getData();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [company]);

  const inviteHandler = async (email: string) => {
    const user = await userAPI.inviteEmployee(email, company!);
    setEmployees([...employees, user]);
    return user;
  };

  return (
    <>
      {loading && <Spinner />}
      {employees.length ? (
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
