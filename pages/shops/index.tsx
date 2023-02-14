import { GetStaticProps } from 'next';
import React from 'react';
import ShopList from '../../components/guest/ShopList';
import { handleServerError } from '../../helpers/error';
import { IShop } from '../../models/shop';
import ShopService from '../../services/ShopService';

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
  let shops: IShop[];

  try {
    const data = await ShopService.getShops();
    shops = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    shops = [];
  }

  return {
    props: {
      shops,
    },
    revalidate: 60 * 60,
  };
};

export default ShopListPage;
