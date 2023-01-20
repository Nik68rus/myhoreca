import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import ownerSlice from './slices/ownerSlice';
import layoutSlice from './slices/layoutSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
    layout: layoutSlice,
    owner: ownerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
