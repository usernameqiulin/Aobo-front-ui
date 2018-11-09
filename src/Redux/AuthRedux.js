/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    authRequest: null,
    authSuccess: ['data'],
    authFailure: null,
    registerRequest: null,
    registerFailure: null,
    logoutRequest: null,
    logoutSuccess: null,
    refreshRequest: ['param'],
    refreshSuccess: ['data'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    // token: '246c7170-71e7-11e7-b6a2-dbb4fae9b3b7',
    data: null,
    error: false,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    window.ABAccount.close()
    // console.log(data)
    return {...state, fetching: false, error: null, data}
}

// Something went wrong somewhere.
export const failure = (state, action) => {
    const {error} = action
    return {...state, fetching: false, error: error}
}

export const logoutRequest = (state) => {
    return {...state, fetching: true}
}

export const logoutSuccess = (state, action) => INITIAL_STATE

export const registerRequest = (state) => {
    return {...state, fetching: true}
}

export const registerFailure = (state, action) => {
    const {error} = action
    return {...state, fetching: false, error: error}
}

export const refreshRequest = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const refreshSuccess = (state, action) => {
    const {data} = action
    // window.ABAccount.close()
    // console.log(data)
    return {...state, fetching: false, error: null, data}
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.AUTH_REQUEST]: request,
    [Types.AUTH_SUCCESS]: success,
    [Types.AUTH_FAILURE]: failure,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
    [Types.REGISTER_REQUEST]: registerRequest,
    [Types.REGISTER_FAILURE]: registerFailure,
    [Types.REFRESH_REQUEST]: refreshRequest,
    [Types.REFRESH_SUCCESS]: refreshSuccess,
})
