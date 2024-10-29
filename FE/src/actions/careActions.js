import axios from 'axios'
import {
  CARE_CREATE_REQUEST,
  CARE_CREATE_SUCCESS,
  CARE_CREATE_FAIL,
  CARE_DETAILS_FAIL,
  CARE_DETAILS_SUCCESS,
  CARE_DETAILS_REQUEST,
  CARE_LIST_MY_REQUEST,
  CARE_LIST_MY_SUCCESS,
  CARE_LIST_MY_FAIL,
  CARE_LIST_FAIL,
  CARE_LIST_SUCCESS,
  CARE_LIST_REQUEST,
  CARE_UPDATE_FAIL,
  CARE_UPDATE_REQUEST,
  CARE_UPDATE_SUCCESS,
  CARE_UPDATE_RESET
} from '../constants/careConstants'
import { logout } from './userActions'


export const updateCare = (care) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/cares/${care._id}`, care, config)

    dispatch({
      type: CARE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createCare = (care) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/cares`, care, config)

    dispatch({
      type: CARE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getCareDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARE_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/cares/${id}`, config)

    dispatch({
      type: CARE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARE_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const listCares = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARE_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/cares`, config)

    dispatch({
      type: CARE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARE_LIST_FAIL,
      payload: message,
    })
  }
}
