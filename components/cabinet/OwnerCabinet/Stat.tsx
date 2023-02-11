import React, { useCallback, useState } from 'react';
import Card from '../../ui/Card';
import cx from 'classnames';
import StatCat from './StatCat';
import StatSpecConsumption from './StatSpecConsumption';
import StatMoney from './StatMoney';
import { useAppSelector } from '../../../hooks/store';
import DatePicker from '../../DatePicker';
import StatItem from './StatItem';
import StatCup from './StatCup';

enum StatSection {
  CATEGORY = 'Категории',
  ITEM = 'Товары',
  WRITEOFF = 'Списания',
  DISCOUNT = 'Скидки',
  MONEY = 'Деньги',
  CUP = 'Стаканчики',
}

const sections: StatSection[] = Object.values(StatSection);

const Stat = () => {
  const [active, setActive] = useState<StatSection>(StatSection.CATEGORY);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const { activeShop } = useAppSelector((store) => store.shop);

  const dateChangeHandler = useCallback(
    (period: { start: Date; end: Date }) => {
      setFrom(period.start);
      setTo(period.end);
    },
    []
  );

  return (
    <Card>
      <div className="tabs mb-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActive(section)}
            className={cx('tabs__control', {
              ['tabs__control--active']: section === active,
            })}
          >
            {section}
          </button>
        ))}
      </div>
      <DatePicker onChange={dateChangeHandler} />
      <div className="pt-4 pb-4">
        {active === StatSection.CATEGORY && (
          <StatCat shop={activeShop} from={from} to={to} />
        )}
        {active === StatSection.ITEM && (
          <StatItem shop={activeShop} from={from} to={to} />
        )}
        {active === StatSection.WRITEOFF && (
          <StatSpecConsumption
            type="writeoff"
            shop={activeShop}
            from={from}
            to={to}
          />
        )}
        {active === StatSection.DISCOUNT && (
          <StatSpecConsumption
            type="discount"
            shop={activeShop}
            from={from}
            to={to}
          />
        )}
        {active === StatSection.MONEY && (
          <StatMoney shop={activeShop} from={from} to={to} />
        )}
        {active === StatSection.CUP && (
          <StatCup shop={activeShop} from={from} to={to} />
        )}
      </div>
    </Card>
  );
};

export default Stat;
