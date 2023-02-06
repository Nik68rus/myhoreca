import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import FormControl from '../../forms/FormControl';
import Card from '../../ui/Card';
import cx from 'classnames';
import styles from './Search.module.scss';

interface Props {
  searchHandler: (term: string) => void;
}

const Search = ({ searchHandler }: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler(value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchHandler, value]);

  return (
    <Card className={cx('mb-3', styles.search)}>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl
          id="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FaSearch />
      </form>
    </Card>
  );
};

export default React.memo(Search);
