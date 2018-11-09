/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    bigwinRequest: ['params'],
    bigwinSuccess: ['data'],
    bigwinFailure: null,

    bigwinAddRequest: ['bigwin'],
    bigwinAddSuccess: null,

    bigwinReset: null,
})

export const BigwinTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
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
    // console.log(data)
    return {...state, fetching: false, error: false, data}
}

// Something went wrong somewhere.
export const failure = (state, action) => {
    return {...state, fetching: false, error: true}
}

export const addRequest = (state, action) => {
    return {...state, fetching: true}
}

// successful api lookup
//@todo: add tot to data?? or simply request again?
export const addSuccess = (state, action) => {
    const {bigwin} = action;
    return {...state, fetching: false, error: false, bigwin}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.BIGWIN_REQUEST]: request,
    [Types.BIGWIN_SUCCESS]: success,
    [Types.BIGWIN_FAILURE]: failure,

    [Types.BIGWIN_ADD_REQUEST]: addRequest,
    [Types.BIGWIN_ADD_SUCCESS]: addSuccess,

    [Types.BIGWIN_RESET]: reset,
});
