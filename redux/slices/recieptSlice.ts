import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRecieptItem {
  itemId: number;
  categoryId: number;
  title: string;
  price: number;
}

export interface IRecieptPosition extends IRecieptItem {
  quantity: number;
  toGo: boolean;
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
      const inStateIndex = state.items.findIndex(
        (si) => si.itemId === action.payload.itemId
      );
      if (inStateIndex < 0) {
        state.items.push({ ...action.payload, quantity: 1, toGo: false });
      } else {
        state.items[inStateIndex].quantity++;
      }
      state.total += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<IRecieptPosition>) => {
      const inStateIndex = state.items.findIndex(
        (si) => si.itemId === action.payload.itemId
      );
      state.items[inStateIndex].quantity--;
      if (state.items[inStateIndex].quantity === 0) {
        state.items = state.items.filter(
          (item) => item.itemId !== action.payload.itemId
        );
      }
      state.total -= action.payload.price;
    },
    removeLine: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item) {
        state.items = state.items.filter(
          (item) => item.itemId !== action.payload
        );
        state.total -= item.price * item.quantity;
      }
    },
    changeToGo: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.itemId === action.payload ? { ...item, toGo: !item.toGo } : item
      );
    },
    removeAll: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const selectItemCount = (id: number) => (state: RootState) =>
  state.reciept.items.find((item) => item.itemId === id)?.quantity || 0;

export const { addItem, removeLine, removeItem, changeToGo, removeAll } =
  recieptSlice.actions;

export default recieptSlice.reducer;
