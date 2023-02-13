import { GetStaticProps } from 'next';
import React from 'react';
import ShopList from '../../components/guest/ShopList';
import { handleServerError } from '../../helpers/error';
import { IShop } from '../../models/shop';

interface Props {
  shops: IShop[];
}

const ShopListPage = ({ shops }: Props) => {
  return (
    <section className="container">
      <ShopList shops={shops} />
    </section>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let data: IShop[];

  try {
    const response = await fetch(`${process.env.APP_URL}/api/shop/list`);
    data = (await response.json()) as IShop[];
  } catch (error) {
    data = [];
  }

  return {
    props: {
      shops: data,
    },
    revalidate: 60 * 60,
  };
};

export default ShopListPage;
