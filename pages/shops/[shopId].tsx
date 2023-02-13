import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import ShopMenu from '../../components/guest/ShopMenu';
import { IGroup } from '../../models/group';
import { IShop } from '../../models/shop';
import { IMenu } from '../../redux/api/shop';
import { IMenuItem } from '../../services/ShopService';

interface Props {
  items: IMenuItem[];
  groups: IGroup[];
}

interface Params extends ParsedUrlQuery {
  shopId: string;
}

const ShopMenuPage = ({ items, groups }: Props) => {
  return (
    <section className="container pt-6 pb-6">
      {items.length ? (
        <ShopMenu items={items} groups={groups} />
      ) : (
        <p>Тут пока ничего нет!</p>
      )}
    </section>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { shopId } = context.params!;
  let items: IMenuItem[];
  let groups: IGroup[];

  try {
    const response = await fetch(`${process.env.APP_URL}/api/shop/${shopId}`);
    const menu: IMenu = await response.json();
    items = menu.items;
    groups = menu.groups;
  } catch (err) {
    items = [];
    groups = [];
  }

  try {
  } catch (error) {}
  return {
    props: {
      items,
      groups,
      revalidate: 60 * 60,
    },
  };
};

export const getStaticPaths = async () => {
  let data: IShop[];
  try {
    const response = await fetch(`${process.env.APP_URL}/api/shop/list`);
    data = (await response.json()) as IShop[];
  } catch (error) {
    data = [];
  }

  const paths = data.map((shop) => ({
    params: { shopId: shop.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ShopMenuPage;
