import { useState } from 'react';
import Link from 'next/link';
import { Routes } from '../types/routes';
import { IUserLoginData } from '../types/user';
import AuthForm from '../components/AuthForm/AuthForm';

const LoginPage = () => {
  return <AuthForm />;
};

export default LoginPage;
