import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

export interface UserPersistedState {
  jwt: string | null;
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
