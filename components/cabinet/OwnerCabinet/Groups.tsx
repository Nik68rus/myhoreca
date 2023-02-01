import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card';
import { FaPlus } from 'react-icons/fa';
import FormControl from '../../forms/FormControl';
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
} from '../../../redux/api/group';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import Group from './Group';
import styles from './Groups.module.scss';
import cx from 'classnames';
import Select from '../../forms/Select';
import { useGetCategoriesQuery } from '../../../redux/api/category';

const Groups = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const { data: categories, error: catError } = useGetCategoriesQuery();
  const { data: groups, error, isLoading, isFetching } = useGetGroupsQuery();
  const [
    createGroup,
    { isLoading: creating, error: createError, isSuccess: createSuccess },
  ] = useCreateGroupMutation();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createGroup({ title, categoryId });
  };

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(catError);
    handleRTKQError(createError);
  }, [error, createError, catError]);

  useEffect(() => {
    if (categories?.length) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (createSuccess) {
      setTitle('');
    }
  }, [createSuccess]);

  return (
    <Card>
      {(creating || isLoading || isFetching) && <Spinner />}
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
      {categories && (
        <form className="form" onSubmit={submitHandler}>
          <div className={cx('form__group', styles.form)}>
            <FormControl
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              items={categories}
              label="Категория: "
              onSelect={(cat) => setCategoryId(cat?.id || 0)}
              selected={categories[0].id}
            />
            <button
              className="button button--icon"
              disabled={title.trim().length < 3}
            >
              <FaPlus />
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default Groups;
