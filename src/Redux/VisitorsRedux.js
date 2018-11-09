
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    visitorsRequest: ['params'],
    visitorsSuccess: ['data'],
    visitorsFailure: null,
    visitorsReset: null,
    visitorsFetching: null    
})

export const VisitorsTypes = Types
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
    [Types.VISITORS_REQUEST]: request,
    [Types.VISITORS_SUCCESS]: success,
    [Types.VISITORS_FAILURE]: failure,
    [Types.VISITORS_RESET]: reset,
    [Types.VISITORS_FETCHING]: request

    
})
