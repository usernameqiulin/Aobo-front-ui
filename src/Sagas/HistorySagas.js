import {call, put, all, select} from 'redux-saga/effects'
import {path} from 'ramda'

import HistoryActions from '../Redux/HistoryRedux'
import {catchError, dealError} from './ErrorCatch';

export function* getHistory(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getHistory, params, token);
        catchError(response);
        yield put(HistoryActions.historySuccess(response.data));
    }catch(err){
        yield* dealError(err, HistoryActions.historyFailure);
    }
}
