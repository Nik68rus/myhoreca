import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/store';
import { Routes } from '../types/routes';
import Spinner from './layout/Spinner';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { authData, loading } = useAppSelector((store) => store.user);
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
