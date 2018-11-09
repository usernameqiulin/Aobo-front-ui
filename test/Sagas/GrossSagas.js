import {runSaga} from'redux-saga'

import {getGross} from '../../src/Sagas/GrossSagas';
import GrossActions from '../../src/Redux/GrossRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const allParamsMock = [
    {
        username: 'sss'
    },
    {
        username: 'ssssssssssssssssss'
    },
    {
        username: 'ssss'
    },
    {
        username: 'sssssssssssssssss'
    },  
]

const paramsMock = type => {
    switch(type){
        case 'all':
            return allParamsMock;
        case 'failure':
            return allParamsMock.slice(0, 2);
        case 'success':
            return allParamsMock.slice(2);
    }
}

describe('GrossSagas', () => {
    describe('getGross', () => {
        it(responseShould, () => {
            const getGrossApi = sinon.stub(api, 'getGross');

            responseMock.setCallsReturn(getGrossApi);
            const dispatched = responseMock.runSaga(getGross, api, tokenMock, GrossActions.grossRequest(paramsMock('success')[0]));
            const expectDispatched = responseMock.createExpectActions(expectGetGrossAction);

            expect(getGrossApi.callCount).to.equal(responseMock.numbers());
            expect(getGrossApi.alwaysCalledWith(paramsMock('success')[0], tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getGrossApi.restore();
        })
        it('username length should limit between 4 and 17', () => {
            const getGrossApi = sinon.stub(api, 'getGross');
            //success
            paramsMock('success').map(successParams => {
                let dispatched = [];
                getGrossApi.callCount = 0;
                runSaga({
                    dispatched: action => dispatched.push(action),
                    getState: () => ({state: 'test-state'})
                }, getGross, api, tokenMock, GrossActions.grossRequest(successParams))
                expect(getGrossApi.callCount).to.equal(1);
            })
            //failure
            paramsMock('failure').map(failureParams => {
                let dispatched = [];
                getGrossApi.callCount = 0;
                runSaga({
                    dispatch: action => dispatched.push(action),
                    getState: () => ({state: 'test-state'})
                }, getGross, api, tokenMock, GrossActions.grossRequest(failureParams))
                expect(getGrossApi.callCount).to.equal(0);
                expect(dispatched).to.deep.equal([GrossActions.grossFailure('username limit')]);
            })

            getGrossApi.restore();
        })
    })
})

const expectGetGrossAction = response => expectAction(
    response,
    () => GrossActions.grossSuccess(response.data),
    GrossActions.grossFailure
)