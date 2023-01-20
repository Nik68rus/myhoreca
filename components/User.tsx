import React from 'react';
import { UserRole } from '../types/user';
import skeleton from '../public/assets/avatar-skeleton.jpg';
import Image from 'next/image';
import cx from 'classnames';
import styles from './User.module.scss';

interface Props {
  name: string;
  role: UserRole;
  imageUrl?: string;
  className?: string;
}

const User = ({ name, role, imageUrl, className }: Props) => {
  return (
    <div className={cx(styles.user, className ? className : '')}>
      <div className={styles.avatar}>
        <Image
          src={imageUrl ? imageUrl : skeleton}
          width={40}
          height={40}
          alt="Аватар пользователя"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default User;
