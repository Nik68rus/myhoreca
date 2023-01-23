import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useGetEmployeesQuery } from '../../../redux/api/user';
import Spinner from '../../layout/Spinner';
import InviteUserModal from '../../modals/InviteUserModal';
import Card from '../../ui/Card';
import UserControl from './UserControl';

const Employees = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const { activeShop } = useAppSelector((store) => store.shop);

  const {
    data: employees,
    isLoading: loading,
    error: loadingError,
  } = useGetEmployeesQuery(activeShop?.id || 0, { skip: !activeShop });

  useEffect(() => {
    handleRTKQError(loadingError);
  }, [loadingError]);

  return (
    <>
      {loading && <Spinner block={true} />}
      {!loading && (
        <Card>
          {employees && employees.length ? (
            <ul className="list">
              {employees.map((employee) => (
                <li key={employee.id}>
                  <UserControl user={employee} />
                </li>
              ))}
            </ul>
          ) : activeShop ? (
            <p>В данной точке еще нет кассиров</p>
          ) : (
            <p>Выберите точку</p>
          )}
          {activeShop && (
            <button
              className="button"
              onClick={() => setInviteModalVisible(true)}
            >
              Пригласить
            </button>
          )}
        </Card>
      )}
      {inviteModalVisible && (
        <InviteUserModal onClose={() => setInviteModalVisible(false)} />
      )}
    </>
  );
};

export default Employees;
