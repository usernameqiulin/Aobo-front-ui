import {call, put} from 'redux-saga/effects'

import ChargesDetailActions from '../Redux/ChargesDetailRedux'
import {catchError, dealError} from './ErrorCatch';

export function* getChargesDetail(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getChargesDetail, params, token);
        catchError(response);
        yield put(ChargesDetailActions.chargesDetailSuccess(response.data));
    }catch(err){
        yield* dealError(err, ChargesDetailActions.chargesDetailFailure);
    }
}
