import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Activation from '../components/Activation';
import { useAppSelector } from '../hooks/store';
import { Routes } from '../types/routes';

const ActivationPage = () => {
  const { authData } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (authData && authData.isActivated) router.push(Routes.HOME);
  }, [authData, router]);

  return <Activation />;
};

export default ActivationPage;
