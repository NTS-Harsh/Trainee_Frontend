import axios from 'axios';
import {
  TRAINEE_LIST_REQUEST,
  TRAINEE_LIST_SUCCESS,
  TRAINEE_LIST_FAIL,
  TRAINEE_DETAILS_REQUEST,
  TRAINEE_DETAILS_SUCCESS,
  TRAINEE_DETAILS_FAIL,
  TRAINEE_CREATE_REQUEST,
  TRAINEE_CREATE_SUCCESS,
  TRAINEE_CREATE_FAIL,
  TRAINEE_UPDATE_REQUEST,
  TRAINEE_UPDATE_SUCCESS,
  TRAINEE_UPDATE_FAIL,
  TRAINEE_DELETE_REQUEST,
  TRAINEE_DELETE_SUCCESS,
  TRAINEE_DELETE_FAIL,
} from '../constants/traineeConstants';

// Get all trainees action (admin only)
export const listTrainees = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINEE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/trainees`, config);

    dispatch({
      type: TRAINEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get trainee details action (admin only)
export const getTraineeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINEE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/trainees/${id}`, config);

    dispatch({
      type: TRAINEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINEE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create trainee action (admin only)
export const createTrainee = (trainee) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINEE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/trainees`, trainee, config);

    dispatch({
      type: TRAINEE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINEE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update trainee action (admin only)
export const updateTrainee = (trainee) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINEE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

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

    dispatch({
      type: TRAINEE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINEE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete trainee action (admin only)
export const deleteTrainee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINEE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/trainees/${id}`, config);

    dispatch({
      type: TRAINEE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRAINEE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};