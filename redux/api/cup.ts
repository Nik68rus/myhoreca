import { ICup } from './../../models/cup';
import { api } from '../api';

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
  }),
});

export const {
  useCreateCupMutation,
  useGetCupsQuery,
  useEditCupMutation,
  useDeleteCupMutation,
} = cupApi;
