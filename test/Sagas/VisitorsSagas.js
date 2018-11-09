import {getVisitors} from '../../src/Sagas/VisitorsSagas';
import VisitorsActions from '../../src/Redux/VisitorsRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';


describe('VisitorsSagas', () => {
    describe('getVisitors', () => {
        it(responseShould, () => {
            const getVisitorsApi = sinon.stub(api, 'getVisitors');

            responseMock.setCallsReturn(getVisitorsApi);
            const dispatched = responseMock.runSaga(getVisitors, api, tokenMock, VisitorsActions.visitorsRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetVisitorsAction);

            expect(getVisitorsApi.callCount).to.equal(responseMock.numbers());
            expect(getVisitorsApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getVisitorsApi.restore();
        })
    })
})

const expectGetVisitorsAction = response => expectAction(
    response,
    () => VisitorsActions.visitorsSuccess(response.data),
    VisitorsActions.visitorsFailure
)