import {put, call, take, all} from 'redux-saga/effects';

import AffiliateActions from '../Redux/AffiliateRedux';
import {AccountError, catchError, dealError} from './ErrorCatch';

export function* getStages(api, action){   //监听action{type: 'STAGES_REQUEST'}
    try{
        const response = yield call(api.getStages);
        catchError(response);
        yield put(AffiliateActions.stagesSuccess(response.data));
    }catch(err){
        yield* dealError(err, AffiliateActions.stagesFailure, {diffType: false}); 
    }
}

