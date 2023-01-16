import React from 'react';

interface Props {
  id: string;
  name?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}

const Checkbox = ({ id, name, label, onChange, checked }: Props) => {
  return (
    <div className="form__control form__control--checkbox">
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
