import {getHistory} from '../../src/Sagas/HistorySagas';
import HistoryActions from '../../src/Redux/HistoryRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';

describe('HistorySagas', () => {
    describe('getHistory', () => {
        it(responseShould, () => {
            const getHistoryApi = sinon.stub(api, 'getHistory');

            responseMock.setCallsReturn(getHistoryApi);
            const dispatched = responseMock.runSaga(getHistory, api, tokenMock, HistoryActions.historyRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetHistoryAction);

            expect(getHistoryApi.callCount).to.equal(responseMock.numbers());
            expect(getHistoryApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getHistoryApi.restore();
        })
    })
})

const expectGetHistoryAction = response => expectAction(
    response,
    () => HistoryActions.historySuccess(response.data),
    HistoryActions.historyFailure
)