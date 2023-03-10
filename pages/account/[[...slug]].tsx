import CashierCabinet from '../../components/cabinet/CashierCabinet/CashierCabinet';
import OwnerCabinet from '../../components/cabinet/OwnerCabinet/OwnerCabinet';
import PrivateRoute from '../../components/PrivateRoute';
import { useAppSelector } from '../../hooks/store';
import { UserRole } from '../../types/user';

const AccountPage = () => {
  const { authData } = useAppSelector((store) => store.user);

  return (
    <PrivateRoute>
      {authData?.role === UserRole.OWNER && <OwnerCabinet />}
      {authData?.role === UserRole.CASHIER && <CashierCabinet />}
    </PrivateRoute>
  );
};

export default AccountPage;
