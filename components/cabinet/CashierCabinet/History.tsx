import React, { useEffect, useState, useMemo } from 'react';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';
import Card from '../../ui/Card';
import styles from './History.module.scss';
import cx from 'classnames';
import Heading from '../../ui/Heading';
import { useGetConsumptionsQuery } from '../../../redux/api/consumption';
import { useAppSelector } from '../../../hooks/store';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import { IConsumption } from '../../../models/consumption';
import HistoryItem from './HistoryItem';
import Checkbox from '../../forms/Checkbox';
import { PayType } from '../../../types/item';

const History = () => {
  const [date, setDate] = useState(new Date());
  const [woHidden, setWoHidden] = useState(true);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [consumptions, setConsumptions] = useState<IConsumption[]>([]);
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isSuccess, refetch, isFetching } =
    useGetConsumptionsQuery(
      {
        shopId: activeShop?.id || 0,
        date: date.toISOString(),
      },
      { skip: !activeShop }
    );

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [date, data, refetch]);

  useEffect(() => {
    if (isSuccess) {
      const items = woHidden ? data!.filter((item) => item.isSale) : data;
      setConsumptions(
        discountOnly ? items.filter((item) => item.isDiscount) : items
      );
    }
  }, [isSuccess, data, woHidden, discountOnly]);

  const total = useMemo(
    () => consumptions.reduce((acc, cons) => acc + cons.total, 0),
    [consumptions]
  );

  const card = useMemo(
    () =>
      consumptions
        .filter((item) => item.payType === PayType.CARD)
        .reduce((acc, cons) => acc + cons.total, 0),
    [consumptions]
  );

  const transfer = useMemo(
    () =>
      consumptions
        .filter((item) => item.payType === PayType.TRANSFER)
        .reduce((acc, cons) => acc + cons.total, 0),
    [consumptions]
  );

  return (
    <div className={cx('container', styles.container)}>
      <Card className={styles.history}>
        <Heading level={3} className="mb-4">
          История операций
        </Heading>
        <div className={cx('form__control mb-7', styles.date)}>
          <label>Выберите дату</label>
          <Flatpickr
            value={date}
            options={{
              dateFormat: 'j F Y',
            }}
            onChange={(dates) => {
              setDate(dates[0]);
            }}
          />
        </div>
        <div className="form__group mb-6">
          <Checkbox
            id="writeoff"
            label="Скрыть списания"
            checked={woHidden}
            onChange={(e) => setWoHidden(e.target.checked)}
          />
          <Checkbox
            id="discount"
            label="Только скидка"
            checked={discountOnly}
            onChange={(e) => setDiscountOnly(e.target.checked)}
          />
        </div>
        {isFetching ? (
          <Spinner block={true} />
        ) : (
          <ul className={cx('list', styles.list)}>
            <li>
              <span className="label">Время</span>
              <span className="label">Тип</span>
              <span className="label">Оплата</span>
              <span className="label">Скидка</span>
              <span className="label">Сумма</span>
            </li>
            {consumptions.length ? (
              consumptions.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))
            ) : (
              <p>Записей за выбранную дату не обнаружено</p>
            )}
          </ul>
        )}
        {consumptions.length && !isFetching ? (
          <div className={styles.income}>
            <span className={cx(styles.total, 'mb-5')}>
              Итого: {total.toLocaleString('ru-RU')} руб
            </span>
            <span>
              Наличными: {(total - card - transfer).toLocaleString('ru-RU')}
            </span>
            <span>Картой: {card.toLocaleString('ru-RU')}</span>
            <span>Переводом: {transfer.toLocaleString('ru-RU')}</span>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default History;
