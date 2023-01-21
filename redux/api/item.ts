import { IItemInput, IItemWithCategory } from './../../types/item';
import { IItem } from './../../models/item';
import { api } from '../api';

export const itemApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание товара
    createItem: builder.mutation<IItem, IItemInput>({
      query: (body) => ({
        url: 'item/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Item'],
    }),

    //получение всех товаров пространства
    getItems: builder.query<IItemWithCategory[], void>({
      query: () => 'item',
      providesTags: ['Item'],
    }),
  }),
});

export const { useCreateItemMutation, useGetItemsQuery } = itemApi;
