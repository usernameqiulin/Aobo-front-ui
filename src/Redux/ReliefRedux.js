/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    reliefRequest: ['params'],
    reliefSuccess: ['data'],
    reliefFailure: null,

    reliefAddRequest: ['relief'],
    reliefAddSuccess: ['relief'],
    reliefAddFailure: ['error'],

    reliefReset: null,
})

export const ReliefTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: false,
    submitting: false,
    addError: null
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
    return {...state, submitting: false, addError: null}
}

// successful api lookup
export const addFailure = (state, action) => {
    const {error} = action
    return {...state, submitting: false, addError: error}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.RELIEF_REQUEST]: request,
    [Types.RELIEF_SUCCESS]: success,
    [Types.RELIEF_FAILURE]: failure,

    [Types.RELIEF_ADD_REQUEST]: addRequest,
    [Types.RELIEF_ADD_SUCCESS]: addSuccess,
    [Types.RELIEF_ADD_FAILURE]: addFailure,

    [Types.RELIEF_RESET]: reset,
});
