import {
    SET_USER_REGISTER_SUCCESS,
    SET_USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants'


export const registerReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SET_USER_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.user,
                success: true
            }
        case SET_USER_REGISTER_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const loginReducer = (state = { user: {}, success: false }, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                user: action.user,
                success: true
            }
        case USER_LOGIN_FAIL:
            return {
                error: action.error
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}