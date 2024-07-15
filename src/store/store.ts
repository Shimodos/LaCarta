import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE_KEY } from './user.slice';
import cartSlice, { CART_PERSISTENT_STATE_KEY } from './cart.slice';
import { saveState } from './storeage';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE_KEY);
  saveState(store.getState().cart, CART_PERSISTENT_STATE_KEY);
  // saveState(store.getState().user.jwt, JWT_PERSISTENT_STATE_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
