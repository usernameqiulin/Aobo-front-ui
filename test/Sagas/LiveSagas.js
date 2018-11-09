import {getLive} from '../../src/Sagas/LiveSagas';
import LiveActions from '../../src/Redux/LiveRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('LiveSagas', () => {
    describe('getLive', () => {
        it(responseShould, () => {
            const getLiveApi = sinon.stub(api, 'getLive');

            responseMock.setCallsReturn(getLiveApi);
            const dispatched = responseMock.runSaga(getLive, api, tokenMock, LiveActions.liveRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetLiveAction);

            expect(getLiveApi.callCount).to.equal(responseMock.numbers());
            expect(getLiveApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getLiveApi.restore();
        })
    })
})

const expectGetLiveAction = response => expectAction(
    response,
    () => LiveActions.liveSuccess(response.data.data),
    LiveActions.liveFailure,
    {
        catchNoResults: false
    }
)