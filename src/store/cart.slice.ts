import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storeage';

export const CART_PERSISTENT_STATE_KEY = 'cartData';
export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE_KEY) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.count === 1) {
          state.items = state.items.filter((item) => item.id !== action.payload);
          return;
        } else {
          state.items.map((item) => {
            if (item.id === action.payload) {
              return { ...item, count: (item.count -= 1) };
            }
            return item;
          });
          return;
        }
      }
    },
    addItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) {
        state.items.push({ id: action.payload, count: 1 });
      } else {
        state.items = state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
