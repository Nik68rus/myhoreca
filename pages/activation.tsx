import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Activation from '../components/Activation/Activation';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';

const ActivationPage = () => {
  const router = useRouter();
  const { authData, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!authData && !loading) {
      router.push(Routes.LOGIN);
    }
  }, [authData, loading, router]);

  return <Activation />;
};

export default ActivationPage;
