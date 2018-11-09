import {getRebates, addRebate, calculateRebate} from '../../src/Sagas/RebateSagas';
import RebateActions from '../../src/Redux/RebateRedux';
import AlertActions from '../../src/Redux/AlertRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const rebateRequestParamsMock = 'test-params';

const rebateAddRequestParamsMock = {
    product: 'test-product'
}

const rebateCalculateRequestParamsMock = 'test-params';

describe('RebateSagas', () => {
    describe('getRebates', () => {
        it(responseShould, () => {
            const getRebatesApi = sinon.stub(api, 'getRebates');

            responseMock.setCallsReturn(getRebatesApi);
            const dispatched = responseMock.runSaga(getRebates, api, tokenMock, RebateActions.rebateRequest(rebateRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetRebatesAction);

            expect(getRebatesApi.callCount).to.equal(responseMock.numbers());
            expect(getRebatesApi.alwaysCalledWith(rebateRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getRebatesApi.restore();
        })
    })
    describe('addRebate', () => {
        it(responseShould, () => {
            const addRebateApi = sinon.stub(api, 'addRebate');

            responseMock.setCallsReturn(addRebateApi);
            const dispatched = responseMock.runSaga(addRebate, api, tokenMock, RebateActions.rebateAddRequest(rebateAddRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectAddRebateAction);

            expect(addRebateApi.callCount).to.equal(responseMock.numbers());
            expect(addRebateApi.alwaysCalledWith(rebateAddRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            addRebateApi.restore();
        })
    })
    describe('calculateRebate', () => {
        it(responseShould, () => {
            const calculateRebateApi = sinon.stub(api, 'calculateRebate');

            responseMock.setCallsReturn(calculateRebateApi);
            const dispatched = responseMock.runSaga(calculateRebate, api, tokenMock, RebateActions.rebateCalculateRequest(rebateCalculateRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectCalculateRebateAction);

            expect(calculateRebateApi.callCount).to.equal(responseMock.numbers());
            expect(calculateRebateApi.alwaysCalledWith(rebateCalculateRequestParamsMock, tokenMock));
            expect(dispatched).to.deep.equal(expectDispatched);

            calculateRebateApi.restore();
        })
    })
})

const expectGetRebatesAction = response => expectAction(
    response,
    () => RebateActions.rebateSuccess(response.data),
    RebateActions.rebateFailure,
    {
        catchNoResults: false
    }
)

const expectAddRebateAction = response => expectAction(
    response,
    () => [
        RebateActions.rebateAddSuccess(),
        AlertActions.alertAdd(rebateAddRequestParamsMock.product + '_REBATE_REDEEM_SUCCESS', 'success'),
        RebateActions.rebateRequest({}),
    ],
    RebateActions.rebateAddFailure,
    {
        catchNoResults: false
    }
)

const expectCalculateRebateAction = response => expectAction(
    response,
    () => RebateActions.rebateCalculateSuccess(response.data.data),
    RebateActions.rebateCalculateFailure,
    {
        catchNoResults: false
    }
)