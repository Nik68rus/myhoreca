import React from 'react';
import styles from './CashierCabinet.module.scss';
import Reciept from './Reciept';
import Store from './Store';

const CashierCabinet = () => {
  return (
    <div className={styles.cabinet}>
      <Store />
      <Reciept />
    </div>
  );
};

export default CashierCabinet;
