import React, { useState, useEffect } from 'react';
import { useGetItemsQuery } from '../../../redux/api/item';
import Spinner from '../../layout/Spinner';
import AddItemModal from '../../modals/AddItemModal';
import Card from '../../ui/Card';

const Items = () => {
  const [itemModal, setItemModal] = useState(false);

  const { data: items, isLoading } = useGetItemsQuery();

  return (
    <>
      {isLoading && <Spinner block={true} />}
      {!isLoading && (
        <Card>
          {items && items.length ? (
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          ) : null}

          <button className="button" onClick={() => setItemModal(true)}>
            Добавить товар
          </button>
          {itemModal && <AddItemModal onClose={() => setItemModal(false)} />}
        </Card>
      )}
    </>
  );
};

export default Items;
