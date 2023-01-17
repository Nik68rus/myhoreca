import React, { useState, useEffect } from 'react';
import itemAPI from '../../../api/itemAPI';
import { handleError } from '../../../helpers/error';
import { useAppSelector } from '../../../hooks/store';
import { IItem } from '../../../models/item';
import { IItemInput } from '../../../types/item';
import Spinner from '../../layout/Spinner';
import AddItemModal from '../../modals/AddItemModal';

const Items = () => {
  const [itemModal, setItemModal] = useState(false);
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { authData } = useAppSelector((store) => store.user);

  const addItemHandler = async (itemData: IItemInput) => {
    const createdItem = await itemAPI.createItem(itemData);
    return createdItem;
  };

  useEffect(() => {
    const getData = async () => {
      if (authData) {
        try {
          const data = await itemAPI.getItems(authData.id);
          setItems(data);
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getData();
  }, [authData]);

  return (
    <div>
      {loading && <Spinner />}
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : null}

      <button className="button" onClick={() => setItemModal(true)}>
        Добавить товар
      </button>
      {itemModal && (
        <AddItemModal
          onClose={() => setItemModal(false)}
          onSuccess={addItemHandler}
        />
      )}
    </div>
  );
};

export default Items;
