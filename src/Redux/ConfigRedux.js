/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    configRequest: null,
    configSuccess: ['data'],
    configFailure: null,
})

export const ConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: null,
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

export const reset = (state) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CONFIG_REQUEST]: request,
    [Types.CONFIG_SUCCESS]: success,
    [Types.CONFIG_FAILURE]: failure,
});
