import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRecieptItem {
  itemId: number;
  categoryId: number;
  title: string;
  price: number;
  toGo: boolean;
}

export interface IRecieptPosition extends IRecieptItem {
  line: number;
}

export interface RecieptState {
  items: IRecieptPosition[];
  total: number;
}

const initialState: RecieptState = {
  items: [],
  total: 0,
};

const recieptSlice = createSlice({
  name: 'reciept',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IRecieptItem>) => {
      const item = {
        ...action.payload,
        line: state.items.at(-1) ? state.items.at(-1)!.line + 1 : 1,
      };
      state.items = [...state.items, item];
      state.total += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<IRecieptPosition>) => {
      state.items = state.items.filter(
        (item) => item.line !== action.payload.line
      );
      state.total -= action.payload.price;
    },
    changeToGo: (state, action: PayloadAction<IRecieptPosition>) => {
      state.items = state.items.map((item) =>
        item.line === action.payload.line ? { ...item, toGo: !item.toGo } : item
      );
    },
    removeAll: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const selectItemCount = (id: number) => (state: RootState) =>
  state.reciept.items.filter((item) => item.itemId === id).length;

export const { addItem, removeItem, changeToGo, removeAll } =
  recieptSlice.actions;

export default recieptSlice.reducer;
