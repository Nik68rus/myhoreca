import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCheckUserAuthQuery } from '../../redux/api/user';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import Footer from './Footer';
import Header from './Header';
import Menu from '../menu/Menu';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isAccount = router.pathname === Routes.ACCOUNT;
  useCheckUserAuthQuery();

  return (
    <div className="wrapper">
      {isAccount && <Menu />}
      <div className="content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
