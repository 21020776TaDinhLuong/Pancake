import axios from 'axios';
import {
    FANPAGE_FOLLOW_REQUEST,
    FANPAGE_FOLLOW_SUCCESS,
    FANPAGE_FOLLOW_FAIL,
    FANPAGE_UNFOLLOW_REQUEST,
    FANPAGE_UNFOLLOW_SUCCESS,
    FANPAGE_UNFOLLOW_FAIL,
    FANPAGE_CREATE_REQUEST,
    FANPAGE_CREATE_SUCCESS,
    FANPAGE_CREATE_FAIL,
} from '../constants/fanpageConstants'; // Ensure these constants exist

// Fetch followed fanpages for a user
export const fetchFollowedFanpages = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FANPAGE_FOLLOW_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const { data } = await axios.get(`/api/users/followed-fanpages`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        dispatch({
            type: FANPAGE_FOLLOW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FANPAGE_FOLLOW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Create a new fanpage
export const createFanpage = (name) => async (dispatch) => {
    try {
        dispatch({ type: FANPAGE_CREATE_REQUEST });

        const { data } = await axios.post('/api/fanpages', { name });

        dispatch({
            type: FANPAGE_CREATE_SUCCESS,
            payload: data, // Return the created fanpage data
        });
    } catch (error) {
        dispatch({
            type: FANPAGE_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Follow a fanpage
export const followFanpage = (fanpageId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FANPAGE_FOLLOW_REQUEST });

        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Attach user token for authorization
            },
        };

        await axios.post(`/api/users/follow/${fanpageId}`, {}, config);

        dispatch({
            type: FANPAGE_FOLLOW_SUCCESS,
            payload: fanpageId, // Send the ID of the followed fanpage
        });
    } catch (error) {
        if (error.response?.data.message === "Already following this fanpage") {
            // If the user is already following the fanpage, dispatch unfollow action
            dispatch(unfollowFanpage(fanpageId));
        } else {
            dispatch({
                type: FANPAGE_FOLLOW_FAIL,
                payload: error.response?.data.message || error.message,
            });
        }
    }
};

// Unfollow a fanpage
export const unfollowFanpage = (fanpageId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FANPAGE_UNFOLLOW_REQUEST });

        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Attach user token for authorization
            },
        };

        await axios.delete(`/api/users/unfollow/${fanpageId}`, config);

        dispatch({
            type: FANPAGE_UNFOLLOW_SUCCESS,
            payload: fanpageId, // Send the ID of the unfollowed fanpage
        });
    } catch (error) {
        dispatch({
            type: FANPAGE_UNFOLLOW_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};
