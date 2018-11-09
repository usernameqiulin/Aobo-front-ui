import {getChargesDetail} from '../../src/Sagas/ChargesDetailSagas';
import ChargesDetailActions from '../../src/Redux/ChargesDetailRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';

describe('ChargesDetailSagas', () => {
    describe('getChargesDetail', () => {
        it(responseShould, () => {
            const getChargesDetailApi = sinon.stub(api, 'getChargesDetail');

            responseMock.setCallsReturn(getChargesDetailApi);
            const dispatched = responseMock.runSaga(getChargesDetail, api, tokenMock, ChargesDetailActions.chargesDetailRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetChargesDetailAction);

            expect(getChargesDetailApi.callCount).to.equal(responseMock.numbers());
            expect(getChargesDetailApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getChargesDetailApi.restore();
        })
    })
})

const expectGetChargesDetailAction = response => expectAction(
    response,
    () => ChargesDetailActions.chargesDetailSuccess(response.data),
    ChargesDetailActions.chargesDetailFailure
)