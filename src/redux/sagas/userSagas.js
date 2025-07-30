import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import axios from 'axios';

// Action Types
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
export const USER_DETAILS_FAILURE = 'USER_DETAILS_FAILURE';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAILURE = 'USER_UPDATE_PROFILE_FAILURE';

export const USER_LOGOUT = 'USER_LOGOUT';

// Action Creators
export const loginRequest = (email, password) => ({
  type: USER_LOGIN_REQUEST,
  payload: { email, password }
});

export const registerRequest = (userData) => ({
  type: USER_REGISTER_REQUEST,
  payload: userData
});

export const getUserDetailsRequest = () => ({
  type: USER_DETAILS_REQUEST
});

export const updateUserProfileRequest = (userData) => ({
  type: USER_UPDATE_PROFILE_REQUEST,
  payload: userData
});

export const logoutRequest = () => ({
  type: USER_LOGOUT
});

// Selectors
const getUserState = (state) => state.user;

// Sagas
function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = yield call(
      axios.post,
      '/api/users/login',
      { email, password },
      config
    );
    
    yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(data));
    
    // Dispatch only the Redux Saga action
    yield put({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* registerSaga(action) {
  try {
    const { name, email, password, department, gender } = action.payload;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = yield call(
      axios.post,
      '/api/users',
      { name, email, password, department, gender },
      config
    );
    
    yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(data));
    
    // Dispatch only the Redux Saga actions
    yield put({ type: USER_REGISTER_SUCCESS, payload: data });
    yield put({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* getUserDetailsSaga() {
  try {
    const { userInfo } = yield select(getUserState);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(axios.get, '/api/users/profile', config);
    
    // Dispatch only the Redux Saga action
    yield put({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* updateUserProfileSaga(action) {
  try {
    const { userInfo } = yield select(getUserState);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(
      axios.put,
      '/api/users/profile',
      action.payload,
      config
    );
    
    // Dispatch only the Redux Saga actions
    yield put({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    yield put({ type: USER_LOGIN_SUCCESS, payload: data });
    yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(data));
  } catch (error) {
    yield put({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'userInfo');
}

// Watcher Sagas
function* watchUserLogin() {
  yield takeLatest(USER_LOGIN_REQUEST, loginSaga);
}

function* watchUserRegister() {
  yield takeLatest(USER_REGISTER_REQUEST, registerSaga);
}

function* watchGetUserDetails() {
  yield takeLatest(USER_DETAILS_REQUEST, getUserDetailsSaga);
}

function* watchUpdateUserProfile() {
  yield takeLatest(USER_UPDATE_PROFILE_REQUEST, updateUserProfileSaga);
}

function* watchUserLogout() {
  yield takeLatest(USER_LOGOUT, logoutSaga);
}

// Root Saga
export function* userSagas() {
  yield all([
    watchUserLogin(),
    watchUserRegister(),
    watchGetUserDetails(),
    watchUpdateUserProfile(),
    watchUserLogout(),
  ]);
}