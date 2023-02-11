import { ICup } from './../../models/cup';
import { api } from '../api';
import { ICupHistory } from '../../services/CupService';

export const cupApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание тары
    createCup: builder.mutation<ICup, string>({
      query: (title) => ({
        url: 'cup/',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Cup'],
    }),

    //получение всей тары пространства
    getCups: builder.query<ICup[], void>({
      query: () => 'cup',
      providesTags: ['Cup'],
    }),

    //редактировать тару
    editCup: builder.mutation<ICup, { cupId: number; title: string }>({
      query: ({ title, cupId }) => ({
        url: `cup/${cupId}`,
        method: 'PATCH',
        body: { title },
      }),
      invalidatesTags: ['Cup'],
    }),

    //удалить тару
    deleteCup: builder.mutation<string, number>({
      query: (cupId) => ({
        url: `cup/${cupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cup'],
    }),

    //статистика
    getCupStat: builder.query<
      ICupHistory[],
      { shopId: number; from: string; to: string }
    >({
      query: ({ shopId, from, to }) =>
        `cup/stat?shopId=${shopId}&from=${from}&to=${to}`,
    }),
  }),
});

export const {
  useCreateCupMutation,
  useGetCupsQuery,
  useEditCupMutation,
  useDeleteCupMutation,
  useGetCupStatQuery,
} = cupApi;
