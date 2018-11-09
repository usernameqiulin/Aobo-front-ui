/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
import R from "ramda"

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    notificationRequest: null,
    notificationSuccess: ['data'],
    notificationFailure: ['error'],

    notificationGotNew: ['notification'],

    notificationReset: null,

    notificationConsumeAllRequest: null,
    notificationConsumeAllSuccess: null,

    notificationClearAllRequest: null,
})

export const NotificationTypes = Types
export default Creators
// window.NotificationActions = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: null,
    error: null,
    lastUnconsumedNotificationsCount: 0,
    notificationsCount: 0,
    newNotificationAnimation: false,
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
    return {
        ...state,
        fetching: false,
        error: null,
        data,
        notificationsCount: data.length,
        lastUnconsumedNotificationsCount: data.length,
    }
}

// Something went wrong somewhere.
export const failure = (state, action) => {
    const {error} = action
    return {...state, fetching: false, error: error}
}

export const consumeAllSuccess = (state) => {
    let data = R.concat(state.data, [])
    if (!!data.length) {
        data.map(r => r.consumed = true)
    }
    return {
        ...state,
        data,
        lastUnconsumedNotificationsCount: 0,
    }
}

export const reset = (state) => INITIAL_STATE

export const gotNewNotification = (state, action) => {
    const {notification} = action,
        data = R.prepend(notification, state.data),
        lastUnconsumedNotificationsCount = state.lastUnconsumedNotificationsCount + 1,
        notificationsCount = state.notificationsCount + 1
    console.log(notification, state.data, data)
    return {
        ...state,
        data,
        lastUnconsumedNotificationsCount,
        notificationsCount
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.NOTIFICATION_REQUEST]: request,
    [Types.NOTIFICATION_SUCCESS]: success,
    [Types.NOTIFICATION_FAILURE]: failure,

    [Types.NOTIFICATION_RESET]: reset,

    // [Types.NOTIFICATION_CONSUME_ALL_REQUEST]: consumeAllRequest,
    [Types.NOTIFICATION_CONSUME_ALL_SUCCESS]: consumeAllSuccess,

    // [Types.NOTIFICATION_CLEAR_ALL_REQUEST]: clearAllRequest,

    [Types.NOTIFICATION_GOT_NEW]: gotNewNotification,
});
