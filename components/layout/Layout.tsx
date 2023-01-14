import React, { useContext, useEffect, useState } from 'react';
import userAPI from '../../api/userAPI';
import AuthContext from '../../context/AuthContext';
import { getCookie } from '../../helpers/cookies';
import { IUserAuthData } from '../../types/user';
import Header from '../Header/Header';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const { setAuthData } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const user = await userAPI.checkAuth();
      setAuthData(user);
    };
    if (getCookie('accessToken')) {
      getUser();
    }
  }, [setAuthData]);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
