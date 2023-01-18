import { IItem } from './../../models/item';
import { api } from '../api';

export const itemApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание товара
    createItem: builder.mutation<IItem, string>({
      query: (body) => ({
        url: 'item/',
        method: 'POST',
        body,
      }),
    }),

    //получение всех товаров пространства
    getItems: builder.query<IItem[], void>({
      query: () => 'item',
    }),
  }),
});

export const { useCreateItemMutation, useGetItemsQuery } = itemApi;
