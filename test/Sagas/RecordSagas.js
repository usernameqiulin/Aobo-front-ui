import {getRecord} from '../../src/Sagas/RecordSagas';
import RecordActions from '../../src/Redux/RecordRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const recordRequestParamsMock = 'test-params';

describe('RecordSagas', () => {
    describe('getRecord', () => {
        it(responseShould, () => {
            const getRecordsApi = sinon.stub(api, 'getRecords');

            responseMock.setCallsReturn(getRecordsApi);
            const dispatched = responseMock.runSaga(getRecord, api, tokenMock, RecordActions.recordRequest(recordRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetRecordAction);

            expect(getRecordsApi.callCount).to.equal(responseMock.numbers());
            expect(getRecordsApi.alwaysCalledWith(recordRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getRecordsApi.restore();
        })
    })
})

const expectGetRecordAction = response => expectAction(
    response,
    () => RecordActions.recordSuccess(response.data),
    RecordActions.recordFailure,
    {
        catchNoResults: false
    }
)