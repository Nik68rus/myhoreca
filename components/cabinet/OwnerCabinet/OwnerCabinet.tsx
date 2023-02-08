import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Shops from './Shops';
import Employees from './Employees';
import Items from './Items';
import Stock from './Stock';
import { useAppDispatch } from '../../../hooks/store';
import { useGetShopsQuery } from '../../../redux/api/shop';
import { setActiveShop } from '../../../redux/slices/shopSlice';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import History from '../CashierCabinet/History';
import Discounts from './Discounts';
import Cups from './Cups';
import Groups from './Groups';
import { useRouter } from 'next/router';
import { AccountRoutes } from '../../../types/routes';

const OwnerCabinet = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const { data: shops, isLoading, error } = useGetShopsQuery();

  useEffect(() => {
    if (shops) {
      dispatch(setActiveShop(shops[0]));
    }
  }, [shops, dispatch]);

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <div className={cx('container pt-6', styles.container)}>
      {isLoading && <Spinner />}
      <section className={styles.cabinet}>
        {(!slug || (slug && slug[0] === AccountRoutes.SALES)) && <History />}
        {slug && slug[0] === AccountRoutes.ITEMS && <Items />}
        {slug && slug[0] === AccountRoutes.SHOPS && <Shops />}
        {slug && slug[0] === AccountRoutes.EMPLOYEES && <Employees />}
        {slug && slug[0] === AccountRoutes.STOCK && <Stock />}
        {slug && slug[0] === AccountRoutes.DISCOUNT && <Discounts />}
        {slug && slug[0] === AccountRoutes.CUPS && <Cups />}
        {slug && slug[0] === AccountRoutes.GROUPS && <Groups />}
      </section>
    </div>
  );
};

export default OwnerCabinet;
