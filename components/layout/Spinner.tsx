import React from 'react';
// import cx from 'classnames';
import styles from './Spinner.module.scss';

interface Props {
  block?: boolean;
}

const Spinner = ({ block }: Props) => {
  return (
    <div className={block ? styles.containerBlock : styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Spinner;
