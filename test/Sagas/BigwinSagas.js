import {getBigwins, addBigwin} from '../../src/Sagas/BigwinSagas';
import {responseMock, tokenMock, requestParamsMock} from '../mock';
import BigwinActions from '../../src/Redux/BigwinRedux';
import {expectAction, responseShould} from '../helper'

describe('BigwinSagas', () => {
    describe('getBigwins', () => {
        it(responseShould, () => {
            const getBigwinsApi = sinon.stub(api, 'getBigwins');
            
            responseMock.setCallsReturn(getBigwinsApi);
            const dispatched = responseMock.runSaga(getBigwins, api, tokenMock, BigwinActions.bigwinRequest(requestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectBigwinAction);

            expect(getBigwinsApi.callCount).to.equal(responseMock.numbers());
            expect(getBigwinsApi.alwaysCalledWith(requestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getBigwinsApi.restore();
        })
    })
    describe('addBigwin', () => {
        it(responseShould, () => {
            /*
                关于add请求之后是简单的再发送一次数据请求  或者
                在add请求的response中返回最新的数据      或者
                add请求成功后，前端主动添加一条数据
            */

            const addBigwinApi = sinon.stub(api, 'addBigwin');
            const bigwinMock = 'bigwin-test';

            responseMock.setCallsReturn(addBigwinApi);
            const dispatched = responseMock.runSaga(addBigwin, api, tokenMock, BigwinActions.bigwinAddRequest(bigwinMock));
            const expectDispatched = responseMock.createExpectActions(expectAddBigwinAction);

            expect(addBigwinApi.callCount).to.equal(responseMock.numbers());
            expect(addBigwinApi.alwaysCalledWith(bigwinMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            addBigwinApi.restore();
        })
    })
})

const expectBigwinAction = response => expectAction(response, () => BigwinActions.bigwinSuccess(response.data), BigwinActions.bigwinFailure, {catchNoResults: false})

const expectAddBigwinAction = response => expectAction(response, () => BigwinActions.bigwinRequest({}), BigwinActions.bigwinFailure, {catchNoResults: false})