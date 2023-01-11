import Link from 'next/link';
import React from 'react';
import { Routes } from '../types/routes';
import logoSvg from '../public/logo.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <Image width="70" src={logoSvg} alt="Logo" />
    </Link>
  );
};

export default Logo;
