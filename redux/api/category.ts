import { ICategory } from './../../models/category';
import { api } from '../api';

export const itemApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание категории
    createCategory: builder.mutation<ICategory, string>({
      query: (title) => ({
        url: 'category/',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Category'],
    }),

    //получение всех категорий пространства
    getCategories: builder.query<ICategory[], void>({
      query: () => 'category',
      providesTags: ['Category'],
    }),

    //редактировать категорию
    editCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (cat) => ({
        url: `category/${cat.id}`,
        method: 'PATCH',
        body: cat,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useEditCategoryMutation,
} = itemApi;
