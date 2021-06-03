import { SET_ALERT, Remove_ALERT } from '../constants/alertConstants'

const initialState = []

export const alertReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_ALERT:
            return [...state, payload]

        case Remove_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state
    }
}