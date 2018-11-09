import {getDeposits, getMethods, addDeposit} from '../../src/Sagas/DepositSagas';
import DepositActions from '../../src/Redux/DepositRedux';
import CheckoutActions from '../../src/Redux/CheckoutRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';
const orderMock = 'test-order';

describe('DepositSagas', () => {
    describe('getDeposits', () => {
        it(responseShould, () => {
            const getDepositOrdersApi = sinon.stub(api, 'getDepositOrders');

            responseMock.setCallsReturn(getDepositOrdersApi);
            const dispatched = responseMock.runSaga(getDeposits, api, tokenMock, DepositActions.depositRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetDepositsAction);

            expect(getDepositOrdersApi.callCount).to.equal(responseMock.numbers());
            expect(getDepositOrdersApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getDepositOrdersApi.restore();
        })
    })
    describe('getMethods', () => {
        it(responseShould, () => {
            const getDepositMethodsApi = sinon.stub(api, 'getDepositMethods');

            responseMock.setCallsReturn(getDepositMethodsApi);
            const dispatched = responseMock.runSaga(getMethods, api, tokenMock, DepositActions.methodRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetMethodAction);

            expect(getDepositMethodsApi.callCount).to.equal(responseMock.numbers());
            expect(getDepositMethodsApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getDepositMethodsApi.restore();
        })
    })
    describe('addDeposit', () => {
        it(responseShould, () => {
            const addDepositOrderApi = sinon.stub(api, 'addDepositOrder');

            responseMock.setCallsReturn(addDepositOrderApi);
            const dispatched = responseMock.runSaga(addDeposit, api, tokenMock, DepositActions.depositAddRequest(orderMock));
            const expectDispatched = responseMock.createExpectActions(expectAddDepositAction);

            expect(addDepositOrderApi.callCount).to.equal(responseMock.numbers());
            expect(addDepositOrderApi.alwaysCalledWith(orderMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            addDepositOrderApi.restore();
        })
    })
})

const expectGetDepositsAction = response => expectAction(
    response,
    () => DepositActions.depositSuccess(response.data),
    DepositActions.depositFailure,
    {catchNoResults: false}
)

const expectGetMethodAction = response => expectAction(
    response,
    () => DepositActions.methodSuccess(response.data.data),
    DepositActions.methodFailure,
    {catchNoResults: false}
)

const expectAddDepositAction = response => expectAction(
    response,
    () => [
        DepositActions.depositAddSuccess(),
        CheckoutActions.checkoutRequest(response.data.data),
        DepositActions.depositRequest({}),
    ],
    DepositActions.depositAddFailure,
    {catchNoResults: false}
)