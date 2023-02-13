import { IGroup } from './../../models/group';
import { IShop } from './../../models/shop';
import { api } from '../api';
import { IMenuItem } from '../../services/ShopService';

export interface IMenu {
  items: IMenuItem[];
  groups: IGroup[];
}

export const shopApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание точки продаж
    createShop: builder.mutation<IShop, string>({
      query: (title) => ({
        url: 'shop/',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Shop'],
    }),

    //получение всех точек продаж пространства
    getShops: builder.query<IShop[], void>({
      query: () => 'shop',
      providesTags: ['Shop'],
    }),

    //получение актуального меню торговой точки
    getMenu: builder.query<IMenu, number>({
      query: (shopId) => `shop/${shopId}`,
    }),
  }),
});

export const { useCreateShopMutation, useGetShopsQuery, useGetMenuQuery } =
  shopApi;
