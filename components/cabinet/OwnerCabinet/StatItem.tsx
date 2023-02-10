import React, { useEffect, useState } from 'react';
import { useGetMovementsQuery } from '../../../redux/api/item';
import { IShopData } from '../../../types/shop';
import Heading from '../../ui/Heading';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import styles from './StatItem.module.scss';
import { IMovement } from '../../../services/ItemService';
import Spinner from '../../layout/Spinner';
import { handleRTKQError } from '../../../helpers/error';
import ItemSelector from './ItemSelector';

interface Props {
  shop: IShopData | null;
  from: Date;
  to: Date;
}

const StatItem = ({ shop, from, to }: Props) => {
  const [item, setItem] = useState<number | null>(null);
  const { data, isFetching, error } = useGetMovementsQuery(
    {
      shopId: shop?.id || 0,
      itemId: item || 0,
      from: from.toISOString(),
      to: to.toISOString(),
    },
    { skip: !shop || !item }
  );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <div>
      {isFetching && <Spinner />}
      <ItemSelector onSelect={(id) => setItem(id)} className="mb-6" />
      <Heading level={4} className="mb-6">
        Движение товара:
      </Heading>
      {data && data.length ? (
        <ul className="list">
          <li className={styles.line}>
            <span className="label">Тип</span>
            <span className="label">Кто</span>
            <span className="label">Кол.</span>
            <span className="label">Цена</span>
            <span className="label">Дата</span>
          </li>
          {data.map((line) => (
            <li
              key={line.createdAt as unknown as string}
              className={styles.line}
            >
              <span>
                {line.type === 'arrival' ? (
                  <AiOutlineLogin />
                ) : (
                  <AiOutlineLogout />
                )}
              </span>
              <span>{line.user}</span>
              <span>{line.quantity}</span>
              <span>{line.price}</span>
              <span>
                {new Date(line.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default StatItem;
