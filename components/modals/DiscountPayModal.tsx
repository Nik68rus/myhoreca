import React from 'react';
import Modal from './Modal';
import styles from './DiscountPayModal.module.scss';
import cx from 'classnames';

type Props = {
  onClose: () => void;
  choiceHandler: (isDebt: boolean) => void;
};

const DiscountPayModal = ({ onClose, choiceHandler }: Props) => {
  return (
    <>
      <Modal onClose={onClose} heading="Оплата:" className={styles.modal}>
        <div className={styles.actions}>
          <button
            className={cx('button button--heavy', styles.button)}
            onClick={() => {
              choiceHandler(true);
              onClose();
            }}
          >
            В счет з/п
          </button>
          <button
            className={cx('button', styles.button)}
            onClick={() => {
              choiceHandler(false);
              onClose();
            }}
          >
            Оплата сейчас
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DiscountPayModal;
