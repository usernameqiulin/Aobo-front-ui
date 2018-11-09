import {getPromotion} from '../../src/Sagas/PromotionSagas';
import PromotionActions from '../../src/Redux/PromotionRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('PromotionSagas', () => {
    describe('getPromotion', () => {
        it(responseShould, () => {
            const getPromotionApi = sinon.stub(api, 'getPromotion');

            responseMock.setCallsReturn(getPromotionApi);
            const dispatched = responseMock.runSaga(getPromotion, api, tokenMock, PromotionActions.promotionRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetPromotionAction);

            expect(getPromotionApi.callCount).to.equal(responseMock.numbers());
            expect(getPromotionApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getPromotionApi.restore();
        })
    })
})

const expectGetPromotionAction = response => expectAction(
    response,
    () => PromotionActions.promotionSuccess(response.data.data),
    PromotionActions.promotionFailure,
    {
        catchNoResults: false
    }
)