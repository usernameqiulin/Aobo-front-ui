import {runSaga} from 'redux-saga';

import {catchError, dealError, filterFactory} from '../../src/Sagas/ErrorCatch';
import {responseMock, tokenMock} from '../mock';
import AlertActions from '../../src/Redux/AlertRedux';

const actionMock = 'test-action';

const filterFactoryMock = {
    failCallCount: [1, 0, 0, 1, 0, 0],
    success: [
        [
            {
                '1': sinon.stub().callsFake(() => 1),
                '2': sinon.stub().callsFake(() => 1),
                '3': sinon.stub().callsFake(() => 1),
            },
            actionMock, tokenMock
        ]
    ],
    failure: [
        [
            {
                '1': sinon.stub().callsFake(() => 0),
                '2': sinon.stub().callsFake(() => 1),
                '3': sinon.stub().callsFake(() => 1),
            },
            actionMock, tokenMock
        ],
        [
            {
                '1': sinon.stub().callsFake(() => 0),
                '2': sinon.stub().callsFake(() => 0),
                '3': sinon.stub().callsFake(() => 0),
            },
            actionMock, tokenMock
        ]
    ]
}

describe('ErrorCatch', () => {
    describe('filterFactory', () => {
        it('should call all filters correctly', () => {
            //success
            filterFactoryMock.success.map(successParams => {
                const Task = runSaga({}, filterFactory, ...successParams);
                expect(Task.result()).to.equal(1);
                for(let key in successParams[0]){
                    expect(successParams[0][key].calledWith(actionMock, tokenMock)).to.equal(true);
                    expect(successParams[0][key].callCount).to.equal(1);
                }
            })
            // failure
            let i = 0;
            filterFactoryMock.failure.map(failureParams => {
                const Task = runSaga({}, filterFactory, ...failureParams);
                expect(Task.result()).to.equal(0);
                for(let key in failureParams[0]){
                    failureParams[0][key].callCount && expect(failureParams[0][key].calledWith(actionMock, tokenMock)).to.equal(true);
                    expect(failureParams[0][key].callCount).to.equal(filterFactoryMock.failCallCount[i++]);
                }
            })
        })
    })
    describe('catchError', () => {
        it('should not throw correct error when success and have data', () => {
            const testStub = sinon.stub();
            responseMock.success('haveData').map(response => {
                try{
                    catchError(response, true);
                    catchError(response, false);
                }catch(err){
                    testStub(err);
                }
            })
            expect(testStub.callCount).to.equal(0);
        })
        it('should throw correct error when succes but not have data(null, {}, []) if user set noResultsError = true(default)', () => {
            const testStub = sinon.stub();
            responseMock.success('noData').map(response => {
                try{
                    catchError(response, true);
                }catch(err){
                    testStub(err);
                    expect(err.message).to.equal('No results found');
                    expect(err.type).to.equal(2);
                }
            })
            expect(testStub.callCount).to.equal(responseMock.success('noData').length);
        })
        it('should not throw error when succes but dont have data(null, {}, []) if user set noResultsError = false', () => {
            const testStub = sinon.stub();
            responseMock.success('noData').map(response => {
                try{
                    catchError(response, false);
                }catch(err){
                    testStub(err);
                }
            })
            expect(testStub.callCount).to.equal(0);
        })
        it('should throw correct err when stat failure', () => {
            const testStub = sinon.stub();
            responseMock.statFailure().map(response => {
                try{
                    catchError(response);
                }catch(err){
                    testStub(err);
                    expect(err.message).to.equal(response.data.message);
                    expect(err.type).to.equal(1);
                }
            })
            expect(testStub.callCount).to.equal(1);
        })
        it('should throw correct err when ok failure and have err message', () => {
            const testStub = sinon.stub();
            responseMock.okFailure('haveMessage').map(response => {
                try{
                    catchError(response);
                }catch(err){
                    testStub(err);
                    expect(err.message).to.equal(response.data.message);
                    expect(err.type).to.equal(3);
                }
            })
            expect(testStub.callCount).to.equal(1);
        })
        it('should throw correct err when ok failure but dont have err message', () => {
            const testStub = sinon.stub();
            responseMock.okFailure('noMessage').map(response => {
                try{
                    catchError(response);
                }catch(err){
                    testStub(err);
                    expect(err.message).to.equal(response.problem);
                    expect(err.type).to.equal(3);
                }
            })
            expect(testStub.callCount).to.equal(1);
        })
    })
    describe('dealError', () => {
        it('should put failAction and AlertWarnningAction when err.type === 1 and user choose diffType = true(default)', () => {
            let dispatched = [];
            const failAction = sinon.stub();
            failAction.callsFake(() => ({type: 'TEST_ACTION'}))
            const errMock = {message: 'test-error', type: 1};

            runSaga({
                dispatch: action => dispatched.push(action) 
            }, dealError, errMock, failAction, {diffType: true});

            expect(failAction.callCount).to.equal(1);
            expect(failAction.calledWith(errMock.message)).to.equal(true);
            expect(dispatched).to.deep.equal([failAction(errMock.message), AlertActions.alertAdd(errMock.message, 'warning')])
        })
        it('should put failAction when err.type === 2 and user choose diffType = true(default)', () => {
            let dispatched = [];
            const failAction = sinon.stub();
            failAction.callsFake(() => ({type: 'TEST_ACTION'}))
            const errMock = {message: 'test-error', type: 2};

            runSaga({
                dispatch: action => dispatched.push(action) 
            }, dealError, errMock, failAction, {diffType: true});

            expect(failAction.callCount).to.equal(1);
            expect(failAction.calledWith(errMock.message)).to.equal(true);
            expect(dispatched).to.deep.equal([failAction(errMock.message)])
        })
        it('should put failAction and AlertErrorAction when err.type === 3 and user choose diffType = true(default)', () => {
            let dispatched = [];
            const failAction = sinon.stub();
            failAction.callsFake(() => ({type: 'TEST_ACTION'}))
            const errMock = {message: 'test-error', type: 3};

            runSaga({
                dispatch: action => dispatched.push(action) 
            }, dealError, errMock, failAction, {diffType: true});

            expect(failAction.callCount).to.equal(1);
            expect(failAction.calledWith(errMock.message)).to.equal(true);
            expect(dispatched).to.deep.equal([failAction(errMock.message), AlertActions.alertAdd(errMock.message, 'error')])
        })
        it('should put failAction and AlertErrorAction when user choose diffType = false', () => {
            const allType = [1,2,3];
            allType.map(type => {
                let dispatched = [];
                const failAction = sinon.stub();
                failAction.callsFake(() => ({type: 'TEST_ACTION'}))
                const errMock = {message: 'test-error', type};

                runSaga({
                    dispatch: action => dispatched.push(action) 
                }, dealError, errMock, failAction, {diffType: false});

                expect(failAction.callCount).to.equal(1);
                expect(failAction.calledWith(errMock.message)).to.equal(true);
                expect(dispatched).to.deep.equal([failAction(errMock.message), AlertActions.alertAdd(errMock.message, 'error')])
            })
        })
    })
})