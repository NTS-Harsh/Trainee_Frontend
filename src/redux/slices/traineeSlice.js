import { createSlice } from '@reduxjs/toolkit';
// Import saga action types
import {
  TRAINEE_LIST_REQUEST,
  TRAINEE_LIST_SUCCESS,
  TRAINEE_LIST_FAILURE,
  TRAINEE_DETAILS_REQUEST,
  TRAINEE_DETAILS_SUCCESS,
  TRAINEE_DETAILS_FAILURE,
  TRAINEE_CREATE_REQUEST,
  TRAINEE_CREATE_SUCCESS,
  TRAINEE_CREATE_FAILURE,
  TRAINEE_UPDATE_REQUEST,
  TRAINEE_UPDATE_SUCCESS,
  TRAINEE_UPDATE_FAILURE,
  TRAINEE_DELETE_REQUEST,
  TRAINEE_DELETE_SUCCESS,
  TRAINEE_DELETE_FAILURE
} from '../sagas/traineeSagas';

// Initial state
const initialState = {
  trainees: [],
  trainee: {},
  loading: false,
  error: null,
  success: false,
};

// Create the slice
const traineeSlice = createSlice({
  name: 'trainee',
  initialState,
  reducers: {
    resetTraineeList: (state) => {
      state.trainees = [];
    },
    resetTraineeCreate: (state) => {
      state.success = false;
      state.trainee = {};
      state.error = null;
    },
    resetTraineeUpdate: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Saga actions
      // List trainees
      .addCase(TRAINEE_LIST_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(TRAINEE_LIST_SUCCESS, (state, action) => {
        state.loading = false;
        state.trainees = action.payload;
      })
      .addCase(TRAINEE_LIST_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get trainee details
      .addCase(TRAINEE_DETAILS_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(TRAINEE_DETAILS_SUCCESS, (state, action) => {
        state.loading = false;
        state.trainee = action.payload;
      })
      .addCase(TRAINEE_DETAILS_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create trainee
      .addCase(TRAINEE_CREATE_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(TRAINEE_CREATE_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainee = action.payload;
      })
      .addCase(TRAINEE_CREATE_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update trainee
      .addCase(TRAINEE_UPDATE_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(TRAINEE_UPDATE_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainee = action.payload;
      })
      .addCase(TRAINEE_UPDATE_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete trainee
      .addCase(TRAINEE_DELETE_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(TRAINEE_DELETE_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainees = state.trainees.filter(
          (trainee) => trainee._id !== action.payload
        );
      })
      .addCase(TRAINEE_DELETE_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetTraineeList, resetTraineeCreate, resetTraineeUpdate } = traineeSlice.actions;
export default traineeSlice.reducer;