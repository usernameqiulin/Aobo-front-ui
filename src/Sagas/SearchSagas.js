import {call, put, select} from 'redux-saga/effects'

import SearchActions from '../Redux/SearchRedux'
import { filterFactory, catchError, dealError } from './ErrorCatch';

const selectVersion = (state) => !!state.search.data ? state.search.version : 0

export const CACHE_TTL = 5*60*1000 //5 minutes in ms

export const filter = {
    version: function* (){
        const version = yield select(selectVersion);

        if (new Date().getTime() - version < CACHE_TTL) {
            yield put(SearchActions.searchCachedResult())
            return 0;
        }
        return 1;
    }
}

export function* getSearch(api, token, action) {
    if(!filterFactory(filter, action, token)){
        return;
    }
    try{
        const {params} = action
        const response = yield call(api.search, params, token);
        catchError(response, false);
        yield put(SearchActions.searchSuccess(response.data.data))
    }catch(err){
        yield* dealError(err, SearchActions.searchFailure);
    }
}
