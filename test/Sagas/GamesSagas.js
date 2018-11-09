import {getGames} from '../../src/Sagas/GamesSagas';
import GamesActions from '../../src/Redux/GamesRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = {test: 'test-params'}

describe('GamesSagas', () => {
    describe('getGames', () => {
        it(responseShould, async () => {
            const getGamesApi = sinon.stub(api, 'getGames');

            responseMock.setCallsReturn(getGamesApi);
            const dispatched = await responseMock.runSaga(getGames, api, tokenMock, GamesActions.gamesRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetGamesAction);

            expect(getGamesApi.callCount).to.equal(responseMock.numbers());
            expect(getGamesApi.alwaysCalledWith({...paramsMock, product: 'SLOTS'}, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);
        })
    })
})

const expectGetGamesAction = response => expectAction(
    response,
    () => GamesActions.gamesSuccess(response.data.daata),
    GamesActions.gamesFailure,
    {
        catchNoResults: false
    }
)

afterEach(() => {
    sinon.restore();
})