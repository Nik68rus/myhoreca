import { useState, useEffect, useRef, useCallback } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styles from './Select.module.scss';
import cx from 'classnames';

interface Props<T> {
  items: T[];
  label: string;
  onSelect: (item: T) => void;
  invalid?: boolean;
  selected?: number;
  className?: string;
}

const Select = <T extends { id: number; title: string }>({
  items,
  label,
  onSelect,
  invalid,
  selected,
  className,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const [active, setActive] = useState(items[0].id);

  const itemClickHandler = useCallback(
    (item: T) => {
      setActive(item.id);
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
    setActive(selected ? selected : items[0].id);
  }, [selected, items]);

  useEffect(() => {
    if (open) {
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
        {open ? <FaCaretUp /> : <FaCaretDown />}
        <span className={styles.labelText}>{label}</span>
        <span onClick={() => setOpen(!open)} className={styles.choice}>
          {items.find((item) => item.id === active)?.title || 'Выберите'}
        </span>
      </div>
      {open && (
        <div className={styles.popup} ref={popupRef}>
          <ul>
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

export default Select;
