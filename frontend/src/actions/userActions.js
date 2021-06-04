import axios from 'axios'
import {
    SET_USER_REGISTER_SUCCESS,
    SET_USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants'


export const register = (user) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/users`, user, config)
        dispatch({
            type: SET_USER_REGISTER_SUCCESS,
            user: data
        })
        localStorage.setItem('User', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: SET_USER_REGISTER_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }

}


export const logIn = (userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/users/login/`, userData, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            user: data
        })
        localStorage.setItem('User', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}