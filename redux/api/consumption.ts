import { IConsumption } from './../../models/consumption';
import { IConsumptionInput, IWriteOff } from './../../types/item';
import { api } from '../api';

export const consumptionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание продажи
    createSale: builder.mutation<IConsumption, IConsumptionInput>({
      query: (body) => ({
        url: 'consumption/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Consumption', 'Arrival'],
    }),

    //создание списания
    createWriteoff: builder.mutation<IConsumption, IWriteOff>({
      query: (body) => ({
        url: 'consumption/writeoff',
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

export const {
  useCreateSaleMutation,
  useCreateWriteoffMutation,
  useGetSalesQuery,
} = consumptionApi;
