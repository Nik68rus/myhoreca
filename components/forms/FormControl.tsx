import React from 'react';
import cx from 'classnames';

type TInputType = 'email' | 'password' | 'text' | 'number' | 'tel';

interface Props {
  label?: string;
  type: TInputType;
  id: string;
  name?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  hint?: string;
  ref?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
}

const FormControl = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  hint,
  ref,
  disabled,
  className,
}: Props) => {
  return (
    <div className={cx('form__control', className ? className : '')}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ''}
        ref={ref ? ref : null}
        disabled={disabled ? true : false}
      />
      {hint && <span className="form__hint">{hint}</span>}
    </div>
  );
};

export default React.memo(FormControl);
