import {getFavorites, addFavorite, deleteFavorite} from '../../src/Sagas/FavoriteSagas';
import FavoriteActions from '../../src/Redux/FavoriteRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-mock';
const gameIdMock = '1';

describe('FavoriteSagas', () => {
    describe('getFavorites', () => {
        it(responseShould, () => {
            const getFavoritesApi = sinon.stub(api, 'getFavorites');

            responseMock.setCallsReturn(getFavoritesApi);
            const dispatched = responseMock.runSaga(getFavorites, api, tokenMock, FavoriteActions.favoriteRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetFavoritesAction);

            expect(getFavoritesApi.callCount).to.equal(responseMock.numbers());
            expect(getFavoritesApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getFavoritesApi.restore();
        })
    })
    describe('addFavorite', () => {
        it(responseShould, () => {
            const addFavoriteApi = sinon.stub(api, 'addFavorite');

            responseMock.setCallsReturn(addFavoriteApi);
            const dispatched = responseMock.runSaga(addFavorite, api, tokenMock, FavoriteActions.favoriteAddRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectAddFavoriteAction);

            expect(addFavoriteApi.callCount).to.equal(responseMock.numbers());
            expect(addFavoriteApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);

            expect(dispatched).to.deep.equal(expectDispatched);

            addFavoriteApi.restore();
        })
    })
    describe('deleteFavorite', () => {
        it(responseShould, () => {
            const deleteFavoriteApi = sinon.stub(api, 'deleteFavorite');

            responseMock.setCallsReturn(deleteFavoriteApi);
            const dispatched = responseMock.runSaga(deleteFavorite, api, tokenMock, FavoriteActions.favoriteDeleteRequest(gameIdMock));
            const expectDispatched = responseMock.createExpectActions(expectDeleteFavoriteAction);

            expect(deleteFavoriteApi.callCount).to.equal(responseMock.numbers());
            expect(deleteFavoriteApi.alwaysCalledWith(gameIdMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            deleteFavoriteApi.restore();
        })
    })
})

const expectGetFavoritesAction = response => expectAction(
    response,
    () => FavoriteActions.favoriteSuccess(response.data),
    FavoriteActions.favoriteFailure,
    {
        catchNoResults: false
    }
)

const expectAddFavoriteAction = response => expectAction(
    response,
    () => [
        FavoriteActions.favoriteAddSuccess(),
        FavoriteActions.favoriteRequest({}),
    ],
    FavoriteActions.favoriteFailure,
    {
        catchNoResults: false
    }
)

const expectDeleteFavoriteAction = response => expectAction(
    response,
    () => [
        FavoriteActions.favoriteDeleteSuccess(),
        FavoriteActions.favoriteRequest({}),
    ],
    FavoriteActions.favoriteFailure,
    {
        catchNoResults: false
    }
)