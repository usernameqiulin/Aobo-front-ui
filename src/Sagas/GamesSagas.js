import {call, put} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import GamesActions from '../Redux/GamesRedux'
import { catchError, dealError } from './ErrorCatch';

export function* getGames(api, token, action) {
    try{
        yield call(delay, 5)
        let {params} = action
        const response = yield call(api.getGames, {...params, product: 'SLOTS'}, token);
        console.log(response)
        catchError(response, false);
        yield put(GamesActions.gamesSuccess(response.data));
    }catch(err){
        yield* dealError(err, GamesActions.gamesFailure)
    }
}

// const games = {
//         "ok": true,
//         "data": {
//             "stat": "success",
//             "meta": {
//                 "total": 1,
//             },
//             "data":[
//                 {
//                     "timestamps": {
//                         "updateAt": moment(),
//                     },
//                     "id":"4f92d8d0-26bc-11e8-b890-7d8e0d274a9f",
//                     "name":[{"locale":"zh-TW","value":"月亮公主"},{"locale":"en-GB","value":"Moon Princess"},{"locale":"zh-CN","value":"月亮公主"}],
//                     "demo":{"flash":true,"html5":true},
//                     "worksOn":{"pcBrowser":true,"mobileBrowser":true,"androidApp":true,"windowsDownload":true,"iosApp":true},
//                     "brand":{"code":"PNG","name":[{"locale":"en-GB","value":"Playn'Go"},{"locale":"zh-CN","value":"PNG"},{"locale":"zh-TW","value":"PNG"}]},
//                     "product":"SLOTS",
//                     "image":"629ce0a2927f191b4504de95a5adb492",
//                     "isNew":true,
//                     "isComingSoon":false,
//                     "isRecommend":true,
//                     "categories":[{"id":"86b47f40-5924-11e8-b7c2-bb152d9f6ff1","name":[{"locale":"zh-CN","value":"海派甜心"},{"locale":"zh-TW","value":"海派甜心"},{"locale":"en-GB","value":"Haipai sweetheart"}]}],
//                     "lines":0,
//                     "hasJackpot":false
//                 },{
//                     "timestamps": {
//                         "updateAt": moment('1998-09-09'),
//                     },
//                     "id":"4f92d8d0-26bc-11e8-b890-7d8e0d274b9f",
//                     "name":[{"locale":"en-GB","value":"TEST03"},{"locale":"zh-CN","value":"test1"},{"locale":"zh-TW","value":"test1"}],
//                     "demo":{"flash":true,"html5":true},
//                     "worksOn":{"pcBrowser":true,"mobileBrowser":true,"androidApp":true,"windowsDownload":true,"iosApp":true},
//                     "brand":{"code":"AG","name":[{"locale":"en-GB","value":"AsiaGaming"},{"locale":"zh-CN","value":"AG"},{"locale":"zh-TW","value":"AG"}]},
//                     "product":"SLOTS",
//                     "image":"aa",
//                     "isNew":true,
//                     "isComingSoon":true,
//                     "isRecommend":true,
//                     "categories":[],
//                     "lines":19,
//                     "hasJackpot":false
//                 },{
//                     "timestamps": {
//                         "updateAt": moment('1998-09-09'),
//                     },
//                     "id":"a7c156d0-b96e-11e7-9a75-3312a30ee230",
//                     "name":[{"locale":"en-GB","value":"Cash Grab"},{"locale":"zh-CN","value":"快抓钱"},{"locale":"zh-TW","value":"快抓钱"}],
//                     "demo":{"flash":true,"html5":false},
//                     "worksOn":{"pcBrowser":true,"mobileBrowser":false,"androidApp":false,"windowsDownload":false,"iosApp":false},
//                     "brand":{"code":"TTG","name":[{"locale":"en-GB","value":"Top Trend Gaming"},{"locale":"zh-CN","value":"TTG"},{"locale":"zh-TW","value":"TTG"}]},
//                     "product":"SLOTS",
//                     "image":"",
//                     "isNew":false,
//                     "isComingSoon":false,
//                     "isRecommend":true,
//                     "categories":[{"id":"f071b970-24f6-11e8-8216-690c6b7dcfcc","name":[{"locale":"en-GB","value":"Treasure"},{"locale":"zh-CN","value":"疯狂财富"},{"locale":"zh-TW","value":"瘋狂財富"}]}],
//                     "lines":3,
//                     "hasJackpot":false
//                 },
//             ]
//         }
//     }
