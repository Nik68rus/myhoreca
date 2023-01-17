import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import styles from './OwnerCabinet.module.scss';
import Companies from './Companies';
import Employees from './Employees';
import Sales from './Sales';
import { ICompany } from '../../../models/company';
import Items from './Items';
import Menu from './Menu';

const tabs = [
  { title: 'Товары', component: Items, specific: false },
  { title: 'Точки', component: Companies, specific: false },
  { title: 'Сотрудники', component: Employees, specific: true },
  { title: 'Меню', component: Menu, specific: true },
  { title: 'Продажи', component: Sales, specific: true },
];

const OwnerCabinet = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [company, setCompany] = useState<ICompany>();

  const forceCompanySelection = useCallback(() => {
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
              disabled={tab.specific && company === undefined}
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
          {activeTab.component === Employees && company && (
            <Employees company={company} onGoBack={forceCompanySelection} />
          )}
          {activeTab.component === Sales && <Sales />}
          {activeTab.component === Items && <Items />}
          {activeTab.component === Menu && <Menu company={company} />}
        </div>
      </div>
    </section>
  );
};

export default OwnerCabinet;
