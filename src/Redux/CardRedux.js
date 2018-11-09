/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    cardRequest: null,
    cardSuccess: ['data'],
    cardFailure: ['error'],

    cardAddRequest: ['card'],
    cardAddSuccess: null,
    cardAddFailure: ['error'],

    cardUpdateRequest: ['id', 'card'],
    cardUpdateSuccess: null,
    cardUpdateFailure: ['error'],

    cardDeleteRequest: ['id', 'params'],
    cardDeleteSuccess: null,
    cardDeleteFailure: ['id', 'error'],

    cardReset: null,
})

export const CardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    fetchError: null,
    adding: false,
    updating: null,
    deleting: null,
    addError: null,
    deleteError: null,
    updateError: null,
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
    return {...state, fetching: false, fetchError: null, data}
}

// Something went wrong somewhere.
export const failure = (state, action) => {
    const {error} = action
    return {...state, fetching: false, fetchError: error}
}

export const addRequest = (state) => {
    return {...state, adding: true}
}

// successful api lookup
export const addSuccess = (state) => {
    return {...state, adding: false, addError: null}
}

export const addFailure = (state, action) => {
    const {error} = action
    return {...state, adding: false, addError: error}
}

export const updateRequest = (state, action) => {
    const {id} = action
    return {...state, updating: id}
}

// successful api lookup
export const updateSuccess = (state, action) => {
    return {...state, updating: false, updateError: null}
}

export const updateFailure = (state, action) => {
    const {error} = action
    return {...state, updating: false, updateError: error}
}

export const deleteRequest = (state, action) => {
    const {id} = action
    return {...state, deleting: id}
}

// successful api lookup
export const deleteSuccess = (state) => {
    return {...state, deleting: null, deleteError: null}
}

export const deleteFailure = (state, action) => {
    const {id, error} = action
    return {...state, deleting: null, deleteError: {id, error}}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CARD_REQUEST]: request,
    [Types.CARD_SUCCESS]: success,
    [Types.CARD_FAILURE]: failure,

    [Types.CARD_ADD_REQUEST]: addRequest,
    [Types.CARD_ADD_SUCCESS]: addSuccess,
    [Types.CARD_ADD_FAILURE]: addFailure,

    [Types.CARD_UPDATE_REQUEST]: updateRequest,
    [Types.CARD_UPDATE_SUCCESS]: updateSuccess,
    [Types.CARD_UPDATE_FAILURE]: updateFailure,

    [Types.CARD_DELETE_REQUEST]: deleteRequest,
    [Types.CARD_DELETE_SUCCESS]: deleteSuccess,
    [Types.CARD_DELETE_FAILURE]: deleteFailure,

    [Types.CARD_RESET]: reset,
});
