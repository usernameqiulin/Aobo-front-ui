import {call, put} from 'redux-saga/effects';

import CouponActions from '../Redux/CouponRedux'
import {catchError, dealError} from './ErrorCatch';

export function* getCoupons(api, token, action) {
    try{
        const {params} = action
        const response = yield call(api.getCoupons, params, token);
        catchError(response, false);
        yield put(CouponActions.couponSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, CouponActions.couponFailure);
    }
}
