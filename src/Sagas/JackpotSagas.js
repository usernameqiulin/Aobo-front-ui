import {call, put} from 'redux-saga/effects';

import JackpotActions from '../Redux/JackpotRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getJackpot(api, token, action) {
    try{
        const response = yield call(api.getJackpot, token);
        catchError(response, false);
        yield put(JackpotActions.jackpotSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, JackpotActions.jackpotFailure);
    }
}
