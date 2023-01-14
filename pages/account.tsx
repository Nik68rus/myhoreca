import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';

const AccountPage = () => {
  const router = useRouter();
  const { authData, loading } = useContext(AuthContext);

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

  return <div className="container">AccountPage</div>;
};

export default AccountPage;
