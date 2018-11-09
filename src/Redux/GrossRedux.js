import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    grossSuccess: ['gross'],
    grossFailure: ['message'],
    grossRequest: ['params'],
    grossReset: null
})

export const GrossTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
    data: null,
    error: false,
    show: false,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const grossSuccess = (state, action) => {
    const {gross} = action
    return {...state, fetching: false, show: true, data: gross}
}

export const grossFailure = (state, action) => {
    const {message} = action;
    return {...state, fetching: false, show: false,error: message}
}

export const fetching = (state, action) => {
    return {...state, fetching: true, error: false}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GROSS_SUCCESS]: grossSuccess,
    [Types.GROSS_FAILURE]: grossFailure,
    [Types.GROSS_REQUEST]: fetching,
    [Types.GROSS_RESET]: reset
})



