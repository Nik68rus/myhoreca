import React from 'react';
import { IArrivalWithItem } from '../../types/item';
import StoreItem from '../cabinet/CashierCabinet/StoreItem';
import Modal from './Modal';
import styles from './GroupItemsModal.module.scss';

type Props = {
  onClose: () => void;
  items: IArrivalWithItem[];
  title: string;
};

const GroupItemsModal = ({ onClose, items, title }: Props) => {
  return (
    <>
      <Modal onClose={onClose} heading={title} className={styles.modal}>
        <ul className={styles.list}>
          {items
            .sort((a, b) => a.price - b.price)
            .map((item) => (
              <li key={item.id} onClick={() => onClose()}>
                <StoreItem item={item} inner={true} />
              </li>
            ))}
        </ul>
      </Modal>
    </>
  );
};

export default GroupItemsModal;
