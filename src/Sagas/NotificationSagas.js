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

import {call, put, all} from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificationRedux'
import { catchError, dealError } from './ErrorCatch';

// import sinon from 'sinon';

export function* getNotifications(api, token) {
    // const ssss = sinon.stub(api, 'getNotifications').callsFake(()=>{
    //     return {
    //         ok: true,
    //         data: {
    //             stat: 'ok',
    //             data: [
    //                 {
    //                     id: 1,
    //                     hasBackground: false,
    //                     imageType: 'gameIcon',
    //                     image: 'http://localhost:3000/static/media/right-1x.cbbd9670.png',
    //                     icon: 'http://localhost:3000/static/media/right-1x.cbbd9670.png',
    //                     description: 'sss'
    //                 }
    //             ],
    //         }
    //     }
    // })

    try{
        const response = yield call(api.getNotifications, token);
        catchError(response, false);
        yield put(NotificationActions.notificationSuccess(response.data.data));
    }catch(err){
        yield* dealError(err, NotificationActions.notificationFailure, {alertAdd: false});
    }

    // ssss.restore();
}

export function* consumeAllNotifications(api, token) {   //熄灭消息图标，但是保留消息
    try{
        const response = yield call(api.clearNotifications, token);
        catchError(response, false);
        yield put(NotificationActions.notificationConsumeAllSuccess())
    }catch(err){
        //   需要错误处理么  ？？？
    }
}

export function* clearNotifications(api, token) {   //熄灭消息图标， 并清空所有消息
    yield all([
        put(NotificationActions.notificationReset()),
        call(api.clearNotifications, token),
    ])
}