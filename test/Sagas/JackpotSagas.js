import {getJackpot} from '../../src/Sagas/JackpotSagas';
import JackpotActions from '../../src/Redux/JackpotRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('JackpotSagas', () => {
    describe('getJackpot', () => {
        it(responseShould, () => {
            const getJackpotApi = sinon.stub(api, 'getJackpot');

            responseMock.setCallsReturn(getJackpotApi);
            const dispatched = responseMock.runSaga(getJackpot, api, tokenMock, JackpotActions.jackpotRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetJackpotAction);

            expect(getJackpotApi.callCount).to.equal(responseMock.numbers());
            expect(getJackpotApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getJackpotApi.restore();
        })
    })
})

const expectGetJackpotAction = response => expectAction(
    response,
    () => JackpotActions.jackpotSuccess(response.data.data),
    JackpotActions.jackpotFailure,
    {
        catchNoResults: false
    }
)