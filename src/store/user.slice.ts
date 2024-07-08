import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storeage';
import { API } from '../helpers/API';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRsponse } from '../interfaces/auth.interfaces';

export const JWT_PERSISTENT_STATE_KEY = 'userData';
export interface UserState {
  jwt: string | null;
  loginStaate: null | rejected;
}

export interface UserPersistedState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistedState>(JWT_PERSISTENT_STATE_KEY)?.jwt ?? null,
  loginStaate: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post<LoginRsponse>(`${API}/auth/login`, params);

    return data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginRsponse>) => {
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, error) => {
      console.log(error);
      state.loginStaate = 'rejected';
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
