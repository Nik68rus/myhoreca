import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './Toggle.module.scss';
import { stringify } from 'querystring';

interface Props<T> {
  values: T[];
  onChange: (value: T) => void;
  active?: T;
  className?: string;
}

const Toggle = <T extends { title: string }>({
  values,
  onChange,
  active,
  className,
}: Props<T>) => {
  const [selected, setSelected] = useState(active ? active : values[0]);
  const [coords, setCoords] = useState({ left: 0, right: 0 });
  const parentRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const selectHandler = (value: T) => {
    setSelected(value);
    onChange(value);
  };

  useEffect(() => {
    if (parentRef.current && activeRef.current) {
      const pCoords = parentRef.current.getBoundingClientRect();
      const aCoords = activeRef.current.getBoundingClientRect();
      const left = aCoords.left - pCoords.left;
      const right = pCoords.right - aCoords.right;
      setCoords({ left, right });
    }
  }, [selected]);

  return (
    <div className={cx(styles.toggle, className)} ref={parentRef}>
      {values.map((value) => (
        <button
          key={value.title}
          className={cx(styles.option, {
            [styles.active]: value.title === selected.title,
          })}
          onClick={selectHandler.bind(this, value)}
          ref={value.title === selected.title ? activeRef : null}
        >
          {value.title}
        </button>
      ))}
      <span
        className={styles.activeBg}
        style={{
          left: coords.left,
          right: coords.right,
        }}
      />
    </div>
  );
};

export default Toggle;
