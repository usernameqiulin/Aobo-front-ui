/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    rebateRequest: ['params'],
    rebateSuccess: ['data'],
    rebateFailure: null,

    rebateAddRequest: ['rebate'],
    rebateAddSuccess: null,
    rebateAddFailure: null,

    rebateCalculateRequest: ['params'],
    rebateCalculateSuccess: ['calculation'],
    rebateCalculateFailure: null,

    rebateReset: null,
})

export const RebateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: false,
    calculation: null,
    calculating: false,
    adding: false,
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
    return {...state, fetching: false, error: null, data}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const addRequest = (state, action) => {
    return {...state, adding: true}
}

// successful api lookup
export const addSuccess = (state, action) => {
    return {...state, adding: false, error: null}
}

export const addFailure = (state) => {
    return {...state, adding: false, error: true}
}

export const calculateRequest = (state, action) => {
    const {params} = action
    return {...state, calculating: params.product}
}

// successful api lookup
export const calculateSuccess = (state, action) => {
    const {calculation} = action
    return {...state, calculating: null, error: null, calculation}
}

export const calculateFailure = (state) => {
    return {...state, calculating: null, error: true}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REBATE_REQUEST]: request,
    [Types.REBATE_SUCCESS]: success,
    [Types.REBATE_FAILURE]: failure,

    [Types.REBATE_ADD_REQUEST]: addRequest,
    [Types.REBATE_ADD_SUCCESS]: addSuccess,
    [Types.REBATE_ADD_FAILURE]: addFailure,

    [Types.REBATE_CALCULATE_REQUEST]: calculateRequest,
    [Types.REBATE_CALCULATE_SUCCESS]: calculateSuccess,
    [Types.REBATE_CALCULATE_FAILURE]: calculateFailure,

    [Types.REBATE_RESET]: reset,
});
