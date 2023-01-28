import {
  IDiscountRequestBody,
  IDiscountWithCategory,
} from './../../types/discount';
import { IDiscount } from './../../models/discount';
import { api } from '../api';

export const discountApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание скидки
    createDiscount: builder.mutation<IDiscount, IDiscountRequestBody>({
      query: (body) => ({
        url: 'discount/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Discount'],
    }),

    //получение всех скидок пространства
    getDiscounts: builder.query<IDiscountWithCategory[], void>({
      query: () => 'discount',
      providesTags: ['Discount'],
    }),

    //редактировать скидку
    editDiscount: builder.mutation<
      IDiscount,
      { discountId: number; value: number }
    >({
      query: ({ value, discountId }) => ({
        url: `discount/${discountId}`,
        method: 'PATCH',
        body: { value },
      }),
      invalidatesTags: ['Discount'],
    }),

    //удалить скидку
    deleteDiscount: builder.mutation<string, number>({
      query: (discountId) => ({
        url: `discount/${discountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Discount'],
    }),
  }),
});

export const {
  useCreateDiscountMutation,
  useGetDiscountsQuery,
  useEditDiscountMutation,
  useDeleteDiscountMutation,
} = discountApi;
