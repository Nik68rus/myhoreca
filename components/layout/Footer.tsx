import { useRouter } from 'next/router';
import React from 'react';
import cx from 'classnames';
import { Routes } from '../../types/routes';
import styles from './Footer.module.scss';

const Footer = () => {
  const router = useRouter();
  const isMain = router.pathname === Routes.HOME;

  return (
    <footer
      className={cx(styles.footer, {
        [styles.fixedFooter]: isMain,
      })}
    >
      <div className={cx('container', styles.container)}>
        {isMain ? (
          <div>2023 - Круассан</div>
        ) : (
          <>
            <div className={styles.actions}>
              <button>Продажа</button>
              <button>Списание</button>
              <button>История</button>
            </div>
            <div>Всего 5950 руб, из них картой 2310 руб</div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
