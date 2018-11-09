import {getTransfers, addTransfer} from '../../src/Sagas/TransferSagas';
import TransferActions from '../../src/Redux/TransferRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';
const orderMock = 'test-order';


describe('TransferSagas', () => {
    describe('getTransfers', () => {
        it(responseShould, () => {
            const getTransferApi = sinon.stub(api, 'getTransfers');

            responseMock.setCallsReturn(getTransferApi);
            const dispatched = responseMock.runSaga(getTransfers, api, tokenMock, TransferActions.transferRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetTransferAction);

            expect(getTransferApi.callCount).to.equal(responseMock.numbers());
            expect(getTransferApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getTransferApi.restore();
        })
    })

    describe('addTransfer', () => {
        it(responseShould, () => {
            const getTransferApi = sinon.stub(api, 'addTransfer');

            responseMock.setCallsReturn(getTransferApi);
            const dispatched = responseMock.runSaga(addTransfer, api, tokenMock, TransferActions.transferAddRequest(orderMock));
            const expectDispatched = responseMock.createExpectActions(expectAddTransferAction);

            expect(getTransferApi.callCount).to.equal(responseMock.numbers());
            expect(getTransferApi.alwaysCalledWith(orderMock,  tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);
            getTransferApi.restore();
        })
    })
})

const expectGetTransferAction = response => expectAction(
    response,
    () => TransferActions.transferSuccess(response.data),
    TransferActions.transferFailure,
    {
        catchNoResults: false
    }
)

const expectAddTransferAction = response => expectAction(
    response,
    () => [
    TransferActions.transferAddSuccess(),TransferActions.transferRequest({})],
    TransferActions.transferAddFailure,
    {
        catchNoResults: false
    }
)