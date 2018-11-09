/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to Sagas/index.js
 *  - This template uses the api declared in Sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {call, put, select, all} from 'redux-saga/effects'
import {path} from 'ramda'

import FavoriteActions from '../Redux/FavoriteRedux'
import AlertActions from '../Redux/AlertRedux'
import {catchError, dealError} from './ErrorCatch';

export function* getFavorites(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.getFavorites, params, token);
        catchError(response, false);
        yield put(FavoriteActions.favoriteSuccess(response.data))
    }catch(err){
        yield* dealError(err, FavoriteActions.favoriteFailure);
    }
}

//when user logout, reset to initial state
// export function* resetFavorite(action) {
//     yield put(FavoriteActions.favoriteSuccess(null))
// }

export function* addFavorite(api, token, action) {
    try{
        const {params} = action;
        const response = yield call(api.addFavorite, params, token);
        catchError(response, false);
        yield all([
            put(FavoriteActions.favoriteAddSuccess()),
            put(FavoriteActions.favoriteRequest({})),
        ]);
    }catch(err){
        yield* dealError(err, FavoriteActions.favoriteFailure);
    }
}

export function* deleteFavorite(api, token, action) {
    try{
        const {gameId} = action;
        const response = yield call(api.deleteFavorite, gameId, token);
        catchError(response, false);
        yield all([
            put(FavoriteActions.favoriteDeleteSuccess()),
            put(FavoriteActions.favoriteRequest({})),
        ]);
    }catch(err){
        yield* dealError(err, FavoriteActions.favoriteFailure);
    }
}
