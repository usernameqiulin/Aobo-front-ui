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

import {call, put, select, all} from 'redux-saga/effects'
import {path} from 'ramda'

import BigwinActions from '../Redux/BigwinRedux'
import AlertActions from '../Redux/AlertRedux'
import {catchError, dealError} from './ErrorCatch';

export function * getBigwins(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getBigwins, params, token);
        catchError(response, false);
        yield put(BigwinActions.bigwinSuccess(response.data))
    }catch(err){
        yield* dealError(err, BigwinActions.bigwinFailure);
    }
}
//when user logout, reset to initial state
// export function * resetBigwin(action) {
//     yield put(BigwinActions.bigwinSuccess(null))
// }

export function * addBigwin(api, token, action) {
    /*
        取消bigwinAddSuccess action，因为bigwinAddSuccess和bigwinRequest同时dispatch， 状态不可预估， 还有就是采用再发一次请求获取数据的方法， bigwinAddSuccess变得无关紧要
    */
    try{
        const {bigwin} = action;
        const response = yield call(api.addBigwin, bigwin, token);
        catchError(response, false);
        yield all([
            // put(BigwinActions.bigwinAddSuccess()),      
            put(BigwinActions.bigwinRequest({})),
        ])
    }catch(err){
        yield* dealError(err, BigwinActions.bigwinFailure);
    }
}
