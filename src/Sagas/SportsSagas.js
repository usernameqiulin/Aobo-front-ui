import {put, call, take, select} from 'redux-saga/effects';

import AuthActions,{AuthTypes} from '../Redux/AuthRedux';
import AlertActions from "../Redux/AlertRedux";
import {AccountError, catchError, dealError} from './ErrorCatch';

export function* sportsLogin(action){   //当用户进入sports页面，点击需要用到用户信息的地方且sports是未登陆状态
    try{
        const {successCallback} = action;   //sports jssdk里的回调函数
        const authData = yield select(getAuth);
        if(authData){ //aobo登录状态
            console.log('已登录')
            const userInfo = yield select(getUserInfo);
            successCallback(userInfo)  //登录sports
        }else{
            console.log('未登陆');
            yield put(AuthActions.authRequest());
        }
    }catch(err){
        AlertActions.alertAdd('ERROR', 'error');
    }
}

export function* sportsLogout(action){  //清除sports用户信息, 在aobo用户退出的时候触发
    console.log('退出登录')
    try{
        if(!!window.NBBet && !!window.NBBet.clearUserInfo){
            window.NBBet.clearUserInfo();  //退出sports登录
        }
    }catch(err){
        AlertActions.alertAdd('sports logout error', 'error');
    }
}

const getAuth = state => state.auth.data

const getUserInfo = state => ({
    token: state.auth.data.access_token,
    balance: state.wallet.main.balances.available,
    username: state.profile.data.username,
    cry: state.profile.data.currency
})