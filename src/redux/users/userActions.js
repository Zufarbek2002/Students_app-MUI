import { FETCH_USERS_ERROR, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes"
import axios from 'axios';

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: user
    }
}
export const fetchUserError = (error) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUserRequest())
        try {
            const res = await axios.get("http://localhost:3000/students")
            const user = await res.data
            dispatch(fetchUserSuccess(user))
        } catch (error) {
            dispatch(fetchUserError(error.message))
        }
    }
}