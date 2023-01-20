import React from 'react';
import styles from './Card.module.scss';
import cx from 'classnames';

interface CardProps {
  tag?: 'div' | 'article' | 'section';
  className?: string;
  children: React.ReactNode;
}

const Card = ({ tag, className, children }: CardProps) =>
  React.createElement(
    tag ? tag : 'div',
    {
      className: cx(className, styles.card),
    },
    children
  );

export default Card;
