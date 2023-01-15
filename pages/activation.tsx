import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Activation from '../components/Activation';
import AuthContext from '../context/AuthContext';
import { Routes } from '../types/routes';

const ActivationPage = () => {
  return <Activation />;
};

export default ActivationPage;
