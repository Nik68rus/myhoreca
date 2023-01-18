import { IShopData } from './../../types/shop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OwnerState {
  activeShop: null | IShopData;
}

const initialState: OwnerState = {
  activeShop: null,
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setActiveShop: (state, action: PayloadAction<IShopData>) => {
      state.activeShop = action.payload;
    },

    resetActiveShop: (state) => {
      state.activeShop = null;
    },
  },
});

export const { setActiveShop, resetActiveShop } = ownerSlice.actions;

export default ownerSlice.reducer;
