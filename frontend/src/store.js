import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { alertReducer } from './reducers/alertReducer'
import { registerReducer, loginReducer } from './reducers/userReducer'

const reducer = combineReducers({
    alert: alertReducer,
    register: registerReducer,
    login: loginReducer
})

const userInfoFromStorage = localStorage.getItem('User')
    ? JSON.parse(localStorage.getItem('User')) : null

const initialState = {
    login: {
        user: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store