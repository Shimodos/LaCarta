import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './storeage';
import { API } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRsponse } from '../interfaces/auth.interfaces';
import { Profile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE_KEY = 'userData';
export interface UserState {
  jwt: string | null;
  loginError?: string | null;
  registerError?: string | null;
  profile?: Profile;
}

export interface UserPersistedState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistedState>(JWT_PERSISTENT_STATE_KEY)?.jwt ?? null,
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginRsponse>(`${API}/auth/login`, {
        email: params.email,
        password: params.password,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  },
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getprofile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${API}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return data;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginRsponse>(`${API}/auth/register`, {
        email: params.email,
        password: params.password,
        name: params.name,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = action.error.message;
      console.log(action);
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerError = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
