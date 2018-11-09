import {runSaga} from 'redux-saga';

import {getNotifications, consumeAllNotifications, clearNotifications} from '../../src/Sagas/NotificationSagas';
import NotificationActions from '../../src/Redux/NotificationRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('NotificationSagas', () => {
    describe('getNotifications', () => {
        it(responseShould, () => {
            const getNotificationsApi = sinon.stub(api, 'getNotifications');

            responseMock.setCallsReturn(getNotificationsApi);
            const dispatched = responseMock.runSaga(getNotifications, api, tokenMock, NotificationActions.notificationRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetNotificationsAction);

            expect(getNotificationsApi.callCount).to.equal(responseMock.numbers());
            expect(getNotificationsApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getNotificationsApi.restore();
        })
    })
    describe('consumeAllNotifications', () => {
        it(responseShould, () => {
            const clearNotificationsApi = sinon.stub(api, 'clearNotifications');

            responseMock.setCallsReturn(clearNotificationsApi);
            const dispatched = responseMock.runSaga(consumeAllNotifications, api, tokenMock, NotificationActions.notificationConsumeAllRequest());
            const expectDispatched = responseMock.createExpectActions(expectConsumeAllNotificationsAction);

            expect(clearNotificationsApi.callCount).to.equal(responseMock.numbers());
            expect(clearNotificationsApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            clearNotificationsApi.restore();
        })
    })
    describe('clearNotifications', () => {
        it('should reset notification and call api.clearNotifications', () => {
            const clearNotificationsApi = sinon.stub(api, 'clearNotifications');

            let dispatched = [];

            runSaga({
                dispatch: action => dispatched.push(action)
            }, clearNotifications, api, tokenMock, NotificationActions.notificationClearAllRequest());

            expect(dispatched).to.deep.equal([NotificationActions.notificationReset()]);
            expect(clearNotificationsApi.callCount).to.equal(1);
            expect(clearNotificationsApi.calledWith(tokenMock)).to.equal(true);

            clearNotificationsApi.restore();
        })
    })
})

const expectGetNotificationsAction = response => expectAction(
    response, 
    () => NotificationActions.notificationSuccess(response.data.data),
    NotificationActions.notificationFailure,
    {
        catchNoResults: false,
        alertAdd: false
    }
);

const expectConsumeAllNotificationsAction = response => expectAction(
    response,
    NotificationActions.notificationConsumeAllSuccess,
    null,
    {
        catchNoResults: false,
        alertAdd: false
    }
)