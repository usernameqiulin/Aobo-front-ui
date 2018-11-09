import {runSaga} from 'redux-saga';

import ConfirmActions from '../../src/Redux/ConfirmRedux';
import {confirmSaga} from '../../src/Sagas/ConfirmSaga';

const confirmationMessageMock = 'You are playing this game';
const dataMock = {mode: 'demo'};

describe('ConfirmSaga', () => {
    describe('confirmSaga', () => {
        it('should put confirmUI show action and take yes action then hide confirmUI finally return true', () => {
            let dispatched = [];
            let dispatch = null;

            let Task = runSaga({
                dispatch: action => dispatched.push(action),
                subscribe: callback => {
                    dispatch = callback
                    return () => {}
                }
            }, confirmSaga, confirmationMessageMock, dataMock);
            
            expect(dispatched).to.deep.equal([ConfirmActions.confirmShow(confirmationMessageMock, dataMock)]);
            expect(Task.isRunning()).to.equal(true);

            dispatch(ConfirmActions.confirmYes());

            expect(dispatched).to.deep.equal([ConfirmActions.confirmShow(confirmationMessageMock, dataMock), ConfirmActions.confirmHide()]);
            expect(Task.result()).to.equal(true);
        })
        it('should put confirmUI show action and take no action then hide confirmUI finally return false', () => {
            let dispatched = [];
            let dispatch = null;

            let Task = runSaga({
                dispatch: action => dispatched.push(action),
                subscribe: callback => {
                    dispatch = callback
                    return () => {}
                }
            }, confirmSaga, confirmationMessageMock, dataMock);
            
            expect(dispatched).to.deep.equal([ConfirmActions.confirmShow(confirmationMessageMock, dataMock)]);
            expect(Task.isRunning()).to.equal(true);

            dispatch(ConfirmActions.confirmNo());

            expect(dispatched).to.deep.equal([ConfirmActions.confirmShow(confirmationMessageMock, dataMock), ConfirmActions.confirmHide()]);
            expect(Task.result()).to.equal(false);
        })
    })
})