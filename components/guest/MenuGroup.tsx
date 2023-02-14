import React, { useState } from 'react';
import { IGroupReady, IMenuGroupItem } from '../../helpers/groupSorting';
import cx from 'classnames';
import styles from './MenuItem.module.scss';
import { getIcon } from './MenuItem';
import Toggle from '../Toggle';

interface Props {
  group: IGroupReady<IMenuGroupItem>;
  category: string;
}
const MenuGroup = ({ group, category }: Props) => {
  const [active, setActive] = useState(group.items[0]);
  return (
    <div className={cx(styles.item, 'p-4')}>
      <div className={styles.icon}>{getIcon(category)}</div>
      <div className={styles.title}>{group.title}</div>
      <Toggle
        values={group.items}
        onChange={(item) => setActive(item)}
        className={cx(styles.sizes, 'mb-2')}
      />
      <div className={styles.price}>{active.price}</div>
    </div>
  );
};

export default MenuGroup;
