import { IItem } from './../../models/item';
import { IConsumptionItem } from './../../models/consumptionItem';
import { IConsumption } from './../../models/consumption';
import { IConsumptionInput, IConsumptionWithItem } from './../../types/item';
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

    //получение всех позиций чека
    getRecieptDetails: builder.query<IConsumptionWithItem[], number>({
      query: (consumptionId) => `consumption/${consumptionId}`,
      providesTags: ['Consumption'],
    }),

    //получение статистики продаж за день
    getStat: builder.query<
      { total: number; card: number; transfer: number; debt: number },
      number
    >({
      query: (shopId) => `consumption/stat?shopId=${shopId}`,
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
} = consumptionApi;
