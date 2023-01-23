import React from 'react';
import cx from 'classnames';
import styles from './Spinner.module.scss';

interface Props {
  block?: boolean;
  inline?: boolean;
}

const Spinner = ({ block, inline }: Props) => {
  return (
    <div
      className={cx({
        [styles.blockContainer]: block,
        [styles.inlineContainer]: inline,
        [styles.fixedContainer]: !inline && !block,
      })}
    >
      <div className={styles.spinner} />
    </div>
  );
};

export default Spinner;
