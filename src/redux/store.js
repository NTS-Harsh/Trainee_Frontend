import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import traineeReducer from './slices/traineeSlice';
import rootSaga from './sagas/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with Redux Toolkit
const store = configureStore({
  reducer: {
    user: userReducer,
    trainee: traineeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Enable thunk for Redux Toolkit
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'USER_LOGIN_REQUEST', 'USER_LOGIN_SUCCESS', 'USER_LOGIN_FAILURE',
          'USER_REGISTER_REQUEST', 'USER_REGISTER_SUCCESS', 'USER_REGISTER_FAILURE',
          'USER_DETAILS_REQUEST', 'USER_DETAILS_SUCCESS', 'USER_DETAILS_FAILURE',
          'USER_UPDATE_PROFILE_REQUEST', 'USER_UPDATE_PROFILE_SUCCESS', 'USER_UPDATE_PROFILE_FAILURE',
          'USER_LOGOUT',
          'TRAINEE_LIST_REQUEST', 'TRAINEE_LIST_SUCCESS', 'TRAINEE_LIST_FAILURE',
          'TRAINEE_DETAILS_REQUEST', 'TRAINEE_DETAILS_SUCCESS', 'TRAINEE_DETAILS_FAILURE',
          'TRAINEE_CREATE_REQUEST', 'TRAINEE_CREATE_SUCCESS', 'TRAINEE_CREATE_FAILURE',
          'TRAINEE_UPDATE_REQUEST', 'TRAINEE_UPDATE_SUCCESS', 'TRAINEE_UPDATE_FAILURE',
          'TRAINEE_DELETE_REQUEST', 'TRAINEE_DELETE_SUCCESS', 'TRAINEE_DELETE_FAILURE'
        ],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run saga middleware with root saga
sagaMiddleware.run(rootSaga);

export default store;