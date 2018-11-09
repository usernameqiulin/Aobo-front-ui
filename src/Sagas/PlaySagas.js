import {call, put, all, select} from 'redux-saga/effects'
import R from 'ramda'

import PlayActions from '../Redux/PlayRedux'
import AlertActions from '../Redux/AlertRedux'
import AuthActions from '../Redux/AuthRedux'
import {confirmSaga} from "./ConfirmSaga"
import {selectPlay} from "../helper"
import {filterFactory, catchError, dealError} from "./ErrorCatch";

export const confirm = {
    confirmSaga: confirmSaga
}

export const helper = {
    filterFactory: filterFactory
}

export const filters = {
    //  1代表通过，  0代表不通过
    modeType: function* (action){
        const {mode} = action;
        if (['play', 'demo'].indexOf(mode) === -1) {   //不是试玩也不是游戏
            yield all([
                put(PlayActions.playFailure()),
                put(AlertActions.alertAdd('INVALID_PLAY_TYPE', 'error')),
            ])
            return 0;
        }
        return 1;
    },
    playNotHaveToken: function* (action, token){
        const {mode} = action;
        if (mode === 'play' && !token) {   //play要有token
            yield all([
                put(PlayActions.playFailure()),
                put(AuthActions.authRequest()),
            ])
            return 0;
        }
        return 1;
    },
    //一个游戏ID不能同时试玩/游戏, 确认是否重新载入
    modeExist: function* (action){
        const state = yield select(selectPlay);
        const {gameId, mode} = action;
        if (!!state.data && state.data.hasOwnProperty(gameId) && state.data[gameId].mode === mode) {
            const message = 'You are playing this game', data = {mode: state.data[gameId].mode}
            const confirmed = yield call(confirm.confirmSaga, message, data)
            //是否重新加载
            if (!confirmed) {
                yield put(PlayActions.playCancel())
                return 0;
            }
        }
        return 1;
    },
    //真钱游戏一个品牌同时仅能打开一个游戏, 检查当前游戏是否有该品牌且ID不等于gameId的游戏正在运行
    gameBrandExist: function* (action){
        const state = yield select(selectPlay);
        const {gameId, mode, brand} = action;
        if (mode === 'play') {
            const currentBrandPlaying = R.filter(R.propEq('brand', brand))(Object.values(state.data))
            let currentId
            if (!!currentBrandPlaying && currentBrandPlaying.length) {
                for (let i = 0; i < currentBrandPlaying.length; i++) {
                    if (currentBrandPlaying[i].mode === 'play' && currentBrandPlaying[i].gameId !== gameId) {
                        currentId = currentBrandPlaying[i].gameId
                        break;
                    }
                }
            }
            //  gameId 会不会出现0的情况？？？  这里假设不会为0
            if (!!currentId) {
                const message = 'GAME_BRAND_EXISTS', data = {brand: brand}
                const confirmed = yield call(confirm.confirmSaga, message, data)
                if (!confirmed) {
                    yield put(PlayActions.playCancel())
                }else{
                    yield put(PlayActions.playClose(currentId))
                }
                return 0;
            }
        }
        return 1;
    }
}

export function* getPlay(api, token, action) {
    const pass = yield call(helper.filterFactory, filters, action, token);
    if(!pass){
        return;
    }

    const {gameId, params, mode, brand} = action;

    if (mode === 'play' && brand === 'PT' && params.type === 'flash') {   //没有测试
        window.loginCasinoApi(1, 'paul', '1234qwer')
    }

    try{
        const response = yield call(api.getPlay, gameId, params, mode, token);
        catchError(response, false);
        yield put(PlayActions.playSuccess({brand: brand, url: response.data.data, mode: mode, gameId: gameId}))
    }catch(err){
        yield* dealError(err, PlayActions.playFailure);
    }
}
