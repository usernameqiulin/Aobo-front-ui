import {getCoupons} from '../../src/Sagas/CouponSagas';
import CouponActions from '../../src/Redux/CouponRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';

describe('CouponSagas', () => {
    describe('getCoupons', () => {
        it(responseShould, () => {
            const getCouponsApi = sinon.stub(api, 'getCoupons');
            
            responseMock.setCallsReturn(getCouponsApi);
            const dispatched = responseMock.runSaga(getCoupons, api, tokenMock, CouponActions.couponRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetCouponsAction);

            expect(getCouponsApi.callCount).to.equal(responseMock.numbers());
            expect(getCouponsApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getCouponsApi.restore();
        })
    })
})

const expectGetCouponsAction = response => expectAction(
    response,
    () => CouponActions.couponSuccess(response.data.data),
    CouponActions.couponFailure,
    {catchNoResults: false}
)