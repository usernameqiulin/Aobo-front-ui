import {put, all, select, call} from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import ProfileActions from '../Redux/ProfileRedux'
import FavoriteActions from '../Redux/FavoriteRedux'
import RecordActions from '../Redux/RecordRedux'
import ReliefActions from '../Redux/ReliefRedux'
import RebateActions from '../Redux/RebateRedux'
import DepositActions from '../Redux/DepositRedux'
import WithDrawActions from '../Redux/WithdrawRedux'
import CouponActions from '../Redux/CouponRedux'
import CardActions from '../Redux/CardRedux'
import BigwinActions from '../Redux/BigwinRedux'
import WalletActions from '../Redux/WalletRedux'
import RecentActions from '../Redux/RecentRedux'
import TransactionActions from '../Redux/TransactionRedux'
import TransferActions from '../Redux/TransferRedux'
import NotificationActions from '../Redux/NotificationRedux'
import MembersActions from '../Redux/MembersRedux'
import GrossActions from '../Redux/GrossRedux'
import GrossDetailActions from '../Redux/GrossDetailRedux'
import ChargesActions from '../Redux/ChargesRedux'
import HistoryActions from '../Redux/HistoryRedux'
import ChargesDetailActions from '../Redux/ChargesDetailRedux'
import VisitorsActions from '../Redux/VisitorsRedux' 
import SportsActions from '../Redux/SportsRedux'

import {path} from "ramda"
import AlertActions from "../Redux/AlertRedux"

import {catchError, dealError} from './ErrorCatch'

export function* requestLogin(action) {
    yield call(window.ABAccount.openLoginForm, onLoginSuccess)
}

export function* requestRegister(action) {
    yield call(window.ABAccount.openRegistrationForm, onLoginSuccess)
}

export function onLoginSuccess(data) {
    window.__dispatch((AuthActions.authSuccess(data)))
}

export function* logout(api, token, action) {
    // const token = yield select(selectToken)
    // const response = yield call(api.logout, token)
    // console.log(token, response)
    yield all([
        call(api.logout, token),
        put(ProfileActions.profileReset()),
        put(FavoriteActions.favoriteReset()),
        put(RecordActions.recordReset()),
        put(ReliefActions.reliefReset()),
        put(RebateActions.rebateReset()),
        put(DepositActions.depositReset()),
        put(WithDrawActions.withdrawReset()),
        put(CouponActions.couponReset()),
        put(CardActions.cardReset()),
        put(BigwinActions.bigwinReset()),
        put(WalletActions.walletReset()),
        put(RecentActions.recentReset()),
        put(TransactionActions.transactionReset()),
        put(TransferActions.transferReset()),
        put(AuthActions.logoutSuccess()),
        put(NotificationActions.notificationReset()),
        put(MembersActions.membersReset()),
        put(GrossActions.grossReset()),
        put(GrossDetailActions.clearGrossDetail()),
        put(ChargesActions.chargesReset()),
        put(ChargesDetailActions.chargesDetailReset()),
        put(HistoryActions.historyReset()),
        put(VisitorsActions.visitorsReset()),
        put(SportsActions.sportsLogout()),
    ])
}

export function * refresh(api, token, action) {
    try{
        const {param} = action;
        const response = yield call(api.refresh, param, token);
        catchError(response, false);
        yield all([
            put(AuthActions.refreshSuccess(response.data.data)),
        ])
    }catch(err){
        yield* dealError(err, null);
    }
}

