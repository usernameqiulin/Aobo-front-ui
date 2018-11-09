import {getStages} from '../../src/Sagas/AffiliateSagas';
import {responseMock} from '../mock';
import AffiliateActions from '../../src/Redux/AffiliateRedux';
import {expectAction, responseShould} from '../helper'

describe('AffiliateSagas', () => {
    describe('getStages', () => {
        it(responseShould, () => {
            const getStagesApi = sinon.stub(api, 'getStages');

            responseMock.setCallsReturn(getStagesApi);
            const dispatched = responseMock.runSaga(getStages, api, AffiliateActions.stagesRequest());

            expect(getStagesApi.callCount).to.equal(responseMock.numbers());
            expect(dispatched).to.deep.equal(responseMock.createExpectActions(expectAffiliateAction));

            getStagesApi.restore();
        })
    })
})

const expectAffiliateAction = (response) => expectAction(response, () => AffiliateActions.stagesSuccess(response.data), AffiliateActions.stagesFailure, {diffErrType: false});