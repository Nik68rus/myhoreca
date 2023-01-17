import React, { useEffect, useState } from 'react';
import { useCheckUserAuthQuery } from '../../redux/api/user';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  useCheckUserAuthQuery();

  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
