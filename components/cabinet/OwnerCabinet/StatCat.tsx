import React, { useCallback, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import Select from '../../forms/Select';
import Flatpickr from 'react-flatpickr';
import cx from 'classnames';
import { useAppSelector } from '../../../hooks/store';
import { useGetConsumptionsByCatQuery } from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import styles from './StatCat.module.scss';
import Heading from '../../ui/Heading';
import DatePicker from '../../DatePicker';

interface IStatItem {
  itemId: number;
  title: string;
  quantity: number;
}

const StatCat = () => {
  const [catId, setCatId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [items, setItems] = useState<IStatItem[]>([]);

  const { activeShop } = useAppSelector((store) => store.shop);

  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategoriesQuery();

  const { data, error, isSuccess, isFetching } = useGetConsumptionsByCatQuery(
    {
      shopId: activeShop?.id || 0,
      from: from.toISOString(),
      to: to.toISOString(),
      categoryId: catId || 0,
    },
    { skip: !activeShop || catId === null, refetchOnFocus: true }
  );

  const catSelectHandler = useCallback(
    (cat: { id: number; title: string } | null) => {
      setCatId(cat?.id || null);
    },
    []
  );

  useEffect(() => {
    if (data) {
      const adoptedData: IStatItem[] = [];
      data.forEach((sale) => {
        const index = adoptedData.findIndex(
          (statItem) => statItem.itemId === sale.item.id
        );
        if (index < 0) {
          adoptedData.push({
            itemId: sale.item.id,
            title: sale.item.title,
            quantity: sale.quantity,
          });
        } else {
          adoptedData[index].quantity += sale.quantity;
        }
      });
      setItems(adoptedData.sort((a, b) => a.title.localeCompare(b.title)));
    }
  }, [data]);

  useEffect(() => {
    if (categories?.length) {
      setCatId(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    handleRTKQError(catError);
    handleRTKQError(error);
  }, [catError, error]);

  return (
    <>
      {catLoading && <Spinner />}
      <div>
        <DatePicker
          onChange={(period) => {
            setFrom(period.start);
            setTo(period.end);
          }}
        />
        {categories && (
          <Select
            items={categories}
            label="Категория: "
            onSelect={catSelectHandler}
            selected={catId || null}
            className="mb-8"
          />
        )}

        {/* <div className={cx('form__group pb-8 mb-8', styles.filter)}>
          <div className="form__control">
            <label>Выберите дату</label>
            <Flatpickr
              value={date}
              options={{
                dateFormat: 'j F Y',
              }}
              onChange={(dates) => {
                setDate(dates[0]);
              }}
            />
          </div>
          <div className="form__control">
            <label>Выберите дату</label>
            <Flatpickr
              value={date}
              options={{
                dateFormat: 'j F Y',
              }}
              onChange={(dates) => {
                setDate(dates[0]);
              }}
            />
          </div>
          {categories && (
            <Select
              className="mb-2"
              items={categories}
              label="Категория: "
              onSelect={catSelectHandler}
              selected={catId || null}
            />
          )}
        </div> */}
        <Heading level={4} className="mb-5">
          Продано:
        </Heading>
        {isFetching ? (
          <Spinner block={true} />
        ) : (
          <ul className="list">
            {items.map((item) => (
              <li key={item.itemId} className={styles.line}>
                <span>{item.title}</span>
                <span className={styles.quantity}>* {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default StatCat;
