import {call, put} from 'redux-saga/effects'

import RecentActions from '../Redux/RecentRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getRecent(api, token, action) {
    try{
        const response = yield call(api.getRecent, token);
        catchError(response, false);
        yield put(RecentActions.recentSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, RecentActions.recentFailure);
    }
}
