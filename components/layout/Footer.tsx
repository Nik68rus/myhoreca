import { useRouter } from 'next/router';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Footer.module.scss';
import CashierActions from '../cabinet/CashierCabinet/CashierActions';
import { useAppSelector } from '../../hooks/store';
import { UserRole } from '../../types/user';
import DayMoney from '../DayMoney';

const Footer = () => {
  const router = useRouter();
  const { authData } = useAppSelector((store) => store.user);
  const { activeShop } = useAppSelector((store) => store.shop);
  const isMain = router.pathname === Routes.HOME;

  return (
    <footer
      className={cx(styles.footer, {
        [styles.fixedFooter]: isMain,
      })}
    >
      <div className={styles.container}>
        {isMain ? (
          <div>2023 - Круассан</div>
        ) : (
          <>
            {authData?.role === UserRole.CASHIER && <CashierActions />}
            {authData && activeShop && <DayMoney />}
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
