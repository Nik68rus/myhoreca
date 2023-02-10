import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styles from './Select.module.scss';
import cx from 'classnames';

interface Props<T> {
  items: T[];
  label: string;
  onSelect: (item: T | null) => void;
  invalid?: boolean;
  selected?: number | null;
  className?: string;
  withNull?: boolean;
}

const Select = <T extends { id: number; title: string }>({
  items,
  label,
  onSelect,
  invalid,
  selected,
  className,
  withNull,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<null | number>(null);
  const [coords, setCoords] = useState(['auto', '0']);

  const itemClickHandler = useCallback(
    (item: T | null) => {
      setActive(item ? item.id : null);
      onSelect(item);
    },
    [onSelect]
  );

  const docClickHandler = useCallback((e: MouseEvent) => {
    setTimeout(() => {
      document.addEventListener('click', () => setOpen(false), { once: true });
    }, 10);
  }, []);

  useEffect(() => {
    setActive(selected || selected === null ? selected : null);
  }, [selected, items]);

  useEffect(() => {
    if (open) {
      const breakpointSm = window.matchMedia('(max-width: 767px)');

      const mainCoords = document
        .querySelector('main')!
        .getBoundingClientRect();
      const popupCoords = popupRef.current!.getBoundingClientRect();
      if (mainCoords.x > popupCoords.x && !breakpointSm.matches) {
        setCoords(['0', 'auto']);
      } else if (breakpointSm.matches) {
        setCoords(['0', '0']);
      }
      document.addEventListener('click', docClickHandler, { once: true });
    }

    return () => {
      document.removeEventListener('click', docClickHandler);
    };
  }, [open, docClickHandler]);

  return (
    <div
      className={cx(styles.select, className ? className : '', {
        [styles.invalid]: invalid,
      })}
    >
      <div className={styles.label}>
        <div>
          {open ? <FaCaretUp /> : <FaCaretDown />}
          <span className={styles.labelText}>{label}</span>
        </div>
        <span onClick={() => setOpen(!open)} className={styles.choice}>
          {withNull && active === null
            ? 'нет'
            : items.find((item) => item.id === active)?.title || 'Выберите'}
        </span>
      </div>
      {open && (
        <div
          className={styles.popup}
          ref={popupRef}
          style={{ left: coords[0], right: coords[1] }}
        >
          <ul>
            {withNull && (
              <li
                className={active === null ? styles.active : ''}
                onClick={itemClickHandler.bind(this, null)}
              >
                нет
              </li>
            )}
            {items.map((item) => (
              <li
                key={item.id}
                className={active === item.id ? styles.active : ''}
                onClick={itemClickHandler.bind(this, item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(Select);
