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

import RebateActions from '../Redux/RebateRedux'
import AlertActions from '../Redux/AlertRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getRebates(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getRebates, params, token);
        catchError(response, false);
        yield put(RebateActions.rebateSuccess(response.data));
    }catch(err){
        yield* dealError(err, RebateActions.rebateFailure);
    }
}

//when user logout, reset to initial state
//@todo should do here?
// export function* resetRebate(action) {
//     yield put(RebateActions.rebateSuccess(null))
// }

export function* addRebate(api, token, action) {
    try{
        const {rebate} = action;
        const response = yield call(api.addRebate, rebate, token);
        catchError(response, false);
        yield all([
            put(RebateActions.rebateAddSuccess()),
            put(AlertActions.alertAdd(rebate.product + '_REBATE_REDEEM_SUCCESS', 'success')),
            put(RebateActions.rebateRequest({})),
        ])
    }catch(err){
        yield* dealError(err, RebateActions.rebateAddFailure);
    }
}

export function* calculateRebate(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.calculateRebate, params, token);
        catchError(response, false);
        yield put(RebateActions.rebateCalculateSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, RebateActions.rebateCalculateFailure);
    }
}
