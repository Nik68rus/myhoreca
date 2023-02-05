import { IUserAuthData } from './../../types/user';
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
    //обновлеине токенов
    refreshTokens: builder.query<IUserAuthData, void>({
      query: () => 'user/refresh',
    }),
  }),
});

export const { useDeleteTokenMutation, useRefreshTokensQuery } = refreshApi;
