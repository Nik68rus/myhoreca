import React, { useState } from 'react';
import Card from '../../ui/Card';
import cx from 'classnames';
import StatCat from './StatCat';

enum StatSection {
  CATEGORY = 'Категории',
  ITEM = 'Товары',
  WRITEOFF = 'Списания',
  DISCOUNT = 'Скидки',
}

const sections: StatSection[] = Object.values(StatSection);

const Stat = () => {
  const [active, setActive] = useState<StatSection>(StatSection.CATEGORY);
  const string: HTMLElement = document.querySelector('h2')!;
  return (
    <Card>
      <div className="tabs">
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
      <div className="pt-4 pb-4">
        {active === StatSection.CATEGORY && <StatCat />}
      </div>
    </Card>
  );
};

export default Stat;
