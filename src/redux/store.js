import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  traineeListReducer,
  traineeDetailsReducer,
  traineeCreateReducer,
  traineeUpdateReducer,
  traineeDeleteReducer,
} from './reducers/traineeReducers';

// Custom compose function that uses Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  traineeList: traineeListReducer,
  traineeDetails: traineeDetailsReducer,
  traineeCreate: traineeCreateReducer,
  traineeUpdate: traineeUpdateReducer,
  traineeDelete: traineeDeleteReducer,
});

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Middleware
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;