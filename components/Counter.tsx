import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import cx from 'classnames';
import styles from './Counter.module.scss';

interface Props {
  label?: string;
  initialValue?: number;
  step?: number;
  onChange: (n: number) => void;
}

const Counter = ({ label, initialValue, step, onChange }: Props) => {
  const [value, setValue] = useState(initialValue || 1);
  const currentStep = step || 1;

  const incHandler = () => {
    setValue(value + currentStep);
  };

  const decHandler = () => {
    const newValue = value - currentStep;
    setValue(newValue < 2 ? 1 : newValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className={styles.counter}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.group}>
        <button
          type="button"
          className={cx('button button--heavy', styles.dec)}
          onClick={decHandler}
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => setValue(+e.target.value)}
        />
        <button
          type="button"
          className={cx('button', styles.inc)}
          onClick={incHandler}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;