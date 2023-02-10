import React, { useEffect, useState } from 'react';
import { handleRTKQError } from '../../../helpers/error';
import { IItem } from '../../../models/item';
import { useGetItemsQuery } from '../../../redux/api/item';
import Select from '../../forms/Select';

interface Props {
  onSelect: (id: number | null) => void;
  className?: string;
}

const ItemSelector = ({ onSelect, className }: Props) => {
  const [items, setItems] = useState<IItem[]>([]);
  const { data, error } = useGetItemsQuery();

  useEffect(() => {
    handleRTKQError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      setItems(data.filter((i) => i.isCountable));
    }
  }, [data]);

  return (
    <Select
      label="Товар"
      items={items}
      onSelect={(choice) => onSelect(choice?.id || null)}
      className={className}
    />
  );
};

export default ItemSelector;
