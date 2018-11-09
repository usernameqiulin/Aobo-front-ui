/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
import R from 'ramda'
import moment from "moment/moment";
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    playRequest: ['gameId', 'params', 'mode', 'brand'],
    playSuccess: ['data'],
    playFailure: null,
    playCancel: null,
    playClose: ['gameId'],
})

export const PlayTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: null,
    fetchingMode: null,
    data: {},
    error: null,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
    const {gameId, mode} = action
    return {...state, fetching: gameId, fetchingMode: mode}
}
// successful api lookup
export const success = (state, action) => {
    const {data} = action
    let nd = R.merge(state.data, {})
    data.url += '&_=' + moment().unix()
    nd[data.gameId] = data
    return {...state, fetching: null, fetchingMode: null, error: null, data: nd}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, fetchingMode: null, error: true}
}

export const cancel = (state) => {
    return {...state, fetching: false, fetchingMode: null}
}

export const close = (state, action) => {
    const {gameId} = action
    if (!gameId) return INITIAL_STATE
    let d = R.merge(state.data, {})
    delete(d[gameId])
    if (Object.keys(d).length === 0) return {...state, data: {}}
    return {...state, data: d}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PLAY_REQUEST]: request,
    [Types.PLAY_SUCCESS]: success,
    [Types.PLAY_FAILURE]: failure,
    [Types.PLAY_CANCEL]: cancel,
    [Types.PLAY_CLOSE]: close,
})


//data不能出现null undefined 的情况