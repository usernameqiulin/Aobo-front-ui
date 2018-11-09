import {call, put} from 'redux-saga/effects'

import VipActions from '../Redux/VipRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getVip(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getVip, params, token);
        catchError(response, false);
        yield put(VipActions.vipSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, VipActions.vipFailure);
    }
}
