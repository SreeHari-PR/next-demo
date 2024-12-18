import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from './store';

export interface User {
  id: string;
  first_name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null; 
  token: string|null; 
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addUser:(state,action)=>{
      state.user = action.payload ;
      state.isLoading = false;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      try {
    
        state.token = token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;

        if (typeof window !== 'undefined') {
          localStorage.setItem('userToken', token);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        state.error = 'Invalid token';
        state.isLoading = false;
      }
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
      }
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
);
export const selectUser = createSelector(selectAuth, (auth) => auth.user);
export const { loginStart, loginSuccess, loginFailure, logout,addUser } = authSlice.actions;
export default authSlice.reducer;
