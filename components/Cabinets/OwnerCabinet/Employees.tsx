import React, { useState } from 'react';
import InviteUserModal from '../../modals/InviteUserModal';

const Employees = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setInviteModalVisible(true)}>
        Пригласить
      </button>
      {inviteModalVisible && (
        <InviteUserModal onClose={() => setInviteModalVisible(false)} />
      )}
    </>
  );
};

export default Employees;
