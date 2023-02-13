import { IMovement } from './../../services/ItemService';
import { IItemInput } from './../../types/item';
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

    //история движений товара
    getMovements: builder.query<
      IMovement[],
      { itemId: number; shopId: number; from: string; to: string }
    >({
      query: ({ itemId, shopId, from, to }) =>
        `item/stat?shopId=${shopId}&itemId=${itemId}&from=${from}&to=${to}`,
    }),
  }),
});

export const {
  useCreateItemMutation,
  useGetItemsQuery,
  useEditItemMutation,
  useGetMovementsQuery,
} = itemApi;
