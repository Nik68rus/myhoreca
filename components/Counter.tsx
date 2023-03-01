import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import cx from 'classnames';
import styles from './Counter.module.scss';

interface Props {
  label?: string;
  initialValue?: number;
  step?: number;
  onChange: (n: number) => void;
  className?: string;
  max?: number;
}

const Counter = ({
  label,
  initialValue,
  step,
  max,
  onChange,
  className,
}: Props) => {
  const [value, setValue] = useState(initialValue ?? 1);
  const currentStep = step || 1;

  const incHandler = () => {
    setValue(value + currentStep);
  };

  const decHandler = () => {
    const newValue = value - currentStep;
    setValue(newValue < 1 ? 0 : newValue);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (max && value > max) {
      setValue(max);
      onChange(max);
    } else {
      onChange(value);
    }
  }, [value, max, onChange]);

  return (
    <div className={cx(styles.counter, className ? className : '')}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.group}>
        <button
          type="button"
          className={cx('button button--heavy', styles.dec)}
          onClick={decHandler}
          disabled={value === 0}
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
          disabled={!!max && value === max}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
