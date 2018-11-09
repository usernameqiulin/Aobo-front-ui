import EventEmitter from 'events';
import {catchError, dealError, filterFactoryMock, filterFactoryRestore} from '../src/Sagas/ErrorCatch'
import { runSaga } from 'redux-saga';

export class Url extends EventEmitter{
    constructor(initPath = "", initSearch){ 
        super();
        this.url = this._createUrl(initPath, initSearch)
    }
    initMountWrapper = (Component) => {
        let UrlComponent = {...Component};
        UrlComponent.props = {...UrlComponent.props, ...this.url};
        const wrapper = mount(UrlComponent);
        wrapper.setProps({...this.url})  //在shallow构建wrapper过程中如果有url更新， 下面的监听函数不会监听到
        this.on('urlChanged', () => wrapper.setProps({...this.url}))
        return wrapper;
    }
    initShallowWrapper = Component => {
        let UrlComponent = {...Component};
        UrlComponent.props = {...UrlComponent.props, ...this.url};
        const wrapper = shallow(UrlComponent, { lifecycleExperimental: true });
        wrapper.setProps({...this.url})  //在shallow构建wrapper过程中如果有url更新， 下面的监听函数不会监听到
        this.on('urlChanged', () => wrapper.setProps({...this.url}))
        return wrapper;
    }
    getSearch = () => {
        return this.url.location.search;
    }
    _push = (url) => {
        this._replace(url);
    }
    _replace = (url) => {
        //     /account/members?end_time=2018-06-28%2023%3A59%3A59&start_time=2018-03-04%2000%3A00%3A00
        // console.log(url)
        const urlSplit = url.split('?');
        this.url = this._createUrl(urlSplit[0], urlSplit[1]);
        this.emit('urlChanged');
    }
    reset = () => {
        this.url = this._createUrl(this.url.location.pathname, '');
        this.emit('urlChanged');
    }
    _createUrl = (path, search) => {
        return {
            location: {
                hash: "",
                key: "w4tmkw",
                pathname: path,
                search: (!search || search === '') ? '' : '?'+search,
                state: undefined
            },
            match: {
                isExact: true,
                params: {},
                path: path,
                url: path + search
            },
            history: {
                push: this._push,
                replace: this._replace
            }
        }
    }
}

export const changeErr = (fn, addMessage, params) => {
    try{
        fn()
    }catch(err){
        err.message = `${addMessage}: ${err.message}`;
        throw err;
    }
}

const alllng = ['en', 'zh-CN', 'zh-TW'];

export const changeLanguage = async (lng) => {
    return new Promise((resolve, reject) => {
        i18n.changeLanguage(lng, () => {
            resolve();
        })
    })
}

export const checkLanguage = async (node, key) => {
    for(let lng of alllng){
        await changeLanguage(lng);
        expect(node.text()).to.equal(i18n.t(key));
    }
}

export const getState = (name) => store.getState()[name];

export class CheckDom{
    constructor(rootNode, stateMapDom){
         /* 
            全部显示的情况
            stateMapDom = {                                 不同状态相对应的dom结构
                dataDispaly(required): {                    数据展示
                    name(required): String
                    prop(options): String   
                    class(options): String
                    has(options): Boolean  default(true)
                }
                error(required): same above                 错误
                dataFetching(required): same above          大的加载动画
                fetchingHint(required): same above          加载提示
            }
        */
        this.rootNode = rootNode;
        this.stateMapDom = stateMapDom;
    }
    _createExpectValue = (state) => {    
        const expectValue = state.prop ? this.rootNode.find(state.name).prop(state.prop) :
        state.class ? this.rootNode.find(state.name).hasClass(state.class):
        this.rootNode.find(state.name).exists(); 
        return state.has === false ? !expectValue : expectValue; //has是 是否有这个prop或者class的意思， 默认为有
    }
    checkStateMapDom = (stateDescribe, dataDisplayIf, errorIf, dataFetchingIf, fetchingHintIf) => {
        changeErr(()=>expect(this._createExpectValue(this.stateMapDom.error)).to.equal(errorIf), stateDescribe);  //error
        changeErr(()=>expect(this._createExpectValue(this.stateMapDom.dataDisplay)).to.equal(dataDisplayIf), stateDescribe);   //display
        changeErr(()=>expect(this._createExpectValue(this.stateMapDom.dataFetching)).to.equal(dataFetchingIf), stateDescribe); //显示块大的加载动画
        changeErr(()=>expect(this._createExpectValue(this.stateMapDom.fetchingHint)).to.equal(fetchingHintIf), stateDescribe) //加载提示
    }
    checkInit = () => this.checkStateMapDom('init:', false, false, true, true)
    checkInitToFetching = () => this.checkStateMapDom('init->fetching:', false, false, true, true)
    checkFetchingToSuccess = () => this.checkStateMapDom('fetching->success:', true, false, false, false)
    checkFetchingToFailure = () => this.checkStateMapDom('fetching->failure:', false, true, false, false)
    checkFetchingToFetching = () => this.checkStateMapDom('fetching->fetching:', false, false, true, true)
    checkSuccessToFetching = () => this.checkStateMapDom('success->fetching:', true, false, false, true)
    checkFailureToFetching = () => this.checkStateMapDom('failure->fetching:', false, false, true, true)
}

