import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    membersSuccess: ['members'],
    membersRequest: ['params'],
    membersFailure: ['message'],
    membersReset: null
})

export const MembersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
    data: null,
    error: false,
    show: false,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const memberSuccess = (state, action) => {
    const {members} = action
    return {...state, fetching: false, show: true, data: members}
}

export const membersFailure = (state, action) => {
    const {message} = action;
    return {...state, fetching: false, show: false, error: message}
}

export const fetching = (state, action) => {
    return {...state, fetching: true, error: false}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.MEMBERS_SUCCESS]: memberSuccess,
    [Types.MEMBERS_FAILURE]: membersFailure,
    [Types.MEMBERS_REQUEST]: fetching,
    [Types.MEMBERS_RESET]: reset
})



