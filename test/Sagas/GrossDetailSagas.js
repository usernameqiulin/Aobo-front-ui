import {getGrossDetail} from '../../src/Sagas/GrossDetailSagas';
import GrossDetailActions from '../../src/Redux/GrossDetailRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const paramsMock = {
    userId: 2,
}

describe('GrossDetailSagas', () => {
    describe('getGrossDetail', () => {
        it(responseShould, () => {
            const getGrossDetailApi = sinon.stub(api, 'getGrossDetail');

            responseMock.setCallsReturn(getGrossDetailApi);
            const dispatched = responseMock.runSaga(getGrossDetail, api, tokenMock, GrossDetailActions.grossDetailRequest(paramsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetGrossDetailAction);

            expect(getGrossDetailApi.callCount).to.equal(responseMock.numbers());
            expect(getGrossDetailApi.alwaysCalledWith(paramsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getGrossDetailApi.restore();
        })
    })
})

const expectGetGrossDetailAction = response => expectAction(
    response,
    () => {
        response.data.userId = paramsMock.userId;
        return GrossDetailActions.grossDetailSuccess(response.data);
    },
    (errMessage) => GrossDetailActions.grossDetailFailure(errMessage, paramsMock.userId)
)