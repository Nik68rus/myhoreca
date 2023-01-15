import React, { useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Companies from './Companies';
import Employees from './Employees';
import Sales from './Sales';
import { ICompany } from '../../../models/company';

const tabs = [
  { title: 'Точки', component: Companies },
  { title: 'Сотрудники', component: Employees },
  { title: 'Продажи', component: Sales },
];

const OwnerCabinet = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [company, setCompany] = useState<ICompany>();

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
              disabled={company === undefined}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tabs__content">
          {activeTab.component === Companies && (
            <Companies
              onSelect={(company: ICompany) => setCompany(company)}
              active={company}
            />
          )}
          {activeTab.component === Employees && <Employees />}
          {activeTab.component === Sales && <Sales />}
        </div>
      </div>
    </section>
  );
};

export default OwnerCabinet;
