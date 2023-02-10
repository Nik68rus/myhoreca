import React, { useCallback, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../../redux/api/category';
import Select from '../../forms/Select';
import cx from 'classnames';
import { useGetConsumptionsByCatQuery } from '../../../redux/api/consumption';
import { handleRTKQError } from '../../../helpers/error';
import Spinner from '../../layout/Spinner';
import styles from './StatCat.module.scss';
import Heading from '../../ui/Heading';
import { IShopData } from '../../../types/shop';

interface IStatItem {
  itemId: number;
  title: string;
  quantity: number;
}

enum SortType {
  ABC = 'abc',
  QTY = 'qty',
}

interface Props {
  shop: IShopData | null;
  from: Date;
  to: Date;
}

const StatCat = ({ shop, from, to }: Props) => {
  const [catId, setCatId] = useState<number | null>(null);
  const [items, setItems] = useState<IStatItem[]>([]);
  const [sorting, setSorting] = useState(SortType.ABC);

  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategoriesQuery();

  const { data, error, isSuccess, isFetching } = useGetConsumptionsByCatQuery(
    {
      shopId: shop?.id || 0,
      from: from.toISOString(),
      to: to.toISOString(),
      categoryId: catId || 0,
    },
    { skip: !shop || catId === null, refetchOnFocus: true }
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
      setItems(
        adoptedData.sort((a, b) =>
          sorting === SortType.ABC
            ? a.title.localeCompare(b.title)
            : b.quantity - a.quantity
        )
      );
    }
  }, [data, sorting]);

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
      <div className={styles.wrapper}>
        {categories && (
          <Select
            items={categories}
            label="Категория: "
            onSelect={catSelectHandler}
            selected={catId || null}
            className={cx('mb-8', styles.select)}
          />
        )}

        <Heading level={4} className="mb-5">
          Продано:
        </Heading>
        {isFetching ? (
          <Spinner block={true} />
        ) : (
          <ul className="list">
            {items.length ? (
              <>
                <li className={styles.line}>
                  <span
                    className={cx('label', styles.columnHead)}
                    onClick={() => setSorting(SortType.ABC)}
                  >
                    Наименование
                  </span>
                  <span
                    className={cx('label', styles.quantity, styles.columnHead)}
                    onClick={() => setSorting(SortType.QTY)}
                  >
                    кол-во
                  </span>
                </li>
                {items.map((item) => (
                  <li key={item.itemId} className={styles.line}>
                    <span>{item.title}</span>
                    <span className={styles.quantity}>* {item.quantity}</span>
                  </li>
                ))}
              </>
            ) : (
              <li>Ничего не найдено!</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default StatCat;
