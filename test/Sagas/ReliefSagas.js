import {getReliefs, addRelief} from '../../src/Sagas/ReliefSagas';
import ReliefActions from '../../src/Redux/ReliefRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const reliefRequestParamsMock = Symbol('test-params');

const reliefAddRequestParamsMock = Symbol('test-params');

describe('ReliefSagas', () => {
    describe('getReliefs', () => {
        it(responseShould, () => {
            const getReliefsApi = sinon.stub(api, 'getReliefs');

            responseMock.setCallsReturn(getReliefsApi);
            const dispatched = responseMock.runSaga(getReliefs, api, tokenMock, ReliefActions.reliefRequest(reliefRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetReliefsAction);

            expect(getReliefsApi.callCount).to.equal(responseMock.numbers());
            expect(getReliefsApi.alwaysCalledWith(reliefRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getReliefsApi.restore();
        })
    })
    describe('addRelief', () => {
        it(responseShould, () => {
            const addReliefApi = sinon.stub(api, 'addRelief');

            responseMock.setCallsReturn(addReliefApi);
            const dispatched = responseMock.runSaga(addRelief, api, tokenMock, ReliefActions.reliefAddRequest(reliefAddRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectAddReliefAction);

            expect(addReliefApi.callCount).to.equal(responseMock.numbers());
            expect(addReliefApi.alwaysCalledWith(reliefAddRequestParamsMock, tokenMock));
            expect(dispatched).to.deep.equal(expectDispatched);

            addReliefApi.restore();
        })
    })
})

const expectGetReliefsAction = response => expectAction(
    response,
    () => ReliefActions.reliefSuccess(response.data),
    ReliefActions.reliefFailure,
    {
        catchNoResults: false
    }
)

const expectAddReliefAction = response => expectAction(
    response,
    () => [
        ReliefActions.reliefAddSuccess(),
        ReliefActions.reliefRequest({}),
    ],
    ReliefActions.reliefAddFailure,
    {
        catchNoResults: false
    }
)