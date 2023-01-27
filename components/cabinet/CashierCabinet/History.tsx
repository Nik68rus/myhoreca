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

const History = () => {
  const [date, setDate] = useState(new Date());
  const [woHidden, setWoHidden] = useState(true);
  const [consumptions, setConsumptions] = useState<IConsumption[]>([]);
  const { activeShop } = useAppSelector((store) => store.shop);

  const { data, error, isSuccess, refetch, isFetching } =
    useGetConsumptionsQuery({
      shopId: activeShop!.id,
      date: date.toISOString(),
    });

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    refetch();
  }, [date, refetch]);

  useEffect(() => {
    if (isSuccess) {
      const items = woHidden ? data!.filter((item) => item.isSale) : data;
      setConsumptions(items);
    }
  }, [isSuccess, data, woHidden]);

  const total = useMemo(
    () => consumptions.reduce((acc, cons) => acc + cons.total, 0),
    [consumptions]
  );

  const card = useMemo(
    () =>
      consumptions
        .filter((item) => item.byCard)
        .reduce((acc, cons) => acc + cons.total, 0),
    [consumptions]
  );

  return (
    <div className={cx('container', styles.container)}>
      <Card className={styles.history}>
        <Heading level={3} className="mb-4">
          История операций
        </Heading>
        <div className={cx('form__control', styles.date)}>
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
        <Checkbox
          id="writeoff"
          label="Скрыть списания"
          checked={woHidden}
          onChange={(e) => setWoHidden(e.target.checked)}
        />
        {isFetching ? (
          <Spinner block={true} />
        ) : (
          <ul className={cx('list', styles.list)}>
            <li>
              <span className={styles.label}>Время</span>
              <span className={styles.label}>Тип</span>
              <span className={styles.label}>Картой</span>
              <span className={styles.label}>Скидка</span>
              <span className={styles.label}>Сумма</span>
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
            <span className={styles.total}>
              Итого: {total.toLocaleString('ru-RU')} руб
            </span>
            <span>Наличными: {(total - card).toLocaleString('ru-RU')}</span>
            <span>Картой: {card.toLocaleString('ru-RU')}</span>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default History;
