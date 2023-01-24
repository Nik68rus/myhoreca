import React from 'react';
import cx from 'classnames';
import classNames from 'classnames';

interface Props {
  id: string;
  name?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  className?: string;
}

const Checkbox = ({ id, name, label, onChange, checked, className }: Props) => {
  return (
    <div
      className={cx(
        'form__control form__control--checkbox',
        className ? className : ''
      )}
    >
      <input
        type="checkbox"
        name={name || id}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
