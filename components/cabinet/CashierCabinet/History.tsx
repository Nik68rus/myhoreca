import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';
import Card from '../../ui/Card';
import styles from './History.module.scss';
import cx from 'classnames';
import Heading from '../../ui/Heading';

const History = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(date.toDateString());
  }, [date]);

  return (
    <div className={cx('container', styles.container)}>
      <Card>
        <Heading level={4}>История операций</Heading>
        <div className="form__control">
          <label>Выберите дату</label>
          <Flatpickr
            value={new Date()}
            options={{
              dateFormat: 'j F Y',
            }}
            onChange={(dates) => {
              setDate(dates[0]);
            }}
          />
        </div>
        <ul className="list">
          <li>Операция 1</li>
          <li>Операция 2</li>
        </ul>
      </Card>
    </div>
  );
};

export default History;
