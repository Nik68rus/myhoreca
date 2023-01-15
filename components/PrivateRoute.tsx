import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';
import Spinner from './layout/Spinner';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { authData, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authData && !loading) {
      router.push(Routes.LOGIN);
    }

    if (!loading && authData && !authData.isActivated) {
      router.push(Routes.ACTIVATION);
    }
  }, [authData, loading, router]);

  if (loading) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
