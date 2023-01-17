import { useEffect } from 'react';
import { Routes } from '../types/routes';
import AuthForm from '../components/forms/AuthForm';
import { useRouter } from 'next/router';
import Spinner from '../components/layout/Spinner';
import { useAppSelector } from '../hooks/store';

const LoginPage = () => {
  const { authData, loading } = useAppSelector((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && authData && authData.isActivated) {
      router.push(Routes.HOME);
    }
  }, [authData, loading, router]);

  if (loading) {
    return <Spinner />;
  }

  return <AuthForm />;
};

export default LoginPage;
