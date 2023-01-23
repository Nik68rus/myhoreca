import { IShopData } from '../../types/shop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShopState {
  activeShop: null | IShopData;
}

const initialState: ShopState = {
  activeShop: null,
};

const shopSlice = createSlice({
  name: 'shop',
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

export const { setActiveShop, resetActiveShop } = shopSlice.actions;

export default shopSlice.reducer;
