import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pusherRequest: null,
  pusherSuccess: ['data'],
  pusherFailure: null,
})

export const PusherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: null,
  fetching: null,
  error: false
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
    return {...state, fetching: true, data: null}
}
// successful api lookup
export const success = (state, action) => {
  const { data } = action
  return {...state, fetching: false, error: false, data: data}
}

// Something went wrong somewhere.
export const failure = state => {
    return {...state, fetching: false, error: true, data: null}
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PUSHER_REQUEST]: request,
  [Types.PUSHER_SUCCESS]: success,
  [Types.PUSHER_FAILURE]: failure
})
