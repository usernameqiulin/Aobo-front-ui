
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    chargesRequest: ['params'],
    chargesSuccess: ['data'],
    chargesFailure: null,
    chargesReset: null,
    chargesFetching: null
})

export const ChargesTypes = Types

export default Creators


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
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
    [Types.CHARGES_REQUEST]: request,
    [Types.CHARGES_SUCCESS]: success,
    [Types.CHARGES_FAILURE]: failure,
    [Types.CHARGES_RESET]: reset,
    [Types.CHARGES_FETCHING]: request
})

