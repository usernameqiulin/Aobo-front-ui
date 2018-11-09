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

import TransferActions from '../Redux/TransferRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getTransfers(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getTransfers, params, token);
        catchError(response, false);
        yield put(TransferActions.transferSuccess(response.data))
    }catch(err){
        yield* dealError(err, TransferActions.transferFailure);
    }
}

//when user logout, reset to initial state
// export function* resetTransfer(action) {
//     yield put(TransferActions.transferReset())
// }

export function* addTransfer(api, token, action) {
    try{
        const {transfer} = action;
        const response = yield call(api.addTransfer, transfer, token);
        catchError(response, false);
        yield all([
            put(TransferActions.transferAddSuccess()),
            // put(WalletActions.walletUpdateRequest(transfer.source_wallet)),
            // put(WalletActions.walletUpdateRequest(transfer.destination_wallet)),
            put(TransferActions.transferRequest({})),
        ])
    }catch(err){
        yield* dealError(err, TransferActions.transferAddFailure);
    }
}
