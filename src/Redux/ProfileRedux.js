/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
import R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    profileRequest: null,
    profileSuccess: ['data'],
    profileFailure: ['error'],
    updateFailure: ['error'],
    profileUpdateRequest: ['profile'],
    profileUpdateSuccess: ['data'],
    profileReset: null,
    passwordUpdateRequest: ['params'],
    passwordUpdateSuccess: null,
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    updating: [],
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
export const failure = (state) => {
    return {...state, fetching: false, error: true, updating: []}
}

export const updateRequest = (state, action) => {
    const {profile} = action
    const updating = R.concat(profile.hasOwnProperty('setting') ? Object.keys(profile.setting) : Object.keys(profile), state.updating)
    return {...state, updating: updating}
}

// successful api lookup
export const updateSuccess = (state, action) => {
    const {data} = action
    return {...state, updating: [], error: false, data}
}

export const updateFailure = (state, action) => {
    const {error} = action
    return {...state, updating: [], error: error}
}

export const updatePasswordRequest = (state, action) => {
    const updating = R.concat(['password'], state.updating)
    return {...state, updating: updating}
}

export const updatePasswordSuccess = (state) => {
    return {...state, updating: [], error: false}
}


export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
    [Types.PROFILE_SUCCESS]: success,
    [Types.PROFILE_FAILURE]: failure,
    [Types.PROFILE_UPDATE_REQUEST]: updateRequest,
    [Types.PROFILE_UPDATE_SUCCESS]: updateSuccess,
    [Types.PASSWORD_UPDATE_REQUEST]: updatePasswordRequest,
    [Types.PASSWORD_UPDATE_SUCCESS]: updatePasswordSuccess,
    [Types.UPDATE_FAILURE]: updateFailure,
    [Types.PROFILE_RESET]: reset,
});
