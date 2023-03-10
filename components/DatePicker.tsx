import React, { useEffect, useState } from 'react';
import styles from './DatePicker.module.scss';
import Toggle from './Toggle';
import Flatpickr from 'react-flatpickr';
import cx from 'classnames';

enum DateType {
  DAY = 'день',
  INTERVAL = 'период',
}

interface Props {
  onChange: (period: { start: Date; end: Date }) => void;
  dayOnly?: boolean;
}

const DatePicker = ({ onChange, dayOnly }: Props) => {
  const [type, setType] = useState(DateType.DAY);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    if (start > end) {
      setEnd(start);
    }
  }, [start, end]);

  useEffect(() => {
    const startTime = new Date(start.setHours(0, 0));
    const endTime = new Date(
      type === DateType.DAY ? start.setHours(23, 59) : end.setHours(23, 59)
    );
    onChange({ start: startTime, end: endTime });
  }, [start, end, onChange, type]);

  return (
    <div className={cx(styles.datePicker, 'mb-6')}>
      {!dayOnly && (
        <Toggle
          values={Object.values(DateType).map((value) => ({ title: value }))}
          onChange={(value) => setType(value.title)}
          className="mb-5"
        />
      )}
      <div className={cx('form__group', styles.days)}>
        <div className="form__control">
          <label>{type === DateType.DAY ? 'Выберите дату' : 'С:'}</label>
          <Flatpickr
            value={start}
            options={{
              dateFormat: 'j F Y',
            }}
            onChange={(dates) => {
              setStart(dates[0]);
            }}
          />
        </div>
        {type === DateType.INTERVAL && (
          <div className="form__control">
            <label>По:</label>
            <Flatpickr
              value={end}
              options={{
                dateFormat: 'j F Y',
              }}
              onChange={(dates) => {
                setEnd(dates[0]);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DatePicker);
