import {put, call} from 'redux-saga/effects';

import GrossActions from '../Redux/GrossRedux';
import {AccountError, catchError, dealError} from './ErrorCatch';

export function* getGross(api, token, action){   //监听action{type: 'GROSS_REQUEST'}
    try{
        const params = action.params;
        if(params.username && (params.username.length < 4 || params.username.length > 17)){
            throw new AccountError('username limit', 2);
        }
        const response = yield call(api.getGross, params, token);
        catchError(response);
        yield put(GrossActions.grossSuccess(response.data));
    }catch(err){
        yield* dealError(err, GrossActions.grossFailure);
    }
}