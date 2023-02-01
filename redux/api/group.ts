import { IGroup } from './../../models/group';
import { api } from '../api';

export interface IGroupWithCat extends IGroup {
  category: {
    title: string;
  };
}

export const groupApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //создание группы
    createGroup: builder.mutation<
      IGroup,
      { categoryId: number; title: string }
    >({
      query: (body) => ({
        url: 'group/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Group'],
    }),

    //получение всех групп пространства
    getGroups: builder.query<IGroupWithCat[], void>({
      query: () => 'group',
      providesTags: ['Group'],
    }),

    //редактировать группу
    editGroup: builder.mutation<
      IGroup,
      { id: number; categoryId: number; title: string }
    >({
      query: ({ title, id, categoryId }) => ({
        url: `group/${id}`,
        method: 'PATCH',
        body: { title, categoryId },
      }),
      invalidatesTags: ['Group'],
    }),

    //удалить группу
    deleteGroup: builder.mutation<string, number>({
      query: (id) => ({
        url: `group/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useEditGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
