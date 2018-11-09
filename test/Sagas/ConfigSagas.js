import {getConfig} from '../../src/Sagas/ConfigSagas';
import ConfigActions from '../../src/Redux/ConfigRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

describe('ConfigSagas', () => {
    describe('getConfig', () => {
        it(responseShould, () => {
            const getConfigApi = sinon.stub(api, 'getConfig');

            responseMock.setCallsReturn(getConfigApi);
            const dispatched = responseMock.runSaga(getConfig, api, tokenMock, ConfigActions.configRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetConfigAction);

            expect(getConfigApi.callCount).to.equal(responseMock.numbers());
            expect(getConfigApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);
        })
    })
})

const expectGetConfigAction = response => expectAction(
    response,
    () => ConfigActions.configSuccess(response.data.data),
    ConfigActions.configFailure,
    {catchNoResults: false}
)