// postReducers.js
import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
  } from '../constants/postConstants';
  
  const initialState = {
    posts: [], // Ensure posts is initialized as an empty array
    loading: false,
    error: null,
};

export const postListReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { ...state, loading: true };
        case POST_LIST_SUCCESS:
            return { loading: false, posts: action.payload };
        case POST_LIST_FAIL:
            return { loading: false, error: action.payload };
        // Handle other actions...
        default:
            return state;
    }
};
  
  export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_REQUEST:
        return { loading: true };
      case POST_CREATE_SUCCESS:
        return { loading: false, success: true, post: action.payload };
      case POST_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  