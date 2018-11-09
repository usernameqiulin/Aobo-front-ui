import {getProfile, updateProfile, updatePassword} from '../../src/Sagas/ProfileSagas';
import ProfileActions from '../../src/Redux/ProfileRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould} from '../helper';

const profileUpdateRequestParamsMock = Symbol('test-params');

const passwordUpdateRequestParamsMock = Symbol('test-params');

describe('ProfileSagas', () => {
    describe('getProfile', () => {
        it(responseShould, () => {
            const getProfileApi = sinon.stub(api, 'getProfile');

            responseMock.setCallsReturn(getProfileApi);
            const dispatched = responseMock.runSaga(getProfile, api, tokenMock, ProfileActions.profileRequest());
            const expectDispatched = responseMock.createExpectActions(expectGetProfileAction);

            expect(getProfileApi.callCount).to.equal(responseMock.numbers());
            expect(getProfileApi.alwaysCalledWith(tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getProfileApi.restore();
        })
    })
    describe('updateProfile', () => {
        it(responseShould, () => {
            const updateProfileApi = sinon.stub(api, 'updateProfile');

            responseMock.setCallsReturn(updateProfileApi);
            const dispatched = responseMock.runSaga(updateProfile, api, tokenMock, ProfileActions.profileUpdateRequest(profileUpdateRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectUpdateProfileAction);

            expect(updateProfileApi.callCount).to.equal(responseMock.numbers());
            expect(updateProfileApi.alwaysCalledWith(profileUpdateRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            updateProfileApi.restore();
        })
    })
    describe('updatePassword', () => {
        it(responseShould, () => {
            const updatePasswordApi = sinon.stub(api, 'updatePassword');

            responseMock.setCallsReturn(updatePasswordApi);
            const dispatched = responseMock.runSaga(updatePassword, api, tokenMock, ProfileActions.passwordUpdateRequest(passwordUpdateRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectUpdatePasswordAction);

            expect(updatePasswordApi.callCount).to.equal(responseMock.numbers());
            expect(updatePasswordApi.alwaysCalledWith(passwordUpdateRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            updatePasswordApi.restore();
        })
    })
})

const expectGetProfileAction = response => expectAction(
    response,
    () => ProfileActions.profileSuccess(response.data.data),
    ProfileActions.profileFailure,
    {
        catchNoResults: false
    }
)

const expectUpdateProfileAction = response => expectAction(
    response,
    () => ProfileActions.profileUpdateSuccess(response.data.data),
    ProfileActions.profileFailure,
    {
        catchNoResults: false
    }
)

const expectUpdatePasswordAction = response => expectAction(
    response,
    () => ProfileActions.passwordUpdateSuccess(),
    ProfileActions.updateFailure,
    {
        catchNoResults: false
    }
)