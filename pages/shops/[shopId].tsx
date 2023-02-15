import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import ShopMenu from '../../components/guest/ShopMenu';
import { IGroup } from '../../models/group';
import { IShop } from '../../models/shop';
import { IMenu } from '../../redux/api/shop';
import GroupService from '../../services/GroupService';
import ShopService, { IMenuItem } from '../../services/ShopService';

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
    const itemsResponse = await ShopService.getMenu(+shopId);
    const groupsResponse = await GroupService.getShopGroups(+shopId);
    items = JSON.parse(JSON.stringify(itemsResponse));
    groups = JSON.parse(JSON.stringify(groupsResponse));
  } catch (err) {
    items = [];
    groups = [];
  }

  return {
    props: {
      items,
      groups,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths = async () => {
  let shops: IShop[];
  try {
    const data = await ShopService.getShops();
    shops = JSON.parse(JSON.stringify(data));
  } catch (error) {
    shops = [];
  }

  const paths = shops.map((shop) => ({
    params: { shopId: shop.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ShopMenuPage;
