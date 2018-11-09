import {path} from 'ramda';
import {put, call, all} from 'redux-saga/effects';
import AlertActions from '../Redux/AlertRedux';

export class AccountError extends Error {
    constructor(message, type = 1) {
        super(message);
        this.type = type;
    }
}

export const catchError = (response, noResultsError = true) => {  //同步方法
    if(response.ok){
        const status = path(['data', 'stat'], response);
        if (status === 'failed') {
            throw new AccountError(response.data.message, 1);
        } else {
            if (!!response.data.data && JSON.stringify(response.data.data) !== "{}" && JSON.stringify(response.data.data) !== '[]') {
                //success
            } else if (noResultsError) {
                throw new AccountError('No results found', 2);
            }
        }
    } else {
        if (response.data && response.data.stat === 'failed') {
            throw new AccountError(response.data.message, 3);
        } else {
            throw new AccountError(response.problem, 3);
        }
    }
}

const dealErrorDefaultOptions = {
    diffType: true,
    alertAdd: true
}

export function* dealError(error, failAction, options = dealErrorDefaultOptions) {
    options = {...dealErrorDefaultOptions, ...options};
    error.type = options.diffType ? error.type : 3;
    if (error.type === 1) {   // 错误提示， wraning警告    ok: true, stat: failed
        yield all([
            failAction && put(failAction(error.message)),
            options.alertAdd && put(AlertActions.alertAdd(error.message, 'warning'))
        ])
    } else if (error.type === 2) {   // 错误提示， 无警告无弹出   //No results found
        yield failAction && put(failAction(error.message))
    } else if (error.type === 3) {      //  ok: false
        yield all([   //错误提示， 有弹出
            failAction && put(failAction(error.message)),
            options.alertAdd && put(AlertActions.alertAdd(error.message, 'error'))
        ])
    }
}

function* _filterFactory(filters, action, token){     //目前只支持断点执行， 要扩展支持不断点执行
    for(let key in filters){
        const pass = yield call(filters[key], action, token);
        if(!pass){
            return 0;
        }
    }
    return 1;
}

const _mockHelper = {
    _filterFactory: _filterFactory,
    set filterFactory(mockFunc){
        this._filterFactory = mockFunc;
    },
    get filterFactory(){
        return this._filterFactory;
    },
    filterFactoryMock(mockFunc){
        this.filterFactory = mockFunc;
    },
    filterFactoryRestore(){
        this.filterFactory = _filterFactory
    }
}

export const filterFactory = (...args) => _mockHelper.filterFactory(...args);
export const filterFactoryMock = _mockHelper.filterFactoryMock.bind(_mockHelper);
export const filterFactoryRestore = _mockHelper.filterFactoryRestore.bind(_mockHelper);


