import React, { useEffect } from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import {
  setActiveSection,
  toggleMenu,
} from '../../../redux/slices/layoutSlice';
import { CashierSection } from '../../../types/sections';
import styles from './CashierActions.module.scss';
import { removeAll } from '../../../redux/slices/recieptSlice';

const CashierActions = () => {
  const dispatch = useAppDispatch();
  const { activeSection } = useAppSelector((store) => store.layout);

  useEffect(() => {
    dispatch(setActiveSection(CashierSection.SALE));
  }, [dispatch]);

  const switchHandler = (section: CashierSection) => {
    dispatch(setActiveSection(section));
    dispatch(removeAll());
    dispatch(toggleMenu(false));
  };

  return (
    <div className={styles.actions}>
      {Object.values(CashierSection).map((title) => (
        <button
          key={title}
          className={cx(styles.button, {
            [styles.buttonActive]: activeSection === title,
          })}
          onClick={() => switchHandler(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default CashierActions;
