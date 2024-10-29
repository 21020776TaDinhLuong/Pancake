// fanpageReducers.js
import {
    FANPAGE_FOLLOW_REQUEST,
    FANPAGE_FOLLOW_SUCCESS,
    FANPAGE_FOLLOW_FAIL,
    FANPAGE_UNFOLLOW_REQUEST,
    FANPAGE_UNFOLLOW_SUCCESS,
    FANPAGE_UNFOLLOW_FAIL,
  } from '../constants/fanpageConstants';
  
  import {
    FANPAGE_CREATE_REQUEST,
    FANPAGE_CREATE_SUCCESS,
    FANPAGE_CREATE_FAIL,
    // other constants...
  } from '../constants/fanpageConstants';
  
  const initialState = {
    fanpages: [],
    loading: false,
    error: null,
  };
  
  export const fanpageReducer = (state = initialState, action) => {
    switch (action.type) {
      case FANPAGE_CREATE_REQUEST:
        return { ...state, loading: true };
      case FANPAGE_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          fanpages: [...state.fanpages, action.payload], // Add the new fanpage
        };
      case FANPAGE_CREATE_FAIL:
        return { ...state, loading: false, error: action.payload };
      // Handle other actions...
      default:
        return state;
    }
  };
  

  export const fanpageFollowReducer = (state = { followedFanpages: [] }, action) => {
    switch (action.type) {
      case FANPAGE_FOLLOW_REQUEST:
      case FANPAGE_UNFOLLOW_REQUEST:
        return { ...state, loading: true };
      
      case FANPAGE_FOLLOW_SUCCESS:
        return {
          ...state,
          loading: false,
          followedFanpages: [...state.followedFanpages, action.payload],
        };
  
      case FANPAGE_UNFOLLOW_SUCCESS:
        return {
          ...state,
          loading: false,
          followedFanpages: state.followedFanpages.filter(id => id !== action.payload),
        };
  
      case FANPAGE_FOLLOW_FAIL:
      case FANPAGE_UNFOLLOW_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  