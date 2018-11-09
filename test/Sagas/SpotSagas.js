import {getSpot} from '../../src/Sagas/SpotSagas';
import SportActions from '../../src/Redux/SpotRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';


describe('SpotSagas', () => {
    describe('getSpot', () => {
        it(responseShould, () => {
            const getSpotApi = sinon.stub(api, 'getSpot');

            responseMock.setCallsReturn(getSpotApi);
            const dispatched = responseMock.runSaga(getSpot, api, tokenMock, SportActions.spotRequest());
            const expectDispatched = responseMock.createExpectActions(expectsportsLoginAction);

            expect(getSpotApi.callCount).to.equal(responseMock.numbers());
            expect(getSpotApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getSpotApi.restore();
        })
    })
})

const expectsportsLoginAction = response => expectAction(
    response,
    () => SportActions.spotSuccess(response.data.data),
    SportActions.spotFailure,
    {
        catchNoResults: false
    }
)

