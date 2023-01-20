import Link from 'next/link';
import React from 'react';
import Heading from '../components/ui/Heading';
import { Routes } from '../types/routes';

const Error404 = () => {
  return (
    <div className="container">
      <div className="message">
        <Heading level={1}>404</Heading>
        <p>Такой страницы не существует!</p>
        <div className="message__actions">
          <Link href={Routes.HOME} className="button">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
