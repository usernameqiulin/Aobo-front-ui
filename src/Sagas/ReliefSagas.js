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

import {all, call, put} from 'redux-saga/effects'

import ReliefActions from '../Redux/ReliefRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getReliefs(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getReliefs, params, token);
        catchError(response, false);
        yield put(ReliefActions.reliefSuccess(response.data))
    }catch(err){
        yield* dealError(err, ReliefActions.reliefFailure);
    }
}

//when user logout, reset to initial state
// export function* resetRelief(action) {
//     yield put(ReliefActions.reset())
// }

export function* addRelief(api, token, action) {
    try{
        const {relief} = action;
        const response = yield call(api.addRelief, relief, token);
        catchError(response, false);
        yield all([
            put(ReliefActions.reliefAddSuccess()),
            put(ReliefActions.reliefRequest({})),
        ]);
    }catch(err){
        yield* dealError(err, ReliefActions.reliefAddFailure);
    }
}
