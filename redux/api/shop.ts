import { IShop } from './../../models/shop';
import { api } from '../api';

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
  }),
});

export const { useCreateShopMutation, useGetShopsQuery } = shopApi;
