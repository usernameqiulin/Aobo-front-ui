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

import {call, put} from 'redux-saga/effects'

import SlotsFiltersActions from '../Redux/SlotsFiltersRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getFilters(api, token, action) {
    try{
        const response = yield call(api.getFilters, token);
        catchError(response, false);
        yield put(SlotsFiltersActions.filtersSuccess(response.data))
    }catch(err){
        yield* dealError(err, SlotsFiltersActions.filtersFailure);
    }
}
