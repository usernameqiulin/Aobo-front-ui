/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    liveRequest: ['params'],   // need params ??
    liveSuccess: ['data'],
    liveFailure: null,
});

export const LiveTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
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
export const failure = (state) => {
    return {...state, fetching: false, error: true}
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LIVE_REQUEST]: request,
    [Types.LIVE_SUCCESS]: success,
    [Types.LIVE_FAILURE]: failure,
});
