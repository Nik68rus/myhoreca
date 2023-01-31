import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRecieptItem {
  itemId: number;
  categoryId: number;
  cupId: number | null;
  title: string;
  price: number;
}

export interface IRecieptPosition extends IRecieptItem {
  discount: number;
  quantity: number;
  toGo: boolean;
  withSyrup: boolean;
  line: number;
}

export interface ILastReciept {
  createdAt: string;
  items: {
    id: number;
    title: string;
    quantity: number;
    price: number;
    toGo: boolean;
    withSyrup: boolean;
  }[];
}

export interface RecieptState {
  items: IRecieptPosition[];
  discount: boolean;
  isToGo: boolean;
  total: number;
  last: ILastReciept | null;
  syrup: IRecieptItem | null;
}

const initialState: RecieptState = {
  items: [],
  discount: false,
  total: 0,
  isToGo: false,
  last: null,
  syrup: null,
};

const getPrice = (price: number, discount: number, apply: boolean) => {
  let result = price;
  if (apply) {
    result = price * discount;
  }
  return Math.ceil(result);
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
        (si) =>
          si.itemId === action.payload.item.itemId && !si.toGo && !si.withSyrup
      );
      if (inStateIndex < 0) {
        state.items.push({
          line: state.items.length + 1,
          ...action.payload.item,
          discount: action.payload.discount,
          quantity: 1,
          toGo: false,
          withSyrup: false,
        });
      } else {
        state.items[inStateIndex].quantity++;
      }
    },
    removeItem: (state, action: PayloadAction<IRecieptPosition>) => {
      const inStateIndex = state.items.findIndex(
        (si) => si.line === action.payload.line
      );
      state.items[inStateIndex].quantity--;
      if (state.items[inStateIndex].quantity === 0) {
        state.items = state.items
          .filter((item) => item.line !== action.payload.line)
          .map((item, i) => ({ ...item, line: i + 1 }));
      }
    },
    removeLine: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.line === action.payload);
      if (item) {
        state.items = state.items
          .filter((item) => item.line !== action.payload)
          .map((item, i) => ({ ...item, line: i + 1 }));
      }
    },
    changeItemToGo: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.line === action.payload ? { ...item, toGo: !item.toGo } : item
      );

      if (
        state.items.filter((item) => item.cupId).filter((item) => !item.toGo)
          .length === 0
      ) {
        state.isToGo = true;
      } else {
        state.isToGo = false;
      }
    },
    removeAll: (state) => {
      state.items = [];
      state.total = 0;
    },
    setDiscount: (state, action: PayloadAction<boolean>) => {
      state.discount = action.payload;
    },
    setAllToGo: (state, action: PayloadAction<boolean>) => {
      state.isToGo = action.payload;
      state.items = state.items.map((item) => {
        return { ...item, toGo: item.cupId ? action.payload : false };
      });
    },
    setLastReciept: (state, action: PayloadAction<ILastReciept | null>) => {
      state.last = action.payload;
    },
    setSyrup: (state, action: PayloadAction<IRecieptItem>) => {
      state.syrup = action.payload;
    },
    toggleSyrup: (state, action: PayloadAction<number>) => {
      if (!state.syrup) return;

      state.items[action.payload - 1].withSyrup =
        !state.items[action.payload - 1].withSyrup;
    },
    calculateTotal: (state) => {
      if (state.syrup) {
        const syrupCount = state.items
          .filter((item) => item.withSyrup)
          .reduce((acc, item) => acc + item.quantity, 0);
        const syrupPosition = state.items.findIndex(
          (item) => item.itemId === state.syrup?.itemId
        );

        switch (true) {
          case syrupCount > 0 && syrupPosition >= 0:
            state.items[syrupPosition].quantity = syrupCount;
            break;

          case syrupCount === 0 && syrupPosition >= 0:
            state.items = state.items.filter((item, i) => i !== syrupPosition);
            break;

          case syrupCount > 0 && syrupPosition < 0:
            state.items.push({
              line: state.items.length + 1,
              ...state.syrup,
              discount: 1,
              quantity: syrupCount,
              toGo: false,
              withSyrup: false,
            });
            break;
        }
      }

      state.total = state.items.reduce(
        (acc, item) =>
          acc +
          getPrice(item.price, item.discount, state.discount) * item.quantity,
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
  changeItemToGo,
  removeAll,
  setDiscount,
  setAllToGo,
  setLastReciept,
  setSyrup,
  toggleSyrup,
  calculateTotal,
} = recieptSlice.actions;

export default recieptSlice.reducer;
