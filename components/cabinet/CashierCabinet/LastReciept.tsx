import React from 'react';
import { useAppSelector } from '../../../hooks/store';
import styles from './LastReciept.module.scss';
import cx from 'classnames';
import LogoFull from '../../LogoFull';
import Heading from '../../ui/Heading';

const LastReciept = () => {
  const { last } = useAppSelector((store) => store.reciept);

  if (last === null) {
    return (
      <div className={cx('container', styles.container)}>
        <LogoFull className="mt-6" />
      </div>
    );
  }

  const total = last.items.reduce((acc, i) => acc + i.quantity * i.price, 0);
  return (
    <div className={cx('container', styles.container)}>
      <LogoFull className="mb-3" />
      <Heading level={5} className="mb-1">
        Последний чек
      </Heading>
      <div className={cx(styles.date, 'mb-3')}>
        <span>{new Date(last.createdAt).toLocaleDateString('ru-Ru')}</span>
        <span>
          {new Date(last.createdAt).toLocaleTimeString('ru-Ru', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      <ul className={styles.list}>
        {last.items.map((item) => (
          <li key={item.id} className={styles.line}>
            <span>
              {item.title} {item.toGo && '🥤'} {item.withSyrup && '💧'}
            </span>
            {item.quantity > 1 ? (
              <span className={styles.quantity}>*{item.quantity}=</span>
            ) : null}
            <span className={styles.price}>{item.quantity * item.price}</span>
          </li>
        ))}
      </ul>
      <div className={cx(styles.total, 'mt-6')}>
        <span>Итого:</span> <b>{total.toLocaleString('ru-RU')} руб</b>
      </div>
    </div>
  );
};

export default LastReciept;
