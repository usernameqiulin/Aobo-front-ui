import {call, put, all, throttle} from 'redux-saga/effects';
import {path} from 'ramda'

import LiveActions from '../Redux/LiveRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getLive(api, token, action) {
    try{
        const response = yield call(api.getLive, token);
        catchError(response, false);
        yield put(LiveActions.liveSuccess(response.data.data));
    }catch(err){
        yield* dealError(err, LiveActions.liveFailure);
    }
}
