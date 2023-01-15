import React, { useContext } from 'react';
import OwnerCabinet from '../components/Cabinets/OwnerCabinet/OwnerCabinet';
import PrivateRoute from '../components/PrivateRoute';
import AuthContext from '../context/AuthContext';
import { UserRole } from '../types/user';

const AccountPage = () => {
  const { authData } = useContext(AuthContext);
  return (
    <PrivateRoute>
      {authData?.role === UserRole.OWNER && <OwnerCabinet />}
    </PrivateRoute>
  );
};

export default AccountPage;
