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
      { shopId: number; date: string }
    >({
      query: ({ shopId, date }) => `consumption?shopId=${shopId}&date=${date}`,
      providesTags: ['Consumption'],
    }),

    //получение всех позиций чека
    getRecieptDetails: builder.query<IConsumptionWithItem[], number>({
      query: (consumptionId) => `consumption/${consumptionId}`,
      providesTags: ['Consumption'],
    }),

    //получение статистики продаж за день
    getStat: builder.query<
      { total: number; card: number; transfer: number },
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
  useGetRecieptDetailsQuery,
  useGetStatQuery,
  useGetLastQuery,
} = consumptionApi;
