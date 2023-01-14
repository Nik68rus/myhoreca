import React, { useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Companies from './Companies';
import Users from './Users';
import Sales from './Sales';

const tabs = [
  { title: 'Точки', component: Companies },
  { title: 'Пользователи', component: Users },
  { title: 'Продажи', component: Sales },
];

const OwnerCabinet = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tabs__content">
          {activeTab.component === Companies && <Companies />}
          {activeTab.component === Users && <Users />}
          {activeTab.component === Sales && <Sales />}
        </div>
      </div>
    </section>
  );
};

export default OwnerCabinet;
