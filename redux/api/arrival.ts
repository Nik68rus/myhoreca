import { IShopItem } from './../../models/shopItem';
import { IArrivalInput, IArrivalWithItem } from './../../types/item';
import { api } from '../api';

export const arrivalApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание товара
    createArrival: builder.mutation<IShopItem, IArrivalInput>({
      query: (body) => ({
        url: 'arrival/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Arrival'],
    }),

    //получение всех товаров пространства
    getArrivals: builder.query<IShopItem[], number>({
      query: (shopId) => `arrival?shopId=${shopId}`,
      providesTags: ['Arrival'],
    }),
  }),
});

export const { useCreateArrivalMutation, useGetArrivalsQuery } = arrivalApi;
