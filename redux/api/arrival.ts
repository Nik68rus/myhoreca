import { IArrival } from './../../models/arrival';
import { IShopItem } from './../../models/shopItem';
import { IArrivalInput, IArrivalWithItem } from './../../types/item';
import { api } from '../api';

export const arrivalApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание позиции
    createArrival: builder.mutation<IShopItem, IArrivalInput>({
      query: (body) => ({
        url: 'arrival/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Arrival'],
    }),

    //получение всех позиций магазина
    getArrivals: builder.query<IArrivalWithItem[], number>({
      query: (shopId) => `arrival?shopId=${shopId}`,
      providesTags: ['Arrival'],
    }),

    //изменение цены
    editPrice: builder.mutation<IShopItem, Partial<IShopItem>>({
      query: (body) => ({
        url: `arrival/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Arrival'],
    }),

    //удаление позиции из меню (только для позиций с учетом не по количеству)
    deletePosition: builder.mutation<IShopItem, number>({
      query: (id) => ({
        url: `arrival/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Arrival'],
    }),

    //получить сироп для точки
    getSyrup: builder.query<IArrivalWithItem | null, number>({
      query: (shopId) => `arrival/syrup?shopId=${shopId}`,
      providesTags: ['Arrival'],
    }),

    //цена последнего поступления товара
    getLastPrice: builder.query<number, { shopId: number; itemId: number }>({
      query: ({ shopId, itemId }) =>
        `arrival/price?shopId=${shopId}&itemId=${itemId}`,
      providesTags: ['Arrival'],
    }),
  }),
});

export const {
  useCreateArrivalMutation,
  useGetArrivalsQuery,
  useEditPriceMutation,
  useDeletePositionMutation,
  useGetSyrupQuery,
  useGetLastPriceQuery,
} = arrivalApi;
