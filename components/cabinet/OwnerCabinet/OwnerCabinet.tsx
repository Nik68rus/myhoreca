import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Shops from './Shops';
import Employees from './Employees';
import Sales from './Sales';
import { IShop } from '../../../models/shop';
import Items from './Items';
import Stock from './Stock';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import Heading from '../../ui/Heading';
import Card from '../../ui/Card';
import { Section } from '../../../types/sections';
import { useGetShopsQuery } from '../../../redux/api/shop';
import { setActiveShop } from '../../../redux/slices/ownerSlice';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';

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
    <div className="container pt-6">
      {isLoading && <Spinner />}
      <Heading level={3}>Личный кабинет руководителя</Heading>
      <section className={styles.cabinet}>
        {activeSection === Section.ITEMS && <Items />}
        {activeSection === Section.SHOPS && <Shops />}
        {activeSection === Section.EMPLOYYES && <Employees />}
        {activeSection === Section.SALES && <Sales />}
        {activeSection === Section.STOCK && <Stock />}
        {/* {activeTab.component === Items && <Items />} */}
      </section>
    </div>
  );
};

export default OwnerCabinet;
