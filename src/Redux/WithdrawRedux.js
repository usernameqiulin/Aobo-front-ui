/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    withdrawRequest: ['params'],
    withdrawSuccess: ['data'],
    withdrawFailure: null,

    withdrawAddRequest: ['withdraw'],
    withdrawAddSuccess: ['withdraw'],
    withdrawAddFailure: ['error'],

    withdrawReset: null,
})

export const WithdrawTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: null,
    submitting: false,
    submitError: null,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    // console.log(data)
    return {...state, fetching: false, error: false, data}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const addRequest = (state, action) => {
    return {...state, submitting: true}
}

// successful api lookup
export const addSuccess = (state, action) => {
    const {withdraw} = action
    return {...state, submitting: false, submitError: null, withdraw}
}

// Something went wrong somewhere.
export const addFailure = (state, action) => {
    const {error} = action
    return {...state, submitting: false, submitError: error}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.WITHDRAW_REQUEST]: request,
    [Types.WITHDRAW_SUCCESS]: success,
    [Types.WITHDRAW_FAILURE]: failure,

    [Types.WITHDRAW_ADD_REQUEST]: addRequest,
    [Types.WITHDRAW_ADD_SUCCESS]: addSuccess,
    [Types.WITHDRAW_ADD_FAILURE]: addFailure,

    [Types.WITHDRAW_RESET]: reset,
});
