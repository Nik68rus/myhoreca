import Link from 'next/link';
import React from 'react';
import { Routes } from '../types/routes';

const Error404 = () => {
  return (
    <div className="container">
      <div className="message">
        <h1 className="heading heading--h1">404</h1>
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
