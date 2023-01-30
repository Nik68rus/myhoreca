import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IConsumption } from '../../../models/consumption';
import { PayType } from '../../../types/item';
import RecieptModal from '../../modals/RecieptModal';
import styles from './HistoryItem.module.scss';

interface Props {
  item: IConsumption;
}

const HistoryItem = ({ item }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const time = new Date(item.createdAt).toLocaleTimeString(['ru-RU'], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <>
      <li onClick={() => setModalVisible(true)}>
        <span>{time}</span>
        <span>{item.isSale ? 'Продажа' : 'Списание'}</span>
        <span>{item.payType}</span>
        <span className={styles.colored}>
          {item.isDiscount ? <FaCheck /> : null}
        </span>
        <span>{item.isSale ? item.total : null}</span>
      </li>
      {modalVisible && (
        <RecieptModal onClose={() => setModalVisible(false)} reciept={item} />
      )}
    </>
  );
};

export default HistoryItem;
