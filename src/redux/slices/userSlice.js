import { createSlice } from '@reduxjs/toolkit';
// Import saga action types
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_LOGOUT
} from '../sagas/userSagas';

// Initial state
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
  user: {},
  success: false,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
      state.user = {};
    },
    resetUserDetails: (state) => {
      state.user = {};
    },
    resetUpdateProfile: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Saga actions
      // Register
      .addCase(USER_REGISTER_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(USER_REGISTER_SUCCESS, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(USER_REGISTER_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login
      .addCase(USER_LOGIN_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(USER_LOGIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(USER_LOGIN_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // User details
      .addCase(USER_DETAILS_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(USER_DETAILS_SUCCESS, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(USER_DETAILS_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update profile
      .addCase(USER_UPDATE_PROFILE_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(USER_UPDATE_PROFILE_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.userInfo = action.payload;
      })
      .addCase(USER_UPDATE_PROFILE_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(USER_LOGOUT, (state) => {
        state.userInfo = null;
        state.user = {};
      });
  },
});

// Export actions and reducer
export const { setUserInfo, logout, resetUserDetails, resetUpdateProfile } = userSlice.actions;
export default userSlice.reducer;