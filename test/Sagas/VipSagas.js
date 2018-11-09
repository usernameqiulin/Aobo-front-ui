import {getVip} from '../../src/Sagas/VipSagas';
import VipActions from '../../src/Redux/VipRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';

describe('VipSagas', () => {
    describe('getVip', () => {
        it(responseShould, () => {
            const getVipApi = sinon.stub(api, 'getVip');

            responseMock.setCallsReturn(getVipApi);
            const dispatched = responseMock.runSaga(getVip, api, tokenMock, VipActions.vipRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetVipAction);

            expect(getVipApi.callCount).to.equal(responseMock.numbers());
            expect(getVipApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getVipApi.restore();
        })
    })
})

const expectGetVipAction = response => expectAction(
    response,
    () => VipActions.vipSuccess(response.data.data),
    VipActions.vipFailure,
    {
        catchNoResults: false
    }
)