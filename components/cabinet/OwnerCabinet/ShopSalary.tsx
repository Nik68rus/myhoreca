import React, { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { useCreateEditSalaryMutation } from '../../../redux/api/salary';
import Counter from '../../Counter';
import Spinner from '../../layout/Spinner';

interface Props {
  onFinish: () => void;
  editing?: boolean;
  value?: number;
}

const ShopSalary = ({ onFinish, value }: Props) => {
  const [amount, setAmount] = useState(value || 500);
  const { activeShop } = useAppSelector((store) => store.shop);

  const [createSalary, { error, isLoading, isSuccess }] =
    useCreateEditSalaryMutation();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      onFinish();
    }
  }, [isSuccess, onFinish]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (activeShop) {
        createSalary({ shopId: activeShop.id, amount });
      }
    },
    [createSalary, activeShop, amount]
  );

  return (
    <form className="form" onSubmit={submitHandler}>
      {isLoading && <Spinner />}
      <div className="form__group">
        <Counter
          initialValue={amount}
          step={50}
          onChange={(value) => setAmount(value)}
        />
        <button
          className="button button--icon"
          disabled={!activeShop || amount <= 0}
        >
          <FaCheck />
        </button>
        <button className="button button--icon" onClick={() => onFinish()}>
          <FaTimes />
        </button>
      </div>
    </form>
  );
};

export default ShopSalary;
