import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    grossDetailSuccess: ['grossDetail'],
    grossDetailRequest: ['params'],
    clearGrossDetail: null,
    grossDetailFailure: ['message', 'userId']
})

export const GrossDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {}

/* ------------- Reducers ------------- */

// request the data from an api
export const grossDetailSuccess = (state, action) => {
    const {grossDetail} = action;
    state[grossDetail.userId].fetching = false;
    state[grossDetail.userId].show = true;
    state[grossDetail.userId].data = grossDetail;
    return {...state}
}
export const grossDetailFailure = (state, action) => {
    const {message, userId} = action;
    state[userId].fetching = false;
    state[userId].error = message;
    state[userId].show = false;
    return {...state}
}
export const clearGrossDetail = (state, action) => INITIAL_STATE

export const fetching = (state, action) => {
    const {params} = action;
    state[params.userId] = state[params.userId] ? state[params.userId] : {}
    state[params.userId] = {...state[params.userId], fetching: true, error: false}
    return {...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GROSS_DETAIL_SUCCESS]: grossDetailSuccess,
    [Types.CLEAR_GROSS_DETAIL]: clearGrossDetail,
    [Types.GROSS_DETAIL_REQUEST]: fetching,
    [Types.GROSS_DETAIL_FAILURE]: grossDetailFailure
})



