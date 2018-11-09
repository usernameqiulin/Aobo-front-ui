import { runSaga } from 'redux-saga';

import {filters, confirm, getPlay, helper} from '../../src/Sagas/PlaySagas';
import PlayActions from '../../src/Redux/PlayRedux';
import AlertActions from '../../src/Redux/AlertRedux';
import AuthActions from '../../src/Redux/AuthRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould, expectFilter, filterFactoryCalledShould, expectFilterFactoryCalled} from '../helper';


const modeTypeMock = {
    success: [
        {params: [{mode: 'play'}]}, 
        {params: [{mode: 'demo'}]}
    ],
    failure: [
        {params: [{mode: 'ii'}]}, 
        {params: [{mode: ''}]}, 
        {params: [{mode: 'playy'}]}, 
    ]
}

const playNotHaveTokenMock = {
    success: [
        {params: [{mode: 'demo'}, tokenMock]},
        {params: [{mode: 'demo'}]},
        {params: [{mode: 'kk'}]},
        {params: [{mode: 'play'}, tokenMock]},
    ],
    failure: [
        {params: [{mode: 'play'}]}
    ]
}

const modeExistMock = {
    success: [
        {
            params: [
                {gameId: 1, mode: 'play'}
            ], 
            getState: () => ({
                play: {data: {}}
            }),
        },
        {
            params: [
                {gameId: 1, mode: 'demo'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'play'}}}
            })
        },
        {
            params: [
                {gameId: 2, mode: 'play'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'play'}}}
            })
        },
    ],
    failure: [
        {
            params: [
                {gameId: 1, mode: 'play'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'play'}}}
            })
        },,
        {
            params: [
                {gameId: 1, mode: 'demo'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'demo'}}}
            })
        },,
    ]
}
//真钱游戏一个品牌同时仅能打开一个游戏, 检查当前游戏是否有该品牌且ID不等于gameId的游戏正在运行
const gameBrandExistMock = {
    success: [
        {
            params: [
                {gameId: 1, mode: 'demo', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'play', brand: 'tt', gameId: 1}}}
            })
        },
        {
            params: [
                {gameId: 1, mode: 'demo', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'2': {mode: 'play', brand: 'tt', gameId: 2}}}
            })
        },
        {
            params: [
                {gameId: 1, mode: 'play', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'demo', brand: 'tt', gameId: 1}}}
            })
        },
        {
            params: [
                {gameId: 1, mode: 'play', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'1': {mode: 'play', brand: 'ff', gameId: 1}}}
            })
        },
        {
            params: [
                {gameId: 1, mode: 'play', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'2': {mode: 'demo', brand: 'tt', gameId: 2}}}
            })
        },
        {
            params: [
                {gameId: 1, mode: 'play', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {}}
            })
        },
    ],
    failure: [
        {
            params: [
                {gameId: 1, mode: 'play', brand: 'tt'}
            ], 
            getState: () => ({
                play: {data: {'2': {mode: 'play', brand: 'tt', gameId: 2}}}
            })
        },
    ],
}

const requestParamsMock = [1, 'params', 'play', 'brand']

describe('PlaySagas', () => {
    describe('filters', () => {
        describe('modeType', () => {
            it('mode should in ["play", "mode"]', () => {
                //success
                modeTypeMock.success.map(success => {
                    expectFilter.success(filters.modeType, success.params, success.getState, []);
                })
                //failure
                modeTypeMock.failure.map(failure => {
                    expectFilter.failure(filters.modeType, failure.params, failure.getState, [
                        PlayActions.playFailure(), AlertActions.alertAdd('INVALID_PLAY_TYPE', 'error')
                    ]);
                })
            })
        })
        describe('playNotHaveToken', () => {
            it('should filter when mode is play not have token', () => {
                //success
                playNotHaveTokenMock.success.map(success => {
                    expectFilter.success(filters.playNotHaveToken, success.params, success.getState, []);
                })
                //failure
                playNotHaveTokenMock.failure.map(failure => {
                    expectFilter.failure(filters.playNotHaveToken, failure.params, failure.getState, [PlayActions.playFailure(), AuthActions.authRequest()]);
                })
            })
        })
        describe('modeExist', () => {
            it('should filter when mode have been existed', () => {
                const confirmSaga = sinon.stub(confirm, 'confirmSaga');
                confirmSaga.callsFake(() => 0);   //取消重新加载

                //success
                modeExistMock.success.map(success => {
                    expectFilter.success(filters.modeExist, success.params, success.getState, []);
                })
                //failure  
                modeExistMock.failure.map(failure => {
                    expectFilter.failure(filters.modeExist, failure.params, failure.getState, [PlayActions.playCancel()]);
                })

                confirmSaga.callsFake(() => 1);   //重新加载
                //all success
                modeExistMock.success.map(success => {
                    expectFilter.success(filters.modeExist, success.params, success.getState, []);
                })
                modeExistMock.failure.map(failure => {
                    expectFilter.success(filters.modeExist, failure.params, failure.getState, []);
                })

                confirmSaga.restore();
            })
        })
        describe('gameBrandExist', () => {
            it('should filter when game brand have been existed', () => {
                const confirmSaga = sinon.stub(confirm, 'confirmSaga');
                confirmSaga.callsFake(() => 0);   //取消加载

                //success
                gameBrandExistMock.success.map(success => {
                    expectFilter.success(filters.gameBrandExist, success.params, success.getState, []);
                })
                //failure  
                gameBrandExistMock.failure.map(failure => {
                    expectFilter.failure(filters.gameBrandExist, failure.params, failure.getState, [PlayActions.playCancel()]);
                })

                confirmSaga.callsFake(() => 1);   //关闭其他的，加载这个

                //success
                gameBrandExistMock.success.map(success => {
                    expectFilter.success(filters.gameBrandExist, success.params, success.getState, []);
                })
                //failure  
                gameBrandExistMock.failure.map(failure => {
                    expectFilter.failure(filters.gameBrandExist, failure.params, failure.getState, [PlayActions.playClose(Object.values(failure.getState().play.data)[0].gameId)]);
                })

                confirmSaga.restore();
            })
        })
    })
    
    describe('getPlay', () => {
        it(filterFactoryCalledShould, () => {
            const getPlayApi = sinon.stub(api, 'getPlay');
            expectFilterFactoryCalled(getPlay, [api, tokenMock, PlayActions.playRequest(...requestParamsMock)], getPlayApi, filters);
        })
        it(responseShould, () => {
            //  通过filter
            const filterFactoryHelper = sinon.stub(helper, 'filterFactory');
            filterFactoryHelper.callsFake(() => 1);

            const getPlayApi = sinon.stub(api, 'getPlay');

            responseMock.setCallsReturn(getPlayApi);
            const dispatched = responseMock.runSaga(getPlay, api, tokenMock, PlayActions.playRequest(...requestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetPlayAction);

            expect(getPlayApi.callCount).to.equal(responseMock.numbers());
            expect(getPlayApi.alwaysCalledWith(requestParamsMock[0], requestParamsMock[1], requestParamsMock[2], tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            getPlayApi.restore();
        })
    })
})

const expectGetPlayAction = response => expectAction(
    response,
    () => PlayActions.playSuccess({brand: requestParamsMock[3], url: response.data.data, mode: requestParamsMock[2], gameId: requestParamsMock[0]}),
    PlayActions.playFailure,
    {
        catchNoResults: false
    }
)

afterEach(() => {
    sinon.restore();
})