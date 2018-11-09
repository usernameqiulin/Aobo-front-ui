import {createReducer, createActions} from 'reduxsauce'

const {Types, Creators} = createActions({
    checkoutRequest: ['data'],
    checkoutSuccess: null,
    checkoutFailure: ['error'],
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: null,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
    const {data} = action
    return {...state, fetching: true, data}
}

// successful api lookup
export const success = (state) => {
    return {...state, fetching: false, error: false, data: null}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHECKOUT_REQUEST]: request,
    [Types.CHECKOUT_SUCCESS]: success,
    [Types.CHECKOUT_FAILURE]: failure,
});
