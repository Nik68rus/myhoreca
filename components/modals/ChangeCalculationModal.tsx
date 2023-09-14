import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import cx from 'classnames';
import styles from './ChangeCalculationModal.module.scss';
import FormControl from '../forms/FormControl';

type Props = {
  amount: number;
  onClose: () => void;
};

const DiscountPayModal = ({ amount, onClose }: Props) => {
  const [cash, setCash] = useState<string>("");

  const cashChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCash(e.target.value)
  }, []);

  return (
    <>
      <Modal onClose={onClose} heading="Сдача:" className={styles.modal}>
        <div className={styles.change}>{cash.length ? `${(+cash - amount).toLocaleString('ru-RU')} руб` : "-"}</div>
        <div>Сумма чека - {amount} руб.</div>
        <p>Наличными:</p>
        <div className={styles.money}>
          <span className={styles.coupure} onClick={() => setCash("200")}>200</span>
          <span className={styles.coupure} onClick={() => setCash("300")}>300</span>
          <span className={styles.coupure} onClick={() => setCash("500")}>500</span>
          <span className={styles.coupure} onClick={() => setCash("1000")}>1 000</span>
          <span className={styles.coupure} onClick={() => setCash("1500")}>1 500</span>
          <span className={styles.coupure} onClick={() => setCash("2000")}>2 000</span>
          <span className={styles.coupure} onClick={() => setCash("5000")}>5 000</span>
        </div>
        <FormControl
          label="Другая сумма:"
          type="number"
          id="cash"
          value={cash}
          onChange={cashChangeHandler}
          placeholder="Введите сумму"
        />
      </Modal>
    </>
  );
};

export default DiscountPayModal;
