/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    confirmShow: ['message', 'data'],
    confirmHide: ['data'],
    confirmYes: null,
    confirmNo: null,
})

export const ConfirmTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    show: false,
    message: null,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const show = (state, action) => {
    const {message, data} = action
    return {...state, show: true, message, data}
}

// successful api lookup
export const hide = (state, action) => {
    return {...state, show: false, message: null}
}

// Something went wrong somewhere.
export const yes = (state) => INITIAL_STATE

export const no = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CONFIRM_SHOW]: show,
    [Types.CONFIRM_HIDE]: hide,
    [Types.CONFIRM_YES]: yes,
    [Types.CONFIRM_NO]: no,
});
