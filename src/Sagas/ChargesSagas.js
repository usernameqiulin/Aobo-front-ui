import {call, put} from 'redux-saga/effects'

import ChargesActions from '../Redux/ChargesRedux'
import {catchError, dealError} from './ErrorCatch';

export function* getCharges(api, token, action) {
    try{
        const {params} = action
        const response = yield call(api.getCharges, params, token);
        catchError(response);
        yield put(ChargesActions.chargesSuccess(response.data))   
    }catch(err){
        yield* dealError(err, ChargesActions.chargesFailure);
    }
}
