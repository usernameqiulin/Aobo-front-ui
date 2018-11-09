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

import CardActions from '../Redux/CardRedux'
import ProfileActions from '../Redux/ProfileRedux'
import AlertActions from '../Redux/AlertRedux'
import {catchError, dealError} from './ErrorCatch'

export function* getCards(api, token, action) {
    try{
        const response = yield call(api.getCards, token);
        catchError(response, false);
        yield put(CardActions.cardSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, CardActions.cardFailure);
    }

    //before

    // make the call to the api
    // const response = yield call(api.getCards, token)
    // // success?
    // if (response.ok) {
    //     const stat = path(['data', 'stat'], response)
    //     if (stat === 'failed') {
    //         yield all([
    //             put(CardActions.cardFailure(response.data.message)),
    //             // put(AlertActions.alertAdd(response.data.message, 'warning'))
    //         ])
    //     } else {
    //         yield put(CardActions.cardSuccess(response.data.data))
    //     }
    // } else {
    //     yield all([
    //         put(CardActions.cardFailure()),
    //         put(AlertActions.alertAdd(response.problem, 'error'))
    //     ])
    // }
}

//when user logout, reset to initial state
// export function* resetCard(action) {
//     yield put(CardActions.cardSuccess(null))
// }

export function* updateCard(api, token, action) {
    try{
        const {id, card} = action;
        const response = yield call(api.updateCard, id, card, token);
        catchError(response, false);
        yield put(CardActions.cardUpdateSuccess())
    }catch(err){
        yield* dealError(err, CardActions.cardUpdateFailure);
    }


    //before

    // const {id, card} = action
    // // make the call to the api
    // const response = yield call(api.updateCard, id, card, token)
    // // success?
    // if (response.ok) {
    //     const stat = path(['data', 'stat'], response)
    //     if (stat === 'failed') {
    //         yield put(CardActions.cardUpdateFailure(response.data.message))
    //     } else {
    //         yield put(CardActions.cardUpdateSuccess())
    //     }
    // } else {
    //     yield all([
    //         put(CardActions.cardUpdateFailure()),
    //         put(AlertActions.alertAdd(response.problem, 'error'))
    //     ])
    // }
}

export function* addCard(api, token, action) {
    try{
        const {card} = action;
        const response = yield call(api.addCard, card, token);
        catchError(response, false);
        yield all([
            put(CardActions.cardAddSuccess()),
            put(CardActions.cardRequest()),
            put(ProfileActions.profileRequest()),
        ])
    }catch(err){
        yield* dealError(err, CardActions.cardAddFailure);
    }

    //before

    // const {card} = action
    // // make the call to the api
    // const response = yield call(api.addCard, card, token)
    // // success?
    // if (response.ok) {
    //     const stat = path(['data', 'stat'], response)
    //     if (stat === 'failed') {
    //         yield all([
    //             put(CardActions.cardAddFailure(response.data.message)),
    //             // put(AlertActions.alertAdd(response.data.message, 'warning'))
    //         ])
    //     } else {
    //         yield all([
    //             put(CardActions.cardAddSuccess()),
    //             put(CardActions.cardRequest()),
    //             put(ProfileActions.profileRequest()),
    //         ])
    //     }
    // } else {
    //     if (response.status === 422) {
    //         yield put(CardActions.cardAddFailure(response.data.message))
    //     } else {
    //         yield put(AlertActions.alertAdd(response.data.message, 'error'))
    //     }
    // }
}

export function* deleteCard(api, token, action) {
    try{
        const {id, params} = action;
        const response = yield call(api.deleteCard, id, params, token);
        catchError(response, false);
        yield all([
            put(CardActions.cardDeleteSuccess()),
            put(CardActions.cardRequest()),
        ])
    }catch(err){
        yield* dealError(err, CardActions.cardDeleteFailure);
    }

    //before

    // const {id, params} = action
    // // make the call to the api
    // const response = yield call(api.deleteCard, id, params, token)
    // // success?
    // if (response.ok) {
    //     const stat = path(['data', 'stat'], response)
    //     if (stat === 'failed') {
    //         yield all([
    //             put(CardActions.cardDeleteFailure(id, response.data.message)),
    //             // put(AlertActions.alertAdd(response.data.message, 'warning'))
    //         ])
    //     } else {
    //         yield all([
    //             put(CardActions.cardDeleteSuccess()),
    //             put(CardActions.cardRequest()),
    //         ])
    //     }
    // } else {
    //     if (response.status === 422) {
    //         yield put(CardActions.cardDeleteFailure(id, response.data.message))
    //     } else {
    //         yield put(AlertActions.alertAdd(response.problem, 'error'))
    //     }
    // }
}
