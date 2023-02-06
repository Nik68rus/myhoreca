import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card';
import { useGetGroupsQuery } from '../../../redux/api/group';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import Group from './Group';
import styles from './Groups.module.scss';
import cx from 'classnames';
import AddGroupModal from './AddGroupModal';

const Groups = () => {
  const { data: groups, error, isLoading, isFetching } = useGetGroupsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <Card>
      {(isLoading || isFetching) && <Spinner />}
      {groups && groups.length ? (
        <ul className={cx(styles.list, 'mb-6')}>
          {groups.map((group) => (
            <Group
              key={group.id}
              id={group.id}
              title={group.title}
              category={{ id: group.categoryId, title: group.category.title }}
            />
          ))}
        </ul>
      ) : (
        <p>Групп нет</p>
      )}
      <AddGroupModal />
    </Card>
  );
};

export default Groups;
