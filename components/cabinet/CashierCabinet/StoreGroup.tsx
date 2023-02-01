import React, { useState } from 'react';
import { getColor } from '../../../helpers/color';
import { IArrivalWithItem } from '../../../types/item';
import styles from './StoreGroup.module.scss';
import cx from 'classnames';
import GroupItemsModal from '../../modals/GroupItemsModal';

interface Props {
  id: number;
  title: string;
  items: IArrivalWithItem[];
}

const StoreGroup = ({ id, title, items }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button className={styles.group} onClick={() => setExpanded(true)}>
        <div
          className={styles.background}
          style={{
            backgroundColor: `${getColor(id, id > 16 ? id : 16)}`,
          }}
        >
          <span>{title.slice(0, 3).toUpperCase()}</span>
        </div>
        <h4 className={cx(styles.title, 'mb-0')}>{title}</h4>
      </button>
      {expanded && (
        <GroupItemsModal
          onClose={() => setExpanded(false)}
          title={title}
          items={items}
        />
      )}
    </>
  );
};

export default StoreGroup;
