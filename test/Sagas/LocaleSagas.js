import {getLocale} from '../../src/Sagas/LocaleSagas';
import LocaleActions from '../../src/Redux/LocaleRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('LocaleSagas', () => {
    describe('getLocale', () => {
        it(responseShould, () => {
            const getLocalesApi = sinon.stub(api, 'getLocales');

            responseMock.setCallsReturn(getLocalesApi);
            const dispatched = responseMock.runSaga(getLocale, api, tokenMock, LocaleActions.localeRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetLocaleAction);

            expect(getLocalesApi.callCount).to.equal(responseMock.numbers());
            expect(getLocalesApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getLocalesApi.restore();
        })
    })
})

const expectGetLocaleAction = response => expectAction(
    response,
    () => LocaleActions.localeSuccess(response.data.data),
    LocaleActions.localeFailure,
    {
        catchNoResults: false
    }
)