import {runSaga} from 'redux-saga'

import {getMembers} from '../../src/Sagas/MembersSagas';
import {expectAction, responseShould} from '../helper';
import MembersActions from '../../src/Redux/MembersRedux';
import { responseMock, tokenMock, requestParamsMock } from '../mock';

describe('MembersSagas', () => {
    describe('getMembers', () => {
        it(responseShould, () => {
            const getMembersApi = sinon.stub(api, 'getMembers');

            responseMock.setCallsReturn(getMembersApi);
            const dispatched = responseMock.runSaga(getMembers, api, tokenMock, MembersActions.membersRequest(requestParamsMock));

            expect(getMembersApi.callCount).to.equal(responseMock.numbers());
            expect(getMembersApi.alwaysCalledWith(requestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(responseMock.createExpectActions(expectMembersAction));

            getMembersApi.restore();
        })
        it('username length should limit between 4 and 17', () => {
            const getMembersApi = sinon.stub(api, 'getMembers');
            //success
            membersRequestParamsMock.success.map(successParams => {
                let dispatched = [];
                getMembersApi.callCount = 0;
                runSaga({
                    dispatched: action => dispatched.push(action),
                    getState: () => ({state: 'test-state'})
                }, getMembers, api, tokenMock, MembersActions.membersRequest(successParams))
                expect(getMembersApi.callCount).to.equal(1);
            })
            //failure
            membersRequestParamsMock.failure.map(failureParams => {
                let dispatched = [];
                getMembersApi.callCount = 0;
                runSaga({
                    dispatch: action => dispatched.push(action),
                    getState: () => ({state: 'test-state'})
                }, getMembers, api, tokenMock, MembersActions.membersRequest(failureParams))
                expect(getMembersApi.callCount).to.equal(0);
                expect(dispatched).to.deep.equal([MembersActions.membersFailure('username limit')]);
            })

            getMembersApi.restore();
        })
    })
})

const expectMembersAction = (response) => expectAction(response, () => MembersActions.membersSuccess(response.data), MembersActions.membersFailure);

const membersRequestParamsMock = {
    success: [
        {
            username: 'ssss',
        },
        {
            username: 'sssssssssssssssss',
        },
    ],
    failure: [
        {
            username: 'ss'
        },
        {
            username: 'sssssssssssssssssss',
        }
    ]
}