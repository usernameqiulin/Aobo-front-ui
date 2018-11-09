import {getCards, updateCard, addCard, deleteCard} from '../../src/Sagas/CardSagas';
import CardActions from '../../src/Redux/CardRedux';
import ProfileActions from '../../src/Redux/ProfileRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper'

const idMock = 111;
const cardMock = 'test-card';
const paramsMock = 'test-params';

describe('CardSagas', () => {
    describe('getCards', () => {
        it(responseShould, () => {
            const getCardsApi = sinon.stub(api, 'getCards');
            
            responseMock.setCallsReturn(getCardsApi);
            const dispatched = responseMock.runSaga(getCards, api, tokenMock, CardActions.cardRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetCardsAction);

            expect(getCardsApi.callCount).to.equal(responseMock.numbers());
            expect(getCardsApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getCardsApi.restore();
        })
    })
    describe('updateCard', () => {
        it(responseShould, () => {
            const updateCardApi = sinon.stub(api, 'updateCard');

            responseMock.setCallsReturn(updateCardApi);
            const dispatched = responseMock.runSaga(updateCard, api, tokenMock, CardActions.cardUpdateRequest(idMock, cardMock));
            const expectDispatched = responseMock.createExpectActions(expectUpdateCardAction);

            expect(updateCardApi.callCount).to.equal(responseMock.numbers());
            expect(updateCardApi.alwaysCalledWith(idMock, cardMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            updateCardApi.restore();
        })
    })
    describe('addCard', () => {
        it(responseShould, () => {
            const addCardApi = sinon.stub(api, 'addCard');

            responseMock.setCallsReturn(addCardApi);
            const dispatched = responseMock.runSaga(addCard, api, tokenMock, CardActions.cardAddRequest(cardMock));
            const expectDispatched = responseMock.createExpectActions(expectAddCardAction);

            expect(addCardApi.callCount).to.equal(responseMock.numbers());
            expect(addCardApi.alwaysCalledWith(cardMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            addCardApi.restore();
        })
    })
    describe('deleteCard', () => {
        it(responseShould, () => {
            const deleteCardApi = sinon.stub(api, 'deleteCard');

            responseMock.setCallsReturn(deleteCardApi);
            const dispatched = responseMock.runSaga(deleteCard, api, tokenMock, CardActions.cardDeleteRequest(idMock, paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectDeleteCardAction);

            expect(deleteCardApi.callCount).to.equal(responseMock.numbers());
            expect(deleteCardApi.alwaysCalledWith(idMock, paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            deleteCardApi.restore();
        })
    })
})

const expectGetCardsAction = response => expectAction(response, () => CardActions.cardSuccess(response.data.data), CardActions.cardFailure, {catchNoResults: false});

const expectUpdateCardAction = response => expectAction(response, () => CardActions.cardUpdateSuccess(response.data), CardActions.cardUpdateFailure, {catchNoResults: false});

const expectAddCardAction = response => expectAction(
    response,
    () => [
        CardActions.cardAddSuccess(),
        CardActions.cardRequest(),
        ProfileActions.profileRequest()
    ],
    CardActions.cardAddFailure,
    {catchNoResults: false}
)

const expectDeleteCardAction = response => expectAction(
    response,
    () => [
        CardActions.cardDeleteSuccess(),
        CardActions.cardRequest(),
    ],
    CardActions.cardDeleteFailure,
    {catchNoResults: false}
)