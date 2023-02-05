import { Section, CashierSection } from './../../types/sections';
import { IShopData } from './../../types/shop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  activeSection: null | Section | CashierSection;
  menuOpen: boolean;
}

const initialState: LayoutState = {
  activeSection: Section.ITEMS,
  menuOpen: false,
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
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
  },
});

export const { setActiveSection, toggleMenu } = layoutSlice.actions;

export default layoutSlice.reducer;
