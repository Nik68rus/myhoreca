import React, { useEffect } from 'react';
import cx from 'classnames';
import { useAppDispatch } from '../../../hooks/store';
import { toggleMenu } from '../../../redux/slices/layoutSlice';
import { CashierSection } from '../../../types/sections';
import styles from './CashierActions.module.scss';
import { removeAll } from '../../../redux/slices/recieptSlice';
import Link from 'next/link';
import { AccountRoutes, Routes } from '../../../types/routes';
import { useRouter } from 'next/router';

const links = [
  {
    title: CashierSection.SALE,
    path: Routes.ACCOUNT,
  },
  {
    title: CashierSection.WRITEOFF,
    path: `${Routes.ACCOUNT}/${AccountRoutes.WRITEOFF}`,
  },
  {
    title: CashierSection.HISTORY,
    path: `${Routes.ACCOUNT}/${AccountRoutes.HISTORY}`,
  },
];

const CashierActions = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const switchHandler = () => {
    dispatch(removeAll());
    dispatch(toggleMenu(false));
  };

  return (
    <div className={styles.actions}>
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.path}
          className={cx(styles.button, {
            [styles.buttonActive]:
              (slug && slug[0] === link.path) ||
              (!slug && link.path === Routes.ACCOUNT),
          })}
          onClick={switchHandler}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default CashierActions;
