import { FETCH_USERS_ERROR, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes";

const initialState = {
    loading: false,
    user: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        case FETCH_USERS_ERROR:
            return {
                loading: false,
                user: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer