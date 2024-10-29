import {
    CARE_CREATE_REQUEST,
    CARE_CREATE_SUCCESS,
    CARE_CREATE_FAIL,
    CARE_DETAILS_REQUEST,
    CARE_DETAILS_SUCCESS,
    CARE_DETAILS_FAIL,
    CARE_PAY_REQUEST,
    CARE_PAY_FAIL,
    CARE_PAY_SUCCESS,
    CARE_PAY_RESET,
    CARE_LIST_MY_REQUEST,
    CARE_LIST_MY_SUCCESS,
    CARE_LIST_MY_FAIL,
    CARE_LIST_MY_RESET,
    CARE_LIST_FAIL,
    CARE_LIST_SUCCESS,
    CARE_LIST_REQUEST,
    CARE_DELIVER_FAIL,
    CARE_DELIVER_SUCCESS,
    CARE_DELIVER_REQUEST,
    CARE_DELIVER_RESET,
    CARE_CREATE_RESET,
    CARE_UPDATE_FAIL,
    CARE_UPDATE_REQUEST,
    CARE_UPDATE_SUCCESS,
    CARE_UPDATE_RESET
  } from '../constants/careConstants'
  
  export const careCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CARE_CREATE_REQUEST:
        return {
          loading: true,
        }
      case CARE_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          care: action.payload,
        }
      case CARE_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
        case CARE_CREATE_RESET:
            return {}
          default:
            return state
    }
  }
  
  export const careDetailsReducer = (
    state = {},
    action
  ) => {
    switch (action.type) {
      case CARE_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case CARE_DETAILS_SUCCESS:
        return {
          loading: false,
          CARE: action.payload,
        }
      case CARE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }
  
  export const careListReducer = (state = { cares: [] }, action) => {
    switch (action.type) {
      case CARE_LIST_REQUEST:
        return {
          loading: true,
        }
      case CARE_LIST_SUCCESS:
        return {
          loading: false,
          cares: action.payload,
        }
      case CARE_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }

  export const careUpdateReducer = (state = { care: {} }, action) => {
    switch (action.type) {
      case CARE_UPDATE_REQUEST:
        return { loading: true }
      case CARE_UPDATE_SUCCESS:
        return { loading: false, success: true, care: action.payload }
      case CARE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case CARE_UPDATE_RESET:
        return { care: {} }
      default:
        return state
    }
  }
  