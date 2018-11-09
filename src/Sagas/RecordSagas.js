import {call, put} from 'redux-saga/effects'

import RecordActions from '../Redux/RecordRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getRecord(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getRecords, params, token);
        catchError(response, false);
        yield put(RecordActions.recordSuccess(response.data))
    }catch(err){
        yield* dealError(err, RecordActions.recordFailure);
    }
}
