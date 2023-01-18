import { userDataDto } from './../../helpers/dto';
import { TokenPayload } from './../../types/user';
import { IUserAuthData } from '../../types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user';

export interface UserState {
  loading: boolean;
  authData: TokenPayload | null;
}

const initialState: UserState = {
  loading: true,
  authData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TokenPayload>) => {
      state.authData = action.payload;
      state.loading = false;
    },
    resetAuth: (state) => {
      state.authData = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.checkUserAuth.matchFulfilled,
      (state, { payload }) => {
        state.authData = userDataDto(payload);
        state.loading = false;
      }
    ),
      builder.addMatcher(
        userApi.endpoints.checkUserAuth.matchRejected,
        (state) => {
          state.authData = null;
          state.loading = false;
        }
      );
  },
});

export const { setAuth, resetAuth } = userSlice.actions;

export default userSlice.reducer;
