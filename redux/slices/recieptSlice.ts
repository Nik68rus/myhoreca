import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRecieptItem {
  itemId: number;
  categoryId: number;
  title: string;
  price: number;
}

export interface IRecieptPosition extends IRecieptItem {
  discount: number;
  quantity: number;
  toGo: boolean;
}

export interface RecieptState {
  items: IRecieptPosition[];
  discount: boolean;
  total: number;
}

const initialState: RecieptState = {
  items: [],
  discount: false,
  total: 0,
};

const getPrice = (price: number, discount: number, apply: boolean) => {
  let result = price;
  if (apply) {
    result = price * discount;
  }
  return result;
};

const recieptSlice = createSlice({
  name: 'reciept',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ item: IRecieptItem; discount: number }>
    ) => {
      const inStateIndex = state.items.findIndex(
        (si) => si.itemId === action.payload.item.itemId
      );
      if (inStateIndex < 0) {
        state.items.push({
          ...action.payload.item,
          discount: action.payload.discount,
          quantity: 1,
          toGo: false,
        });
      } else {
        state.items[inStateIndex].quantity++;
      }
      state.total += getPrice(
        action.payload.item.price,
        action.payload.discount,
        state.discount
      );
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
      state.total -= getPrice(
        action.payload.price,
        action.payload.discount,
        state.discount
      );
    },
    removeLine: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item) {
        state.items = state.items.filter(
          (item) => item.itemId !== action.payload
        );
        state.total -=
          getPrice(item.price, item.discount, state.discount) * item.quantity;
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
    setDiscount: (state, action: PayloadAction<boolean>) => {
      state.discount = action.payload;
      state.total = state.items.reduce(
        (acc, item) =>
          acc +
          getPrice(item.price, item.discount, action.payload) * item.quantity,
        0
      );
    },
  },
});

export const selectItemCount = (id: number) => (state: RootState) =>
  state.reciept.items.find((item) => item.itemId === id)?.quantity || 0;

export const {
  addItem,
  removeLine,
  removeItem,
  changeToGo,
  removeAll,
  setDiscount,
} = recieptSlice.actions;

export default recieptSlice.reducer;
