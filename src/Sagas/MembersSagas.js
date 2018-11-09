import {put, call, all} from 'redux-saga/effects';

import MembersActions from '../Redux/MembersRedux';
import {AccountError, catchError, dealError} from './ErrorCatch';

export function* getMembers(api, token, action){   //监听action{type: 'MEMBERS_REQUEST'}
    try{
        const params = action.params;
        if(params.username && (params.username.length < 4 || params.username.length > 17)){
            throw new AccountError('username limit', 2);
        }
        const response = yield call(api.getMembers, params, token);
        catchError(response);
        yield put(MembersActions.membersSuccess(response.data));
    }catch(err){
        yield* dealError(err, MembersActions.membersFailure);
    }
}
