import React, { useContext, useEffect, useState } from 'react';
import userAPI from '../../api/userAPI';
import AuthContext from '../../context/AuthContext';
import { getCookie } from '../../helpers/cookies';
import { IUserAuthData } from '../../types/user';
import Footer from './Footer';
import Header from './Header';

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
    } else {
      setAuthData(null);
    }
  }, [setAuthData]);

  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
