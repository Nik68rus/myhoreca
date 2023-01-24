import React, { useState } from 'react';
import styles from './Reciept.module.scss';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import LogoFull from '../../LogoFull';
import RecieptLine from './RecieptLine';
import Checkbox from '../../forms/Checkbox';
import { removeAll } from '../../../redux/slices/recieptSlice';

const Reciept = () => {
  const [byCard, setByCard] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);

  const { items, total } = useAppSelector((store) => store.reciept);
  const dispatch = useAppDispatch();

  const clearHandler = () => {
    dispatch(removeAll());
  };

  return (
    <section className={styles.reciept}>
      <div className={cx('container', styles.container)}>
        <LogoFull className="mb-6" />
        <div className={cx(styles.date, 'mb-5')}>
          <span>{new Date().toLocaleDateString('ru-Ru', {})}</span>
          <span>
            {new Date().toLocaleTimeString('ru-Ru', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <ul className={styles.list}>
          {items.map((item) => (
            <RecieptLine key={`line-${item.line}`} item={item} />
          ))}
        </ul>
      </div>
      <div className={cx(styles.total, 'mt-6')}>
        <span>Итого:</span> <b>{total.toLocaleString('ru-RU')} руб</b>
      </div>
      <div className={styles.modifiers}>
        <Checkbox
          label="Картой"
          id="byCard"
          checked={byCard}
          onChange={(e) => setByCard(e.target.checked)}
          className={styles.checkbox}
        />
        <Checkbox
          label="Скидка"
          id="isDiscount"
          checked={isDiscount}
          onChange={(e) => setIsDiscount(e.target.checked)}
          className={styles.checkbox}
        />
        <Checkbox label="С собой" id="toGo" className={styles.checkbox} />
      </div>
      <div className={styles.actions}>
        <button
          className={cx(styles.button, styles.buttonOk)}
          disabled={!items.length}
        >
          OK
        </button>
        <button
          className={cx(styles.button, styles.buttonCancel)}
          onClick={clearHandler}
        >
          Отмена
        </button>
      </div>
    </section>
  );
};

export default Reciept;
