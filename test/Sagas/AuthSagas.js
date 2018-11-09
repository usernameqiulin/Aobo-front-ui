import {runSaga} from 'redux-saga'

import {refresh, requestLogin, onLoginSuccess, requestRegister, logout} from '../../src/Sagas/AuthSagas';
import AuthActions from  '../../src/Redux/AuthRedux';
import {responseMock, tokenMock, requestParamsMock} from '../mock';
import {expectAction, responseShould} from '../helper';

import ProfileActions from '../../src/Redux/ProfileRedux'
import FavoriteActions from '../../src/Redux/FavoriteRedux'
import RecordActions from '../../src/Redux/RecordRedux'
import ReliefActions from '../../src/Redux/ReliefRedux'
import RebateActions from '../../src/Redux/RebateRedux'
import DepositActions from '../../src/Redux/DepositRedux'
import WithDrawActions from '../../src/Redux/WithdrawRedux'
import CouponActions from '../../src/Redux/CouponRedux'
import CardActions from '../../src/Redux/CardRedux'
import BigwinActions from '../../src/Redux/BigwinRedux'
import WalletActions from '../../src/Redux/WalletRedux'
import RecentActions from '../../src/Redux/RecentRedux'
import TransactionActions from '../../src/Redux/TransactionRedux'
import TransferActions from '../../src/Redux/TransferRedux'
import NotificationActions from '../../src/Redux/NotificationRedux'
import MembersActions from '../../src/Redux/MembersRedux'
import GrossActions from '../../src/Redux/GrossRedux'
import GrossDetailActions from '../../src/Redux/GrossDetailRedux'
import ChargesActions from '../../src/Redux/ChargesRedux'
import HistoryActions from '../../src/Redux/HistoryRedux'
import ChargesDetailActions from '../../src/Redux/ChargesDetailRedux'
import VisitorsActions from '../../src/Redux/VisitorsRedux' 
import SportsActions from '../../src/Redux/SportsRedux'

describe('AuthSagas', () => {
    describe('refresh', () => {
        it(responseShould, () => {
            const refreshApi = sinon.stub(api, 'refresh');

            responseMock.setCallsReturn(refreshApi);
            const dispatched = responseMock.runSaga(refresh, api, tokenMock, AuthActions.refreshRequest(requestParamsMock));

            expect(refreshApi.callCount).to.equal(responseMock.numbers());
            expect(refreshApi.alwaysCalledWith(requestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(responseMock.createExpectActions(expectAuthAction));

            refreshApi.restore();
        })
    })
    describe('requestLogin', () => {
        it('window.ABAccount.openLoginForm should be called with callback function(onLoginSuccess)', () => {
            window.ABAccount = {
                openLoginForm: sinon.stub()
            };
            runSaga({}, requestLogin, AuthActions.authRequest());

            expect(window.ABAccount.openLoginForm.calledOnceWith(onLoginSuccess)).to.equal(true);

            window.ABAccount = null;
        })
    })
    describe('requestRegister', () => {
        it('window.ABAccount.openRegisterForm should be called with callback function(onLoginSuccess)', () => {
            window.ABAccount = {
                openRegistrationForm: sinon.stub()
            };
            runSaga({}, requestRegister, AuthActions.registerRequest());

            expect(window.ABAccount.openRegistrationForm.calledOnceWith(onLoginSuccess)).to.equal(true);

            window.ABAccount = null;
        })
    })
    describe('onLoginSuccess', () => {
        it('should put authSuccess action with data', () => {
            window.__dispatch = sinon.stub();
            const testData = 'test-data';
            onLoginSuccess(testData);
            expect(window.__dispatch.calledOnceWith(AuthActions.authSuccess(testData))).to.equal(true);
        })
    })
    describe('logout', () => {
        it('should clear all information about user', () => {
            const logoutApi = sinon.stub(api, 'logout');

            let dispatched = [];
            runSaga({
                dispatch: action => dispatched.push(action)
            }, logout, api, tokenMock, AuthActions.logoutRequest());

            const expectDispatched = [
                ProfileActions.profileReset(),
                FavoriteActions.favoriteReset(),
                RecordActions.recordReset(),
                ReliefActions.reliefReset(),
                RebateActions.rebateReset(),
                DepositActions.depositReset(),
                WithDrawActions.withdrawReset(),
                CouponActions.couponReset(),
                CardActions.cardReset(),
                BigwinActions.bigwinReset(),
                WalletActions.walletReset(),
                RecentActions.recentReset(),
                TransactionActions.transactionReset(),
                TransferActions.transferReset(),
                AuthActions.logoutSuccess(),
                NotificationActions.notificationReset(),
                MembersActions.membersReset(),
                GrossActions.grossReset(),
                GrossDetailActions.clearGrossDetail(),
                ChargesActions.chargesReset(),
                ChargesDetailActions.chargesDetailReset(),
                HistoryActions.historyReset(),
                VisitorsActions.visitorsReset(),
                SportsActions.sportsLogout(),
            ];

            expect(logoutApi.calledOnceWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.include.members(expectDispatched);

            logoutApi.restore();
        })
    })
})

const expectAuthAction = (response) => expectAction(response, () => AuthActions.refreshSuccess(response.data.data), null, {catchNoResults: false});