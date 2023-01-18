import { useEffect } from 'react';
import { Routes } from '../types/routes';
import { useRouter } from 'next/router';
import Spinner from '../components/layout/Spinner';
import { useAppSelector } from '../hooks/store';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  const { authData, loading } = useAppSelector((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && authData) {
      router.push(authData.isActivated ? Routes.HOME : Routes.ACTIVATION);
    }
  }, [authData, loading, router]);

  if (loading) {
    return <Spinner />;
  }

  return <LoginForm />;
};

export default LoginPage;
