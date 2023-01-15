import { useRouter } from 'next/router';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Footer.module.scss';

const Footer = () => {
  const router = useRouter();
  const isMain = router.pathname === Routes.HOME;

  return (
    <footer className={cx(styles.footer, { [styles.fixedFooter]: isMain })}>
      <div className="container">2023 - Круассан</div>
    </footer>
  );
};

export default Footer;
