import { useRouter } from 'next/router';
import React from 'react';
import { AccountRoutes } from '../../../types/routes';
import styles from './CashierCabinet.module.scss';
import History from './History';
import Reciept from './Reciept';
import Store from './Store';

const CashierCabinet = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.cabinet}>
      {(!slug || (slug && slug[0] === AccountRoutes.WRITEOFF)) && (
        <>
          <Store />
          <Reciept />
        </>
      )}
      {slug && slug[0] === AccountRoutes.HISTORY && <History />}
    </div>
  );
};

export default CashierCabinet;
