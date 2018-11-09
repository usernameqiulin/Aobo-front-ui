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
import LocaleActions from '../Redux/LocaleRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getLocale(api, token, action) {
    try{
        const response = yield call(api.getLocales, token);
        catchError(response, false);
        yield put(LocaleActions.localeSuccess(response.data.data));
    }catch(err){
        yield* dealError(err, LocaleActions.localeFailure);
    }
}
