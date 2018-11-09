import {getRecent} from '../../src/Sagas/RecentSagas';
import RecentActions from '../../src/Redux/RecentRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('RecentSagas', () => {
    describe('getRecent', () => {
        it(responseShould, () => {
            const getRecentApi = sinon.stub(api, 'getRecent');

            responseMock.setCallsReturn(getRecentApi);
            const dispatched = responseMock.runSaga(getRecent, api, tokenMock, RecentActions.recentRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetRecentAction);

            expect(getRecentApi.callCount).to.equal(responseMock.numbers());
            expect(getRecentApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getRecentApi.restore();
        })
    })
})

const expectGetRecentAction = response => expectAction(
    response,
    () => RecentActions.recentSuccess(response.data.data),
    RecentActions.recentFailure,
    {
        catchNoResults: false
    }
)