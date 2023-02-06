import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { useCreateCupMutation } from '../../../redux/api/cup';
import FormControl from '../../forms/FormControl';
import Spinner from '../../layout/Spinner';

const AddCupForm = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const [createCup, { isLoading, error, isSuccess }] = useCreateCupMutation();

  const createHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      setAdding(false);
      setTitle('');
    }
  }, [isSuccess]);

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {isLoading && <Spinner />}
      {adding ? (
        <form className="form" onSubmit={createHandler}>
          <div className="form__group">
            <FormControl
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="button button--icon"
              type="submit"
              aria-label="Добавить"
              onClick={() => createCup(title)}
            >
              <FaCheck />
            </button>
            <button
              className="button button--icon"
              aria-label="Отмена"
              type="button"
              onClick={() => {
                setAdding(false);
                setTitle('');
              }}
            >
              <FaTimes />
            </button>
          </div>
        </form>
      ) : (
        <button className="button button--icon" onClick={() => setAdding(true)}>
          <FaPlus />
        </button>
      )}
    </>
  );
};

export default React.memo(AddCupForm);
