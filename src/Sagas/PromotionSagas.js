import {call, put} from 'redux-saga/effects'

import PromotionActions from '../Redux/PromotionRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getPromotion(api, token, action) {
    try{
        const response = yield call(api.getPromotion, token);
        catchError(response, false);
        yield put(PromotionActions.promotionSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, PromotionActions.promotionFailure);
    }
}
