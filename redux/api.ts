import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/user';
import { IUserAuthData } from '../types/user';

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
  baseQuery: fetchBaseQuery({ baseUrl: `api/` }),
  endpoints: () => ({}),
});
