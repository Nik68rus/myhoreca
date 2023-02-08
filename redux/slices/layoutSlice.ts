import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  menuOpen: boolean;
}

const initialState: LayoutState = {
  menuOpen: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
  },
});

export const { toggleMenu } = layoutSlice.actions;

export default layoutSlice.reducer;
