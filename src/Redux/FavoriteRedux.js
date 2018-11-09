/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    favoriteRequest: ['params'],
    favoriteSuccess: ['data'],
    favoriteFailure: null,

    favoriteAddRequest: ['params'],
    favoriteAddSuccess: null,

    favoriteDeleteRequest: ['gameId'],
    favoriteDeleteSuccess: null,

    favoriteReset: null,
})

export const FavoriteTypes = Types
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
    return {...state, fetching: false, error: null, data}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const addRequest = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const addSuccess = (state) => {
    return {...state, fetching: false, error: false}
}

export const deleteRequest = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const deleteSuccess = (state) => {
    return {...state, fetching: false, error: false}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.FAVORITE_REQUEST]: request,
    [Types.FAVORITE_SUCCESS]: success,
    [Types.FAVORITE_FAILURE]: failure,

    [Types.FAVORITE_ADD_REQUEST]: addRequest,
    [Types.FAVORITE_ADD_SUCCESS]: addSuccess,

    [Types.FAVORITE_DELETE_REQUEST]: deleteRequest,
    [Types.FAVORITE_DELETE_SUCCESS]: deleteSuccess,

    [Types.FAVORITE_RESET]: reset,
});
