import React, { useState } from 'react';
import AddCompanyModal from '../../modals/AddCompanyModal';

const Companies = () => {
  const [addCompanyVisible, setAddCompanyVisible] = useState(false);
  return (
    <div>
      <p>dscnsdb</p>
      <button className="button" onClick={() => setAddCompanyVisible(true)}>
        Добавить
      </button>
      {addCompanyVisible && (
        <AddCompanyModal onClose={() => setAddCompanyVisible(false)} />
      )}
    </div>
  );
};

export default Companies;
