import React from 'react';

type TInputType = 'email' | 'password' | 'text' | 'number' | 'tel';

interface Props {
  label: string;
  type: TInputType;
  id: string;
  name?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  hint?: string;
  ref?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
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
}: Props) => {
  return (
    <div className="form__control">
      <label htmlFor={id}>{label}</label>
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

export default FormControl;
