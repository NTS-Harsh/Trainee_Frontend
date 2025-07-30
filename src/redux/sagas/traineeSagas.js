import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import axios from 'axios';

// Action Types
export const TRAINEE_LIST_REQUEST = 'TRAINEE_LIST_REQUEST';
export const TRAINEE_LIST_SUCCESS = 'TRAINEE_LIST_SUCCESS';
export const TRAINEE_LIST_FAILURE = 'TRAINEE_LIST_FAILURE';

export const TRAINEE_DETAILS_REQUEST = 'TRAINEE_DETAILS_REQUEST';
export const TRAINEE_DETAILS_SUCCESS = 'TRAINEE_DETAILS_SUCCESS';
export const TRAINEE_DETAILS_FAILURE = 'TRAINEE_DETAILS_FAILURE';

export const TRAINEE_CREATE_REQUEST = 'TRAINEE_CREATE_REQUEST';
export const TRAINEE_CREATE_SUCCESS = 'TRAINEE_CREATE_SUCCESS';
export const TRAINEE_CREATE_FAILURE = 'TRAINEE_CREATE_FAILURE';

export const TRAINEE_UPDATE_REQUEST = 'TRAINEE_UPDATE_REQUEST';
export const TRAINEE_UPDATE_SUCCESS = 'TRAINEE_UPDATE_SUCCESS';
export const TRAINEE_UPDATE_FAILURE = 'TRAINEE_UPDATE_FAILURE';

export const TRAINEE_DELETE_REQUEST = 'TRAINEE_DELETE_REQUEST';
export const TRAINEE_DELETE_SUCCESS = 'TRAINEE_DELETE_SUCCESS';
export const TRAINEE_DELETE_FAILURE = 'TRAINEE_DELETE_FAILURE';

// Action Creators
export const listTraineesRequest = () => ({
  type: TRAINEE_LIST_REQUEST
});

export const getTraineeDetailsRequest = (id) => ({
  type: TRAINEE_DETAILS_REQUEST,
  payload: id
});

export const createTraineeRequest = (traineeData) => ({
  type: TRAINEE_CREATE_REQUEST,
  payload: traineeData
});

export const updateTraineeRequest = (traineeData) => ({
  type: TRAINEE_UPDATE_REQUEST,
  payload: traineeData
});

export const deleteTraineeRequest = (id) => ({
  type: TRAINEE_DELETE_REQUEST,
  payload: id
});

// Selectors
const getUserInfo = (state) => state.user.userInfo;

// Sagas
function* listTraineesSaga() {
  try {
    const userInfo = yield select(getUserInfo);
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(axios.get, '/api/trainees', config);
    
    // Dispatch only the Redux Saga action
    yield put({ type: TRAINEE_LIST_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: TRAINEE_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* getTraineeDetailsSaga(action) {
  try {
    const userInfo = yield select(getUserInfo);
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(
      axios.get,
      `/api/trainees/${action.payload}`,
      config
    );
    // Dispatch only the Redux Saga action
    yield put({ type: TRAINEE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: TRAINEE_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* createTraineeSaga(action) {
  try {
    const userInfo = yield select(getUserInfo);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(
      axios.post,
      '/api/trainees',
      action.payload,
      config
    );
    // Dispatch only the Redux Saga action
    yield put({ type: TRAINEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: TRAINEE_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* updateTraineeSaga(action) {
  try {
    const userInfo = yield select(getUserInfo);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield call(
      axios.put,
      `/api/trainees/${action.payload._id}`,
      action.payload,
      config
    );
    // Dispatch only the Redux Saga action
    yield put({ type: TRAINEE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: TRAINEE_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

function* deleteTraineeSaga(action) {
  try {
    const userInfo = yield select(getUserInfo);
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    yield call(axios.delete, `/api/trainees/${action.payload}`, config);
    // Dispatch only the Redux Saga action
    yield put({ type: TRAINEE_DELETE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({
      type: TRAINEE_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

// Watcher Sagas
function* watchListTrainees() {
  yield takeLatest(TRAINEE_LIST_REQUEST, listTraineesSaga);
}

function* watchGetTraineeDetails() {
  yield takeLatest(TRAINEE_DETAILS_REQUEST, getTraineeDetailsSaga);
}

function* watchCreateTrainee() {
  yield takeLatest(TRAINEE_CREATE_REQUEST, createTraineeSaga);
}

function* watchUpdateTrainee() {
  yield takeLatest(TRAINEE_UPDATE_REQUEST, updateTraineeSaga);
}

function* watchDeleteTrainee() {
  yield takeLatest(TRAINEE_DELETE_REQUEST, deleteTraineeSaga);
}

// Root Saga
export function* traineeSagas() {
  yield all([
    watchListTrainees(),
    watchGetTraineeDetails(),
    watchCreateTrainee(),
    watchUpdateTrainee(),
    watchDeleteTrainee(),
  ]);
}