import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  trainees: [],
  trainee: {},
  loading: false,
  error: null,
  success: false,
};

// Async thunks
export const listTrainees = createAsyncThunk(
  'trainee/list',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/trainees`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getTraineeDetails = createAsyncThunk(
  'trainee/details',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/trainees/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createTrainee = createAsyncThunk(
  'trainee/create',
  async (trainee, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/trainees`, trainee, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateTrainee = createAsyncThunk(
  'trainee/update',
  async (trainee, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/trainees/${trainee._id}`,
        trainee,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteTrainee = createAsyncThunk(
  'trainee/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/trainees/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

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
      // List trainees
      .addCase(listTrainees.pending, (state) => {
        state.loading = true;
      })
      .addCase(listTrainees.fulfilled, (state, action) => {
        state.loading = false;
        state.trainees = action.payload;
      })
      .addCase(listTrainees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get trainee details
      .addCase(getTraineeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTraineeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.trainee = action.payload;
      })
      .addCase(getTraineeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create trainee
      .addCase(createTrainee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrainee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainee = action.payload;
      })
      .addCase(createTrainee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update trainee
      .addCase(updateTrainee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTrainee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainee = action.payload;
      })
      .addCase(updateTrainee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete trainee
      .addCase(deleteTrainee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrainee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trainees = state.trainees.filter(
          (trainee) => trainee._id !== action.payload
        );
      })
      .addCase(deleteTrainee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetTraineeList, resetTraineeCreate, resetTraineeUpdate } = traineeSlice.actions;
export default traineeSlice.reducer;