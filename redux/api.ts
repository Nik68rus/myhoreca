import { IUserAuthData } from './../types/user';
import { setCookie } from './../helpers/cookies';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';
import { deleteCookie } from '../helpers/cookies';
import { resetAuth } from './slices/userSlice';

const baseQuery = fetchBaseQuery({ baseUrl: `/api/` });

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/user/refresh', api, extraOptions);
    if (refreshResult.data) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      const res = refreshResult.data as IUserAuthData;

      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      api.dispatch(resetAuth());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Employee',
    'Shop',
    'Category',
    'Item',
    'Arrival',
    'Consumption',
    'Discount',
    'Cup',
    'ItemCup',
    'Group',
  ],
  baseQuery: baseQueryWithReauth,
  // baseQuery,
  endpoints: () => ({}),
});
