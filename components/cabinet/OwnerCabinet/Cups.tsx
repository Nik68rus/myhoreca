import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { useGetCupsQuery } from '../../../redux/api/cup';
import Spinner from '../../layout/Spinner';
import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import AddCupForm from './AddCupForm';
import CupItem from './CupItem';

const Cups = () => {
  const { data, error, isLoading, isFetching } = useGetCupsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Card>
          {isFetching && <Spinner />}
          <Heading>Стаканчики</Heading>
          <ul className="list">
            {data?.map((cup) => (
              <CupItem key={cup.id} id={cup.id} title={cup.title} />
            ))}
          </ul>
          <AddCupForm />
        </Card>
      )}
    </>
  );
};

export default Cups;
