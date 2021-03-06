import { v4 as uuidv4 } from 'uuid';
import { Remove_ALERT, SET_ALERT } from '../constants/alertConstants'


export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4()
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            alertType,
            id
        }
    })
    setTimeout(() => dispatch({ type: Remove_ALERT, payload: id }), 3000)
}