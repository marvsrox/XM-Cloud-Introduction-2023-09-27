/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { DecodedToken, Tokens } from 'ordercloud-javascript-sdk';
import parseJwt from '../../utils/parseJwt';
import login from './login';
import logout from './logout';
import authAnonymous from './authAnonymous';

export interface OcAuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  decodedToken?: DecodedToken;
  isAnonymous: boolean;
  error?: SerializedError;
  loading: boolean;
  initialized: boolean;
}

const initialState: OcAuthState = {
  isAuthenticated: false,
  isAdmin: false,
  isAnonymous: true,
  loading: false,
  initialized: false,
};

const ocAuthSlice = createSlice({
  name: 'ocAuth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const initialAccessToken = Tokens.GetAccessToken();
      let isAnonymous = true;
      let isAdmin = false;
      let decodedToken: DecodedToken;

      if (initialAccessToken) {
        decodedToken = parseJwt(initialAccessToken) as DecodedToken;
        isAnonymous = !!decodedToken.orderid;
        isAdmin = decodedToken.usrtype === 'admin';
      }

      state.isAuthenticated = !!initialAccessToken;
      state.isAnonymous = isAnonymous;
      state.isAdmin = isAdmin;
      state.decodedToken = decodedToken;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    // LOGIN CASES
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAnonymous = false;
      state.isAuthenticated = true;
      state.decodedToken = parseJwt(action.payload.access_token);
      state.isAdmin = state.decodedToken.usrtype === 'admin';
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error;
      state.isAuthenticated = false;
      state.loading = false;
    });

    // LOGOUT CASES
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.decodedToken = undefined;
      state.isAuthenticated = false;
      state.isAnonymous = true;
      state.error = undefined;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAnonymous = true;
      state.isAdmin = false;
      state.isAuthenticated = false;
      state.decodedToken = action.payload ? parseJwt(action.payload.access_token) : undefined;
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    // ANONYMOUS LOGIN CASES
    builder.addCase(authAnonymous.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authAnonymous.fulfilled, (state, action) => {
      state.isAnonymous = true;
      state.isAdmin = false;
      state.isAuthenticated = true;
      state.decodedToken = action.payload ? parseJwt(action.payload.access_token) : undefined;
      state.loading = false;
    });
  },
});

export const { initializeAuth } = ocAuthSlice.actions;

export default ocAuthSlice.reducer;
