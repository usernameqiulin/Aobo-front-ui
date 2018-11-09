import {call, put} from 'redux-saga/effects'

import WalletActions from '../Redux/WalletRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getWallets(api, token, action) {
    try{
        const response = yield call(api.getWallets, token);
        catchError(response, false);
        yield put(WalletActions.walletSuccess(response.data.data));
    }catch(err){
        yield* dealError(err, WalletActions.walletFailure);
    }
}

export function* updateWallet(api, token, action) {
    try{
        const {code} = action
        const response = yield call(api.updateWallet, code, token);
        catchError(response, false);
        yield put(WalletActions.walletUpdateSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, WalletActions.walletFailure);
    }
}
