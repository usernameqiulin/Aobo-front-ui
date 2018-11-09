import {getMenu} from '../../src/Sagas/MenuSagas';
import MenuActions from '../../src/Redux/MenuRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('MenuSagas', () => {
    describe('getMenu', () => {
        it(responseShould, () => {
            const getMenuApi = sinon.stub(api, 'getMenu');

            responseMock.setCallsReturn(getMenuApi);
            const dispatched = responseMock.runSaga(getMenu, api, tokenMock, MenuActions.menuRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetMenuAction);

            expect(getMenuApi.callCount).to.equal(responseMock.numbers());
            expect(getMenuApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getMenuApi.restore();
        })
    })
})

const expectGetMenuAction = response => expectAction(
    response,
    () => MenuActions.menuSuccess(response.data),
    MenuActions.menuFailure,
    {
        catchNoResults: false
    }
)