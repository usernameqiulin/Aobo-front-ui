/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
import R from 'ramda'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    depositRequest: ['params'],
    depositSuccess: ['data'],
    depositFailure: null,

    methodRequest: null,
    methodSuccess: ['data'],
    methodFailure: null,

    depositAddRequest: ['order'],
    depositAddSuccess: null,
    depositAddFailure: ['error'],

    orderUpdateRequest: ['id'],

    depositReset: null,
})

export const DepositTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    submitting: false,
    data: null,
    error: null,
    addError: null,
    method: null,
    methodFetching: false,
    methodError: null,
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

export const addRequest = (state) => {
    return {...state, submitting: true}
}

// successful api lookup
export const addSuccess = (state) => {
    return {...state, submitting: false, addError: false}
}

export const addFailure = (state, action) => {
    const {error} = action
    return {...state, submitting: false, addError: error}
}

export const methodRequest = (state) => {
    return {...state, methodFetching: true}
}

export const methodSuccess = (state, action) => {
    const {data} = action
    return {
        ...state,
        methodFetching: false,
        method: data,
    }
}

export const methodFailure = (state) => {
    return {
        ...state,
        methodFetching: false,
        methodError: true,
    }
}

export const updateRequest = (state, action) => {
    const {id} = action
    let data = R.merge(state.data, {})
    if (!!data.data) {
        data.data.map(r => r.id === id ? r.status='finished' : r)
    }
    return {
        ...state,
        data
    }
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEPOSIT_REQUEST]: request,
    [Types.DEPOSIT_SUCCESS]: success,
    [Types.DEPOSIT_FAILURE]: failure,

    [Types.METHOD_REQUEST]: methodRequest,
    [Types.METHOD_SUCCESS]: methodSuccess,
    [Types.METHOD_FAILURE]: methodFailure,

    [Types.DEPOSIT_ADD_REQUEST]: addRequest,
    [Types.DEPOSIT_ADD_SUCCESS]: addSuccess,
    [Types.DEPOSIT_ADD_FAILURE]: addFailure,

    [Types.ORDER_UPDATE_REQUEST]: updateRequest,

    [Types.DEPOSIT_RESET]: reset,
});
