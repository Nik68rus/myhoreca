import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Shops from './Shops';
import Employees from './Employees';
import Sales from './Sales';
import { IShop } from '../../../models/shop';
import Items from './Items';
import Stock from './Stock';
import { useAppSelector } from '../../../hooks/store';

const tabs = [
  // { title: 'Товары', component: Items, specific: false },
  { title: 'Точки', component: Shops, specific: false },
  { title: 'Сотрудники', component: Employees, specific: true },
  { title: 'Остатки', component: Stock, specific: true },
  { title: 'Продажи', component: Sales, specific: true },
];

const OwnerCabinet = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { activeShop } = useAppSelector((state) => state.owner);

  const forceShopSelection = useCallback(() => {
    setActiveTab(tabs[0]);
  }, []);

  return (
    <section className={cx('container', styles.cabinet)}>
      <h2>Личный кабинет руководителя</h2>
      <div className="tabs">
        <div className="tabs__controls">
          {tabs.map((tab) => (
            <button
              key={tab.title}
              className={cx('tabs__control', {
                ['tabs__control--active']: tab.title === activeTab.title,
              })}
              onClick={() => setActiveTab(tab)}
              disabled={tab.specific && activeShop === null}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tabs__content">
          {activeTab.component === Shops && <Shops />}
          {activeTab.component === Employees && activeShop && (
            <Employees onGoBack={forceShopSelection} />
          )}
          {activeTab.component === Sales && <Sales />}
          {/* {activeTab.component === Items && <Items />} */}
          {/* {activeTab.component === Stock && <Stock shop={shop} />} */}
        </div>
      </div>
    </section>
  );
};

export default OwnerCabinet;
