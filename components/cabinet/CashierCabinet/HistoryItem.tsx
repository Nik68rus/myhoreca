import React, { useState } from 'react';
import { FaCheck, FaDollarSign, FaMinus, FaPeopleArrows } from 'react-icons/fa';
import { BsCreditCard2Back, BsCashCoin, BsTrash } from 'react-icons/bs';
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

  const getTypeIcon = (type: PayType) => {
    if (type === PayType.CARD) {
      return <BsCreditCard2Back />;
    }
    if (type === PayType.CASH) {
      return <BsCashCoin />;
    }

    if (type === PayType.TRANSFER) {
      return <FaPeopleArrows />;
    }

    if (type === PayType.WRITEOFF) {
      return <FaMinus />;
    }
  };

  return (
    <>
      <li onClick={() => setModalVisible(true)} className={styles.line}>
        <span>{time}</span>
        <span>{item.isSale ? <FaDollarSign /> : <BsTrash />}</span>
        <span>{getTypeIcon(item.payType)}</span>
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

export default React.memo(HistoryItem);
