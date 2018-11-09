import {getTransactions} from '../../src/Sagas/TransactionSagas';
import TransactionActions from '../../src/Redux/TransactionRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';


describe('TransactionSagas', () => {
    describe('getTransactions', () => {
        it(responseShould, () => {
            const getTransactionApi = sinon.stub(api, 'getTransactions');

            responseMock.setCallsReturn(getTransactionApi);
            const dispatched = responseMock.runSaga(getTransactions, api, tokenMock, TransactionActions.transactionRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetMenuAction);

            expect(getTransactionApi.callCount).to.equal(responseMock.numbers());
            expect(getTransactionApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);


            getTransactionApi.restore();
        })
    })
})

const expectGetMenuAction = response => expectAction(
    response,
    () => TransactionActions.transactionSuccess(response.data),
    TransactionActions.transactionFailure,
    {
        catchNoResults: false
    }
)