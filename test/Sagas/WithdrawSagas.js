import {getWithdraws, addWithdraw} from '../../src/Sagas/WithdrawSagas';
import WithdrawActions from '../../src/Redux/WithdrawRedux';
import WalletActions from '../../src/Redux/WalletRedux'
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = 'test-params';
const orderMock = {
    main: {
        wallet: 'MAIN'
    },
    others: [
        {
            wallet: 'AG'
        },
        {
            wallet: 'FS'
        },
        {
            wallet: 'GJ'
        },
        {
            wallet: 'PT'
        }
    ]
}

describe('WithdrawsSaga', () => {
    describe('getWithdraws', () => {
        it(responseShould, () => {
            const getWithdrawsOrdersApi = sinon.stub(api, 'getWithdraws');

            responseMock.setCallsReturn(getWithdrawsOrdersApi);
            const dispatched = responseMock.runSaga(getWithdraws, api, tokenMock, WithdrawActions.withdrawRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetWithdrawssAction);
            // console.log('@@---------------------------------->',dispatched);
            // console.log('!!==================================>',expectDispatched);

            expect(getWithdrawsOrdersApi.callCount).to.equal(responseMock.numbers());
            expect(getWithdrawsOrdersApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(dispatched);

            getWithdrawsOrdersApi.restore();
        })
    })
    describe('addWithdraw', () => {
        it(responseShould, () => {
            //main
            //others


            const updateWalletApi = sinon.stub(api, 'addWithdraw');

            responseMock.setCallsReturn(updateWalletApi);
            const dispatched = responseMock.runSaga(addWithdraw, api, tokenMock, WithdrawActions.withdrawAddRequest(orderMock));
            const expectDispatched = responseMock.createExpectActions(expectAddWithdrawMain)
            // console.log("cccccccccccccccccccccccc",dispatched);
            // console.log("dddddddddddddddddddddddd",expectDispatched);


            expect(updateWalletApi.callCount).to.equal(responseMock.numbers());
            expect(updateWalletApi.alwaysCalledWith(orderMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(dispatched);

            updateWalletApi.restore();
        })
    })
})

const expectGetWithdrawssAction = response => expectAction(
    response,
    () => WithdrawActions.withdrawSuccess(response.data),
    WithdrawActions.withdrawFailure,
    {catchNoResults: false}
)

const expectAddWithdrawMain = response => expectAction(
    response,
    () => {
        let puts = [
            put(WithdrawActions.withdrawAddSuccess(orderMock)),
            put(WithdrawActions.withdrawRequest({})),
        ]
        if (withdraw.wallet === 'MAIN') {
            puts.push(put(WithdrawActions.walletUpdateRequest('MAIN')))
        } else {
            puts.push(put(WithdrawActions.walletRequest()))
        }
    },
    WithdrawActions.withdrawAddFailure,
    {catchNoResults: false}
)


