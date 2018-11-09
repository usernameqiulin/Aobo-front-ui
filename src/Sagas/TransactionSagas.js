import {call, put} from 'redux-saga/effects'

import TransactionActions from '../Redux/TransactionRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getTransactions(api, token, action) {
    try{
        const {params} = action
        const response = yield call(api.getTransactions, params, token);
        catchError(response, false);
        yield put(TransactionActions.transactionSuccess(response.data))
    }catch(err){
        yield* dealError(err, TransactionActions.transactionFailure)
    }
}
