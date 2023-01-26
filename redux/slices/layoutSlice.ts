import { Section, CashierSection } from './../../types/sections';
import { IShopData } from './../../types/shop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  activeSection: null | Section | CashierSection;
}

const initialState: LayoutState = {
  activeSection: Section.ITEMS,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setActiveSection: (
      state,
      action: PayloadAction<Section | CashierSection>
    ) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = layoutSlice.actions;

export default layoutSlice.reducer;
