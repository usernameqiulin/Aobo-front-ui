import {getWallets, updateWallet} from '../../src/Sagas/WalletSagas';
import WalletsActions from '../../src/Redux/WalletRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const orderMock = 'test-order';

describe('WalletsSagas', () => {
    describe('getWallets', () => {
        it(responseShould, () => {
            const getWalletsOrdersApi = sinon.stub(api, 'getWallets');

            responseMock.setCallsReturn(getWalletsOrdersApi);
            const dispatched = responseMock.runSaga(getWallets, api, tokenMock, WalletsActions.walletRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetWalletssAction);

            expect(getWalletsOrdersApi.callCount).to.equal(responseMock.numbers());
            expect(getWalletsOrdersApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getWalletsOrdersApi.restore();
        })
    })
    describe('updateWallet', () => {
        it(responseShould, () => {
            const updateWalletApi = sinon.stub(api, 'updateWallet');

            responseMock.setCallsReturn(updateWalletApi);
            const dispatched = responseMock.runSaga(updateWallet, api, tokenMock, WalletsActions.walletUpdateRequest(orderMock));
            const expectDispatched = responseMock.createExpectActions(expectGetMethodAction);

            expect(updateWalletApi.callCount).to.equal(responseMock.numbers());
            expect(updateWalletApi.alwaysCalledWith(orderMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            updateWalletApi.restore();
        })
    })
})

const expectGetWalletssAction = response => expectAction(
    response,
    () => WalletsActions.walletSuccess(response.data.data),
    WalletsActions.walletFailure,
    {catchNoResults: false}
)

const expectGetMethodAction = response => expectAction(
    response,
    () => WalletsActions.walletUpdateSuccess(response.data.data),
    WalletsActions.walletFailure,
    {catchNoResults: false}
)
