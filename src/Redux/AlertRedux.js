import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    alertAdd: ['message', 'level'],
    alertDismiss: null,
})

export const AlertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    message: '',
    level: '',
}

/* ------------- Reducers ------------- */

// request the data from an api
export const add = (state, action) => {
    const {message, level} = action
    return {...state, message, level}
}

export const dismiss = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ALERT_ADD]: add,
    [Types.ALERT_DISMISS]: dismiss,
})