export const checkStoreMapDom = (rootNode, stateMapDom, actions, updateNode) => {
    /*
        actions = {
            request(required): {
                method(required): Func
                params(options): any
                extra(options): expectFunc  额外要比较的条件
            }
            success(required): same above
            failure(required): same above
            reset(required): same above
        }
    */
    const {request, success, failure, reset} = actions;
    const checkDom = new CheckDom(rootNode, stateMapDom);

    const _dispatch = (action) => {
        store.dispatch(action.method(action.params));
        updateNode();
        action.extra && action.extra();
    }

    try{     
        /* 
            reducer与container合起来测试
            好处: 不关心reducer实现， reducer state可能继承了上次的state， 如果关心reducer实现， 测试逻辑会很复杂。

            init:               数据显示区域: 动画，    有加载提示 
            init->fetching:     数据显示区域: 动画，    有加载提示 
            fetching->success:  数据显示区域: 数据，    无加载提示  
            fetching->failure:  数据显示区域: 错误提示， 无加载提示  
            fetching->fetching: 数据显示区域: 动画      有加载提示  
            success->fetching:  数据显示区域: 数据      有加载提示   
            failure->fetching:  数据显示区域: 动画      有加载提示  
            不考虑 ?->init, 因为init肯定设定的固定值，与上次状态无关

            约定: success传递的是一个对象， failure传递的是一个字符串，
            约定如有修改，需要修改测试
        */
        //init
        checkDom.checkInit();
        //fetching
        _dispatch(request);
        checkDom.checkInitToFetching();
        //success
        _dispatch(success);
        checkDom.checkFetchingToSuccess();
        //fetching
        _dispatch(request);
        checkDom.checkSuccessToFetching();
        //failure
        _dispatch(failure);
        checkDom.checkFetchingToFailure();
        //fetching
        _dispatch(request);
        checkDom.checkFailureToFetching();
        //fetching
        _dispatch(request);;
        checkDom.checkFetchingToFetching();
        //reset( to init )
        _dispatch(reset);
    }catch(err){
        throw err;
    }finally{
        //reset( to init )
        store.dispatch(reset.method());
    }
}

const expectActionDefaultOptions = {
    catchNoResults: true, 
    diffErrType: true,
    alertAdd: true,
}

export const expectAction = (response, successActionFunc, failureActionFunc, options = expectActionDefaultOptions) => {
    options = {...expectActionDefaultOptions, ...options};
    
    const dispatched = [];
    try{
        catchError(response, options.catchNoResults);
        const successActions = successActionFunc();
        Array.isArray(successActions) ?
        dispatched.push(...successActions)
        :
        dispatched.push(successActions);
    }catch(err){
        runSaga({
            dispatch: action => dispatched.push(action),
            getState: () => ({state: 'test-state'}),
        }, dealError, err, failureActionFunc, {diffType: options.diffErrType, alertAdd: options.alertAdd})
    }finally{
        return dispatched;
    }
}

export const responseShould = 'response should be handled correctly & api be called correctly';

export const expectFilter = {
    _expect: (saga, sagaParams, getState, expectDipatched, result) => {
        let dispatched = [];
    
        const Task = runSaga({
            dispatch: action => dispatched.push(action),
            getState: getState
        }, saga, ...sagaParams);
    
        expect(dispatched).deep.equal(expectDipatched);
        expect(Task.result()).to.equal(result);
    },
    failure: (saga, sagaParams, stateMock, expectDipatched) => expectFilter._expect(saga, sagaParams, stateMock, expectDipatched, 0),
    success: (saga, sagaParams, stateMock, expectDipatched) => expectFilter._expect(saga, sagaParams, stateMock, expectDipatched, 1),
}

export const filterFactoryCalledShould = 'should call filterFactory correctly and handle filterFactory result correctly'

export const expectFilterFactoryCalled = (saga, sagaParams, apiStub, filter) => {
    try{
        apiStub.callsFake(() => new Promise(() => {}))  //阻塞api下面的执行

        const filterFactory = sinon.stub();
        filterFactoryMock(filterFactory);   //替换filterFactory

        //success
        filterFactory.callsFake(() => 1);
        runSaga({
            getState: () => {},
            dispatch: () => {}
        }, saga, ...sagaParams);
        expect(apiStub.callCount).to.equal(1);
        expect(filterFactory.callCount).to.equal(1);
        expect(filterFactory.calledWith(filter, sagaParams[2], sagaParams[1])).to.equal(true);

        apiStub.resetHistory();
        filterFactory.resetHistory();

        //failure
        filterFactory.callsFake(() => 0);
        runSaga({
            getState: () => {},
            dispatch: () => {}
        }, saga, ...sagaParams);
        expect(apiStub.callCount).to.equal(0);
        expect(filterFactory.callCount).to.equal(1);
        expect(filterFactory.calledWith(filter, sagaParams[2], sagaParams[1])).to.equal(true);
    }catch(err){
        throw err;
    }finally{
        filterFactoryRestore();
    }
}

export const filterFactorySuccess = (callback, ...args) => {
    try{
        const filterFactory = sinon.stub();
        filterFactoryMock(filterFactory);   //替换filterFactory

        //success
        filterFactory.callsFake(() => 1);

        const value = callback(...args);
        filterFactoryRestore();
        return value;
    }catch(err){
        throw err;
    }finally{
        filterFactoryRestore();
    }
}