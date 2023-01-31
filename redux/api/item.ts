import { IShopItem } from './../../models/shopItem';
import { IItemInput, IArrivalWithItem } from './../../types/item';
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
