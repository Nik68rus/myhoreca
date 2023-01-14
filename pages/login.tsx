import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Routes } from '../types/routes';
import { IUserLoginData } from '../types/user';
import AuthForm from '../components/AuthForm/AuthForm';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner/Spinner';

const LoginPage = () => {
  const { authData, loading } = useContext(AuthContext);
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
