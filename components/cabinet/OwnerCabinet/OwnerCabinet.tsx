import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Shops from './Shops';
import Employees from './Employees';
import Items from './Items';
import Stock from './Stock';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { Section } from '../../../types/sections';
import { useGetShopsQuery } from '../../../redux/api/shop';
import { setActiveShop } from '../../../redux/slices/shopSlice';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import History from '../CashierCabinet/History';
import Discounts from './Discounts';
import Cups from './Cups';
import Groups from './Groups';

const OwnerCabinet = () => {
  const { activeSection } = useAppSelector((store) => store.layout);
  const dispatch = useAppDispatch();

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
        {activeSection === Section.ITEMS && <Items />}
        {activeSection === Section.SHOPS && <Shops />}
        {activeSection === Section.EMPLOYYES && <Employees />}
        {activeSection === Section.SALES && <History />}
        {activeSection === Section.STOCK && <Stock />}
        {activeSection === Section.DISCOUNT && <Discounts />}
        {activeSection === Section.CUPS && <Cups />}
        {activeSection === Section.GROUPS && <Groups />}
      </section>
    </div>
  );
};

export default OwnerCabinet;
