/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to Sagas/index.js
 *  - This template uses the api declared in Sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {call, put} from 'redux-saga/effects'

import ProfileActions from '../Redux/ProfileRedux'
import { catchError, dealError } from './ErrorCatch';

/**
 * @todo: if profile.data.currency !== config.data.currency then update config.data.currency
 * @todo: set window.lz_data[111] = profile.username
 *
 * @param api
 * @param token
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* getProfile(api, token, action) {
    try{
        const response = yield call(api.getProfile, token);
        catchError(response, false);
        yield put(ProfileActions.profileSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, ProfileActions.profileFailure);
    }
}

//when user logout, reset to initial state
//@todo should do here?
// export function* resetProfile(action) {
//     yield put(ProfileActions.profileSuccess({data: null}))
// }

export function* updateProfile(api, token, action) {
    try{
        const {profile} = action;
        const response = yield call(api.updateProfile, profile, token);
        catchError(response, false);
        yield put(ProfileActions.profileUpdateSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, ProfileActions.profileFailure);
    }
}

export function* updatePassword(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.updatePassword, params, token);
        catchError(response, false);
        yield put(ProfileActions.passwordUpdateSuccess());
    }catch(err){
        yield* dealError(err, ProfileActions.updateFailure)
    }
}
