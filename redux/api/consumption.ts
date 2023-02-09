import { IConsumptionItem } from './../../models/consumptionItem';
import { IConsumption } from './../../models/consumption';
import {
  IConsumptionInput,
  IConsumptionWithItem,
  IConsumptionWithItemAndUser,
} from './../../types/item';
import { api } from '../api';

export interface IRecieptServerInfo {
  createdAt: string;
  items: (IConsumptionItem & { item: { title: string } })[];
}

export const consumptionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание расхода
    createConsumption: builder.mutation<IConsumption, IConsumptionInput>({
      query: (body) => ({
        url: 'consumption/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Consumption', 'Arrival'],
    }),

    //получение всех продаж магазина
    getConsumptions: builder.query<
      IConsumption[],
      { shopId: number; from: string; to: string }
    >({
      query: ({ shopId, from, to }) =>
        `consumption?shopId=${shopId}&from=${from}&to=${to}`,
      providesTags: ['Consumption'],
    }),

    //получение продаж магазина по категории
    getConsumptionsByCat: builder.query<
      IConsumptionWithItem[],
      { shopId: number; from: string; to: string; categoryId: number }
    >({
      query: ({ shopId, from, to, categoryId }) =>
        `consumption?shopId=${shopId}&from=${from}&to=${to}&categoryId=${categoryId}`,
      providesTags: ['Consumption'],
    }),

    //получение истории списаний или скидок
    getSpecConsumption: builder.query<
      IConsumptionWithItemAndUser[],
      {
        shopId: number;
        from: string;
        to: string;
        type: 'discount' | 'writeoff';
      }
    >({
      query: ({ shopId, from, to, type }) =>
        `consumption/spec?shopId=${shopId}&type=${type}&from=${from}&to=${to}`,
    }),

    //получение всех позиций чека
    getRecieptDetails: builder.query<IConsumptionWithItem[], number>({
      query: (consumptionId) => `consumption/${consumptionId}`,
      providesTags: ['Consumption'],
    }),

    //получение статистики продаж
    getStat: builder.query<
      { total: number; card: number; transfer: number; debt: number },
      { shopId: number; from: string; to: string }
    >({
      query: ({ shopId, from, to }) =>
        `consumption/stat?shopId=${shopId}&from=${from}&to=${to}`,
      providesTags: ['Consumption'],
    }),

    //получение последнего сегодня чека
    getLast: builder.query<IRecieptServerInfo | null, number>({
      query: (shopId) => `consumption/last?shopId=${shopId}`,
      providesTags: ['Consumption'],
    }),
  }),
});

export const {
  useCreateConsumptionMutation,
  useGetConsumptionsQuery,
  useGetConsumptionsByCatQuery,
  useGetRecieptDetailsQuery,
  useGetStatQuery,
  useGetLastQuery,
  useGetSpecConsumptionQuery,
} = consumptionApi;
