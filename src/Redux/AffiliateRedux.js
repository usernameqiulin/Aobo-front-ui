import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    stagesSuccess: ['stagesData'],
    stagesRequest: null,
    clearStages: null,
    stagesFailure: ['message']
})

export const AffiliateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
    error: false,
    data: null,   //计划详情里面的数据
    show: false
}

/* ------------- Reducers ------------- */

// request the data from an api
export const stagesSuccess = (state, action) => {
    const {stagesData} = action;
    return {...state, fetching: false, show: true, data: stagesData}
}

export const fetching = (state, action) => {
    return {...state, fetching: true, error: false}
}
export const stagesFailure = (state, action) => {
    const {message} = action;
    return {...state, fetching: false, show: false, error: message}
}

export const clearStages = (state, action) => {
    return {...INITIAL_STATE}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STAGES_SUCCESS]: stagesSuccess,
    [Types.STAGES_FAILURE]: stagesFailure,
    [Types.STAGES_REQUEST]: fetching,
    [Types.CLEAR_STAGES]: clearStages
})



