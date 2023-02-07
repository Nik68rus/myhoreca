import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCheckUserAuthQuery } from '../../redux/api/user';
import { Routes } from '../../types/routes';
import Footer from './Footer';
import Header from './Header';
import Menu from '../menu/Menu';
import { UserRole } from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useGetShopsQuery } from '../../redux/api/shop';
import { setActiveShop } from '../../redux/slices/shopSlice';
import { shopDto } from '../../helpers/dto';
import { useRefreshTokensQuery } from '../../redux/api/refresh';
import { setAuth } from '../../redux/slices/userSlice';
import { deleteCookie, setCookie } from '../../helpers/cookies';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isAccount = router.pathname === Routes.ACCOUNT;
  useCheckUserAuthQuery();
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector((store) => store.user);
  const { data, isSuccess } = useGetShopsQuery();

  useEffect(() => {
    isSuccess && data.length && dispatch(setActiveShop(shopDto(data[0])));
  }, [isSuccess, data, dispatch]);

  return (
    <div className="wrapper">
      {isAccount && authData && authData.role === UserRole.OWNER && <Menu />}
      <div className="content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
