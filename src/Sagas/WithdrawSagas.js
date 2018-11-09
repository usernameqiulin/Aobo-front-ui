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

import {call, put, all} from 'redux-saga/effects'
import {path} from 'ramda'

import WithdrawActions from '../Redux/WithdrawRedux'
import WalletActions from '../Redux/WalletRedux'
import AlertActions from '../Redux/AlertRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getWithdraws(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getWithdraws, params, token);
        catchError(response, false);
        yield put(WithdrawActions.withdrawSuccess(response.data))
    }catch(err){
        dealError(err, WithdrawActions.withdrawFailure);
    }
}

//when user logout, reset to initial state
// export function* resetWithdraw(action) {
//     yield put(WithdrawActions.withdrawSuccess(null))
// }

export function* addWithdraw(api, token, action) {
    try{
        const {withdraw} = action;
        const response = yield call(api.addWithdraw, withdraw, token);
        catchError(response, false);
        let puts = [
            put(WithdrawActions.withdrawAddSuccess(withdraw)),
            put(WithdrawActions.withdrawRequest({})),
        ]
        if (withdraw.wallet === 'MAIN') {
            puts.push(put(WalletActions.walletUpdateRequest('MAIN')))
        } else {
            puts.push(put(WalletActions.walletRequest()))
        }
        yield all(puts)
    }catch(err){
        yield* dealError(err, WalletActions.withdrawAddFailure);
    }
}
