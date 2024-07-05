import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storeage';

export const JWT_PERSISTENT_STATE_KEY = 'userData';
export interface UserState {
  jwt: string | null;
}

export interface UserPersistedState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistedState>(JWT_PERSISTENT_STATE_KEY)?.jwt ?? null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    logout: (state) => {
      state.jwt = null;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
