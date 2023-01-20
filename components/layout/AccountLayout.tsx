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
    <div className={cx('wrapper', { ['wrapper--account']: isAccount })}>
      {isAccount && <Menu />}
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
