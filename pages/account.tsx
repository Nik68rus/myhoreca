import React, { useContext } from 'react';
import CashierCabinet from '../components/Cabinets/CashierCabinet/CashierCabinet';
import OwnerCabinet from '../components/Cabinets/OwnerCabinet/OwnerCabinet';
import PrivateRoute from '../components/PrivateRoute';
import AuthContext from '../context/AuthContext';
import { UserRole } from '../types/user';

const AccountPage = () => {
  const { authData } = useContext(AuthContext);
  return (
    <PrivateRoute>
      {authData?.role === UserRole.OWNER && <OwnerCabinet />}
      {authData?.role === UserRole.CASHIER && <CashierCabinet />}
    </PrivateRoute>
  );
};

export default AccountPage;
