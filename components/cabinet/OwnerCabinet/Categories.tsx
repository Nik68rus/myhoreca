import React, { useEffect } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import Spinner from '../../layout/Spinner';
import styles from './Categories.module.scss';
import CatItem from './CatItem';

const Categories = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {categories && categories.length ? (
        <ul className={styles.list}>
          {categories?.map((cat) => (
            <CatItem category={cat} key={cat.id} />
          ))}
        </ul>
      ) : (
        <p>Вы не добавили ни одной категории</p>
      )}
    </>
  );
};

export default Categories;
