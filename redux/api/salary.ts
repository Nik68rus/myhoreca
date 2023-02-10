import { ISalary } from './../../models/salary';
import { api } from '../api';

export const salaryApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание или редактирование зарплаты
    createEditSalary: builder.mutation<
      ISalary,
      { shopId: number; amount: number }
    >({
      query: (body) => ({
        url: 'salary',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Salary'],
    }),

    //получение зарплаты на точке
    getSalary: builder.query<ISalary, number>({
      query: (shopId) => `salary?shopId=${shopId}`,
      providesTags: ['Salary'],
    }),
  }),
});

export const { useCreateEditSalaryMutation, useGetSalaryQuery } = salaryApi;
