import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { handleRTKQError } from '../../../helpers/error';
import { useCreateCupMutation, useGetCupsQuery } from '../../../redux/api/cup';
import FormControl from '../../forms/FormControl';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import CupItem from './CupItem';

const Cups = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const { data, isLoading, error, isFetching } = useGetCupsQuery();
  const [createCup, { isLoading: creating, error: createError, isSuccess }] =
    useCreateCupMutation();

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(createError);
  }, [error, createError]);

  useEffect(() => {
    if (isSuccess) {
      setAdding(false);
      setTitle('');
    }
  }, [isSuccess]);

  const createHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {(creating || isFetching) && <Spinner />}
      <Card>
        <Heading>Стаканчики</Heading>
        {isLoading ? (
          <Spinner block={true} />
        ) : (
          <ul className="list">
            {data?.map((cup) => (
              <CupItem key={cup.id} id={cup.id} title={cup.title} />
            ))}
          </ul>
        )}
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
              >
                <FaTimes />
              </button>
            </div>
          </form>
        ) : (
          <button
            className="button button--icon"
            onClick={() => setAdding(true)}
          >
            <FaPlus />
          </button>
        )}
      </Card>
    </>
  );
};

export default Cups;
