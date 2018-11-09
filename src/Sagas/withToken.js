import {call, put, select, all} from 'redux-saga/effects'
import moment from "moment/moment"

import {selectToken} from '../helper'
import AuthActions from '../Redux/AuthRedux'

/**
 * 1. if !!token check is going to expire
 * 2. if action.type in AUTH_ONLY_ACTIONS && (!token || isExpired) put(AuthActions.authRequest())
 * 2. check token is going to expire, refresh token here use yield all([])
 * @param saga
 * @param args
 * @returns {Function}
 */
const AUTH_ONLY_ACTIONS = [
    'BIGWIN_REQUEST',
    'BIGWIN_ADD_REQUEST',
    'CARD_REQUEST',
    'CARD_ADD_REQUEST',
    'CARD_UPDATE_REQUEST',
    'CARD_DELETE_REQUEST',
    'CHECKOUT_REQUEST',
    'COUPON_REQUEST',
    'DEPOSIT_REQUEST',
    'METHOD_REQUEST',
    'DEPOSIT_ADD_REQUEST',
    'ORDER_UPDATE_REQUEST',
    'FAVORITE_REQUEST',
    'FAVORITE_ADD_REQUEST',
    'FAVORITE_DELETE_REQUEST',
    'PROFILE_REQUEST',
    'PROFILE_UPDATE_REQUEST',
    'PASSWORD_UPDATE_REQUEST',
    'REBATE_REQUEST',
    'REBATE_ADD_REQUEST',
    'REBATE_CALCULATE_REQUEST',
    'RECENT_REQUEST',
    'RECORD_REQUEST',
    'RELIEF_REQUEST',
    'RELIEF_ADD_REQUEST',
    'TRANSACTION_REQUEST',
    'TRANSFER_REQUEST',
    'TRANSFER_ADD_REQUEST',
    'WALLET_REQUEST',
    'WALLET_UPDATE_REQUEST',
    'WALLET_UPDATE_BALANCE',
    'WITHDRAW_REQUEST',
    'WITHDRAW_ADD_REQUEST',
]

const withToken = (saga, ...args) => {
    return function* (action) {
        const auth = yield select(selectToken)
        const token =  !!auth ? auth.access_token : null
        const isNeedRefresh = !!auth && auth.expires_at - moment().unix() <= 10 && auth.expires_at - moment().unix() >= 1
        const isExpired = !!auth && auth.expires_at <= moment().unix()

        // auth only && (no token || expired)
        if (AUTH_ONLY_ACTIONS.includes(action.type)) {
            // console.log(action.type, isExpired, isNeedRefresh)
            if (!token) {
                //未登录，弹出登录框
                return yield put(AuthActions.authRequest())
            }
            if (!!token && isExpired) {
                //已过期, 退出并清除本地数据
                //弹出登录框
                return yield all([
                    put(AuthActions.logoutRequest()),
                    put(AuthActions.authRequest()),
                ])
            }
        }
        let toRun = [
            call(saga, ...args, token, action)
        ]
        if (!!token && isNeedRefresh) {
            toRun.push(put(AuthActions.refreshRequest({refresh_token: auth.refresh_token})))
        }
        return yield all(toRun)
    }
}

export default withToken