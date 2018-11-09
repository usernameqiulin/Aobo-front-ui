import { runSaga } from 'redux-saga';

export const responseMock = {
    success: (get = 'all') => {
        const all = [
            {
                ok: true,
                data: {
                    stat: 'ok',
                    data: 'test-data',
                }
            },
            {
                ok: true,
                data: {
                    stat: 'ok',
                    data: null,
                }
            },
            {
                ok: true,
                data: {
                    stat: 'ok',
                    data: {},
                }
            },
            {
                ok: true,
                data: {
                    stat: 'ok',
                    data: [],
                }
            }
        ];
        switch (get){
            case 'all':
                return all;
            case 'haveData':
                return all.slice(0, 1);
            case 'noData':
                return all.slice(1);
        }
    },
    statFailure: () => ([
        {
            ok: true,
            data: {
                stat: 'failed',
                data: null,
                message: 'test-message'
            }
        }
    ]),
    okFailure: (get = 'all') => {
        const all =[
            {
                ok: false,
                data: {stat: 'failed', data: null, message: 'test-message'},
                problem: 'test-problem'
            },
            {
                ok: false,
                data: null,
                problem: 'test-problem'
            },
        ];
        switch (get){
            case 'all':
                return all;
            case 'haveMessage': 
                return all.slice(0, 1);
            case 'noMessage':
                return all.slice(1);
        }
    },
    numbers: () => responseMock.success().length + responseMock.statFailure().length + responseMock.okFailure().length,
    ergodicResponse: (cb) => {
        let index = 0;
        for(let response of [
            ...responseMock.success(),
            ...responseMock.statFailure(),
            ...responseMock.okFailure(),
        ]){
            cb(response, index); 
            index++;
        }
    },
    setCallsReturn: (stubFunc) => {
        responseMock.ergodicResponse((response, index) => {
            stubFunc.onCall(index).returns(response);
        })
    },
    runSaga: (saga, ...args) => {
        let dispatched = [];
        let Tasks = [];
        responseMock.ergodicResponse(() => {
            Tasks.push(runSaga({
                dispatch: action => dispatched.push(action),
                getState: () => ({state: 'test-state'})
            },saga, ...args));
        });
        return Tasks.filter(task => task.isRunning()).length > 0 ? 
            Promise.all(Tasks.map(task => task.done))
            :
            dispatched;
    },
    createExpectActions: (expectActionFunc) => {
        let dispatched = [];
        responseMock.ergodicResponse(response => {
            dispatched = dispatched.concat(expectActionFunc(response));
        });
        return dispatched;
    }
}

export const tokenMock = 'test-token';

export const requestParamsMock = {/*请求参数*/};

export const tMock = sinon.stub();
tMock.callsFake(() => 'test-t');

