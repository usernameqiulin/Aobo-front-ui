import {call, put} from 'redux-saga/effects'

import VisitorsActions from '../Redux/VisitorsRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getVisitors(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getVisitors, params, token);
        catchError(response);
        yield put(VisitorsActions.visitorsSuccess(response.data))    
    }catch(err){
        yield* dealError(err, VisitorsActions.visitorsFailure);
    }
}
