import {put, call} from 'redux-saga/effects';

import GrossDetailActions from '../Redux/GrossDetailRedux';
import {catchError, dealError} from './ErrorCatch';

export function* getGrossDetail(api, token, action){   //监听action{type: 'GROSS_DETAIL_REQUEST'}
    const params = action.params;
    try{
        const response = yield call(api.getGrossDetail, params, token);
        catchError(response);
        response.data.userId = params.userId;
        yield put(GrossDetailActions.grossDetailSuccess(response.data));
    }catch(err){
        yield* dealError(err, errMessage => GrossDetailActions.grossDetailFailure(errMessage, params.userId));
    }
}