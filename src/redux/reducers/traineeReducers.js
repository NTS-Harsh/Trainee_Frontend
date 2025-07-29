import {
  TRAINEE_LIST_REQUEST,
  TRAINEE_LIST_SUCCESS,
  TRAINEE_LIST_FAIL,
  TRAINEE_LIST_RESET,
  TRAINEE_DETAILS_REQUEST,
  TRAINEE_DETAILS_SUCCESS,
  TRAINEE_DETAILS_FAIL,
  TRAINEE_DETAILS_RESET,
  TRAINEE_CREATE_REQUEST,
  TRAINEE_CREATE_SUCCESS,
  TRAINEE_CREATE_FAIL,
  TRAINEE_CREATE_RESET,
  TRAINEE_UPDATE_REQUEST,
  TRAINEE_UPDATE_SUCCESS,
  TRAINEE_UPDATE_FAIL,
  TRAINEE_UPDATE_RESET,
  TRAINEE_DELETE_REQUEST,
  TRAINEE_DELETE_SUCCESS,
  TRAINEE_DELETE_FAIL,
} from '../constants/traineeConstants';

// Trainee list reducer
export const traineeListReducer = (state = { trainees: [] }, action) => {
  switch (action.type) {
    case TRAINEE_LIST_REQUEST:
      return { loading: true, trainees: [] };
    case TRAINEE_LIST_SUCCESS:
      return { loading: false, trainees: action.payload };
    case TRAINEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case TRAINEE_LIST_RESET:
      return { trainees: [] };
    default:
      return state;
  }
};

// Trainee details reducer
export const traineeDetailsReducer = (state = { trainee: {} }, action) => {
  switch (action.type) {
    case TRAINEE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TRAINEE_DETAILS_SUCCESS:
      return { loading: false, trainee: action.payload };
    case TRAINEE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TRAINEE_DETAILS_RESET:
      return { trainee: {} };
    default:
      return state;
  }
};

// Trainee create reducer
export const traineeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINEE_CREATE_REQUEST:
      return { loading: true };
    case TRAINEE_CREATE_SUCCESS:
      return { loading: false, success: true, trainee: action.payload };
    case TRAINEE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINEE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Trainee update reducer
export const traineeUpdateReducer = (state = { trainee: {} }, action) => {
  switch (action.type) {
    case TRAINEE_UPDATE_REQUEST:
      return { loading: true };
    case TRAINEE_UPDATE_SUCCESS:
      return { loading: false, success: true, trainee: action.payload };
    case TRAINEE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINEE_UPDATE_RESET:
      return { trainee: {} };
    default:
      return state;
  }
};

// Trainee delete reducer
export const traineeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINEE_DELETE_REQUEST:
      return { loading: true };
    case TRAINEE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRAINEE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};