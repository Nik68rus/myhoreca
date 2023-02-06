import React from 'react';
import cx from 'classnames';
import styles from './Heading.module.scss';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ level, children, className }: HeadingProps) =>
  React.createElement(
    `h${level ? level : 2}`,
    { className: cx(styles.heading, styles[`heading--h${level}`], className) },
    children
  );

export default React.memo(Heading);
