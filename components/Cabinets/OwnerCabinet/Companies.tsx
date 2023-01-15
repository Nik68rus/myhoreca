import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import companyAPI from '../../../api/companyAPI';
import AuthContext from '../../../context/AuthContext';
import { ICompany } from '../../../models/company';
import AddCompanyModal from '../../modals/AddCompanyModal';

import styles from './Companies.module.scss';
import { handleError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';

interface Props {
  onSelect: (c: ICompany) => void;
  active: ICompany | undefined;
}

const Companies = ({ onSelect, active }: Props) => {
  const [addCompanyVisible, setAddCompanyVisible] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [activeCompany, setActiveCompany] = useState<ICompany | undefined>(
    active
  );
  const [loading, setLoading] = useState(true);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      if (authData) {
        const data = await companyAPI.getCompanies(authData.id);
        setCompanies(data);
      }
    };

    try {
      getData();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [authData]);

  const addCompanyHandler = (company: ICompany) => {
    setCompanies([...companies, company]);
  };

  const companyClickHandler = (company: ICompany) => {
    setActiveCompany(company);
    onSelect(company);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {loading && <Spinner />}
      {!companies.length ? (
        <p>Вы не добавили ни одной точки продаж</p>
      ) : (
        <>
          <h3>Ваши точки продаж:</h3>
          <ul className={styles.list}>
            {companies.map((company) => (
              <li key={company.id} className={styles.item}>
                {company.title}{' '}
                <button
                  className={cx('button button--small', {
                    ['button--outline']: company.title !== activeCompany?.title,
                  })}
                  onClick={companyClickHandler.bind(this, company)}
                >
                  Выбрать
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button className="button" onClick={() => setAddCompanyVisible(true)}>
        Добавить
      </button>
      {addCompanyVisible && (
        <AddCompanyModal
          heading="Добавление точки продаж"
          onClose={() => setAddCompanyVisible(false)}
          onSuccess={addCompanyHandler}
        />
      )}
    </div>
  );
};

export default Companies;
