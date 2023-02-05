import { api } from '../api';

export const refreshApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //выход и удаление токена
    deleteToken: builder.mutation<string, void>({
      query: () => ({
        url: 'user/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useDeleteTokenMutation } = refreshApi;
