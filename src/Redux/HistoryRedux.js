
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    historyRequest: ['params'],
    historySuccess: ['data'],
    historyFailure: null,
    historyReset: null,
    historyFetching: null
})

export const HistoryTypes = Types

export default Creators


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: false,
    show:false
}


/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
    return {...state, fetching: true,error: false}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    // console.log(data)
    return {...state, fetching: false, show: true, data}
}


// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false,show: false, error: true}
}

export const reset = (state) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.HISTORY_REQUEST]: request,
    [Types.HISTORY_SUCCESS]: success,
    [Types.HISTORY_FAILURE]: failure,
    [Types.HISTORY_RESET]: reset,
    [Types.HISTORY_FETCHING]: request
})

