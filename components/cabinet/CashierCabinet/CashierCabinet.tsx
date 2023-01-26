import React from 'react';
import { useAppSelector } from '../../../hooks/store';
import { CashierSection } from '../../../types/sections';
import styles from './CashierCabinet.module.scss';
import Reciept from './Reciept';
import Store from './Store';

const CashierCabinet = () => {
  const { activeSection } = useAppSelector((store) => store.layout);
  return (
    <div className={styles.cabinet}>
      {(activeSection === CashierSection.SALE ||
        activeSection === CashierSection.WRITEOFF) && <Store />}
      <Reciept />
    </div>
  );
};

export default CashierCabinet;
