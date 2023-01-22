import { IItemInput } from './../../types/item';
import { IItem } from './../../models/item';
import { api } from '../api';
import { requestToBodyStream } from 'next/dist/server/body-streams';

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
    getItems: builder.query<IItem[], void>({
      query: () => 'item',
      providesTags: ['Item'],
    }),

    //редактирование товара
    editItem: builder.mutation<IItem, Partial<IItem>>({
      query: (body) => ({
        url: `item/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
});

export const { useCreateItemMutation, useGetItemsQuery, useEditItemMutation } =
  itemApi;
