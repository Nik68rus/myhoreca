import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetEmployeesQuery } from '../../../redux/api/user';
import Spinner from '../../layout/Spinner';
import InviteUserModal from '../../modals/InviteUserModal';
import Card from '../../ui/Card';

import styles from './Employees.module.scss';
import UserControl from './UserControl';

const Employees = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const { activeShop } = useAppSelector((store) => store.owner);

  const {
    data: employees,
    isLoading: loading,
    error: loadingError,
  } = useGetEmployeesQuery(activeShop?.id || 0, { skip: !activeShop });

  useEffect(() => {
    if (loadingError) {
      handleRTKQError(loadingError);
    }
  }, [loadingError]);

  return (
    <>
      {loading && <Spinner />}
      <Card>
        {employees && employees.length ? (
          <ul className={styles.list}>
            {employees.map((employee) => (
              <li key={employee.id} className={styles.item}>
                <UserControl user={employee} />
              </li>
            ))}
          </ul>
        ) : (
          <p>В данной точке еще нет кассиров</p>
        )}
        <button className="button" onClick={() => setInviteModalVisible(true)}>
          Пригласить
        </button>
      </Card>
      {inviteModalVisible && (
        <InviteUserModal onClose={() => setInviteModalVisible(false)} />
      )}
    </>
  );
};

export default Employees;
