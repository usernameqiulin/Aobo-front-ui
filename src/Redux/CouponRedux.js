/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    couponRequest: ['params'],
    couponSuccess: ['data'],
    couponFailure: null,
    couponReset: null,
});

export const CouponTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: false,
};

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
};

// Something went wrong somewhere.
export const failure = (state, action) => {
    return {...state, fetching: false, error: true}
};

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.COUPON_REQUEST]: request,
    [Types.COUPON_SUCCESS]: success,
    [Types.COUPON_FAILURE]: failure,
    [Types.COUPON_RESET]: reset,
});
