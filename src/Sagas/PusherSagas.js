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

import { put } from 'redux-saga/effects'
import PusherActions from '../Redux/PusherRedux'
import Pusher from 'pusher-js'

export const external = {
  Pusher: Pusher
}

export function * getPusher () {
  // make the call to the api
  // const response = yield call(api.getPusher, data)
  let client = new external.Pusher(process.env.REACT_APP_PUSHER_KEY, {
    encrypted: true,
    cluster: 'ap1',
  })

  // console.log(client);

  // success?
  if (client) {
    yield put(PusherActions.pusherSuccess({client: client}))
  } else {   //如何判断初始化失败 ？？？？
    yield put(PusherActions.pusherFailure())
  }
}

