import { IConsumption } from './../../models/consumption';
import { IConsumptionInput } from './../../types/item';
import { api } from '../api';

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
    getSales: builder.query<IConsumption[], number>({
      query: (shopId) => `consumption?shopId=${shopId}`,
      providesTags: ['Consumption'],
    }),
  }),
});

export const { useCreateConsumptionMutation, useGetSalesQuery } =
  consumptionApi;
