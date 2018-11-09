/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    settingRequest: null,
    settingSuccess: ['data'],
    settingFailure: null,
    settingUpdateRequest: ['setting'],
    settingUpdateSuccess: ['data'],
    settingReset: null,
})

export const SettingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: {currency: 'CNY', timezone: '+08:00'},
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
    return {...state, fetching: false, error: false, data}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const updateRequest = (state, action) => {
    return {...state, fetching: true}
}

// successful api lookup
export const updateSuccess = (state, action) => {
    const {data} = action
    return {...state, fetching: false, error: false, data}
}

export const reset = (state) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SETTING_REQUEST]: request,
    [Types.SETTING_SUCCESS]: success,
    [Types.SETTING_FAILURE]: failure,
    [Types.SETTING_UPDATE_REQUEST]: updateRequest,
    [Types.SETTING_UPDATE_SUCCESS]: updateSuccess,
    [Types.SETTING_RESET]: reset,
});
