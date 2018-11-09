import {getCharges} from '../../src/Sagas/ChargesSagas';
import ChargesActions from  '../../src/Redux/ChargesRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';

describe('ChargesSagas', () => {
    describe('getCharges', () => {
        it(responseShould, () => {
            const getChargesApi = sinon.stub(api, 'getCharges');

            responseMock.setCallsReturn(getChargesApi);
            const dispatched = responseMock.runSaga(getCharges, api, tokenMock, ChargesActions.chargesRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetChargesAction);

            expect(getChargesApi.callCount).to.equal(responseMock.numbers());
            expect(getChargesApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getChargesApi.restore();
        })
    })
})

const expectGetChargesAction = response => expectAction(
    response,
    () => ChargesActions.chargesSuccess(response.data),
    ChargesActions.chargesFailure
)