/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    gamesRequest: ['params'],
    gamesSuccess: ['data'],
    gamesFailure: null,
    gamesLatestVisit: ['time'],
})

export const GamesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: false,
    latestVisit: null,
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
    return {...state, fetching: false, error: null, data}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true}
}

export const setLatestVisit = (state, action) => {
    const {time} = action;
    return {...state, latestVisit: time}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GAMES_REQUEST]: request,
    [Types.GAMES_SUCCESS]: success,
    [Types.GAMES_FAILURE]: failure,
    [Types.GAMES_LATEST_VISIT]: setLatestVisit,
});
