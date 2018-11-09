/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    searchRequest: ['params'],
    searchSuccess: ['data'],
    searchFailure: null,
    searchCachedResult: null,
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    params: null,
    data: null,
    version: null,
    error: false,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
    const {params} = action, prevParams = state.params
    let version = state.version
    if (version && params.keyword !== prevParams.keyword) {
        version = 0
    }
    return {...state, fetching: true, params, version: version}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    // console.log(data)
    return {...state, fetching: false, error: false, data, version: new Date().getTime()}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const cachedResult = (state) => {
    return {...state, fetching: false, error: false}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SEARCH_REQUEST]: request,
    [Types.SEARCH_SUCCESS]: success,
    [Types.SEARCH_FAILURE]: failure,
    [Types.SEARCH_CACHED_RESULT]: cachedResult,
})
