import queryString from 'query-string'

import AccountFather from '../../../../src/Containers/Account/Affiliate/AccountFather';
import {Url, changeErr} from '../../../helper'

describe('Container/AccountFather', () => {
    // it('should call languageChanged when language changed', (done) => {
    //     const mock = sinon.mock(TestComponent.prototype);
    //     mock.expects('languageChanged').atLeast(1);
    //     let accountFatherUrl = new Url(testData.initUrl[0].path, testData.initUrl[0].path.search);
    //     const wrapper = accountFatherUrl.initShallowWrapper(<TestComponent/>);
    
    //     i18n.changeLanguage('en', ()=>{
    //         setTimeout(()=>{
    //             mock.verify();
    //             done();
    //         },0)
    //     })
    //     mock.restore();
    // })
    it('state should correct', () => {
        DEFALUT_PARAMS.map((default_params, dIndex) => {
            testData.initUrl.map((item, index) => {
                // init (componentDidMount) 
                let accountFatherUrl = new Url(item.path, item.search);
                const wrapper = accountFatherUrl.initShallowWrapper(<TestComponent DEFALUT_PARAMS={default_params}/>)
                changeErr(()=>checkState(wrapper, {...default_params, ...queryString.parse(item.search)}), `default_params: ${dIndex}, init: ${index}`)
                //update
                for(let operation in testData.update){
                    testData.update[operation].map((operationalData, index) => {
                        wrapper.find(funcMapTag[operation]).simulate('click') 
                        const expectState = createExpectState(operation, operationalData, wrapper.state().params);
                        changeErr(()=>checkState(wrapper, expectState), `default_params: ${dIndex},${operation}: ${index}`)
                    })
                }
                //reset url (click link)
                accountFatherUrl.reset();
                changeErr(()=>checkState(wrapper, {...default_params}), `default_params: ${dIndex}, reset`)
                //unmount
                wrapper.unmount();
            })
        })  
    })
    it('state should sync with url', () => {    
        DEFALUT_PARAMS.map((default_params, dIndex) => {
            testData.initUrl.map(item => {
                // init (componentDidMount) 
                let accountFatherUrl = new Url(item.path, item.search);
                const wrapper = accountFatherUrl.initShallowWrapper(<TestComponent DEFALUT_PARAMS={default_params}/>)
                checkUrl(wrapper, accountFatherUrl.getSearch())
                //update
                for(let operation in testData.update){
                    testData.update[operation].map(operationalData => {
                        wrapper.find(funcMapTag[operation]).simulate('click')  
                        checkUrl(wrapper, accountFatherUrl.getSearch())
                    })
                }
                //reset url (click link)
                accountFatherUrl.reset();
                checkUrl(wrapper, accountFatherUrl.getSearch())
                //unmount
                wrapper.unmount();
            })
        })

        
    })
    it('doQuery called(times & if)', () => {
        let doQuery = sinon.spy(TestComponent.prototype, 'doQuery');  //监听doQuery
        DEFALUT_PARAMS.map((default_params, dIndex) => {
            testData.initUrl.map((item, index) => {
                doQuery.callCount = 0;
                // init (componentDidMount) 
                let accountFatherUrl = new Url(item.path, item.search);
                const wrapper = accountFatherUrl.initShallowWrapper(<TestComponent DEFALUT_PARAMS={default_params}/>);
                const check = checkDoQuery(wrapper);
                changeErr(()=>check(wrapper, doQuery.callCount), `default_params: ${dIndex},init: ${index}`)
                //update
                for(let operation in testData.update){
                    testData.update[operation].map((operationalData, index) => {
                        wrapper.find(funcMapTag[operation]).simulate('click')  
                        changeErr(()=>check(wrapper, doQuery.callCount), `default_params: ${dIndex},${operation}: ${index}`)
                    })
                }
                //reset url (click link)
                accountFatherUrl.reset();
                changeErr(()=>check(wrapper, doQuery.callCount), `default_params: ${dIndex},reset`)
                //unmount
                wrapper.unmount();
            })
        })
        doQuery.restore();
    })
})

const createExpectState = (operation, operationalData, prevState) => {
    let expectState = {...prevState};
    if(operation === 'search'){
        if(operationalData === ""){ //搜索条件为空
            delete expectState[searchSlug];
        }else{
            expectState[searchSlug] = operationalData;  //子组件里定义好searchSlug
        }
    }else if(operation === 'time'){
        if (operationalData.selected[0]) {
            expectState['start_' + operationalData.slug] = operationalData.selected[0]
        } else {
            delete expectState['start_' + operationalData.slug]
        }
        if (operationalData.selected[1]) {
            expectState['end_' + operationalData.slug] = operationalData.selected[1]
        } else {
            delete expectState['end_' + operationalData.slug]
        }
    }else if(operation === 'select'){
        expectState[operationalData.slug] = operationalData.selected;
        operationalData.selected.length > 0 ? expectState[operationalData.slug] = operationalData.selected.join(',') : delete expectState[operationalData.slug]
    }else if(operation === 'page'){
        expectState.page = operationalData;
    }
    return expectState;
}

const checkState = (wrapper, stateParams) => {
    expect(queryString.parse(queryString.stringify(wrapper.state().params))).to.deep.equal(queryString.parse(queryString.stringify(stateParams)))
}

const checkUrl = (wrapper,url) => {
    expect(queryString.parse(queryString.stringify(wrapper.state().params))).to.deep.equal(queryString.parse(url)) //是否与url同步
}

const checkDoQuery = (wrapper) => {
    let expectCallCount = 1;
    let prevState = wrapper.state();
    return (wrapper, callCount) => {
        let same = true;
        try{
            checkState(wrapper, prevState.params);  //检查state是否有变化，建立在state正确的情况下
        }catch(err){
            //不相同
            same = false;
            expect(callCount).to.equal(++expectCallCount);
        }
        prevState = wrapper.state();
        //相同
        same && expect(callCount).to.equal(expectCallCount);
    }
}

const DEFALUT_PARAMS = [
    {},
    {
        start_time: '2018-01-01',
        end_time: '2018-06-01',
        page: 1,
    }
]

const searchSlug = 'username'

class TestComponent extends AccountFather{  //测试组件
    constructor(props){
        super(props);
        this.DEFAULT_PARAMS = props.DEFALUT_PARAMS
        this.searchSlug = searchSlug  //搜索的key
        this.state = this.createState({})
        this._searchIndex = 0;
        this._pageIndex = 0;
        this._selectIndex = 0;
        this._timeIndex = 0;
    }
    languageChanged(){
        // console.log('22')
    }
    doQuery(params){
        // console.log(params);
        //查询数据,getData自定义
    }
    _search = () => {
        this.searchChange(testData.update.search[this._searchIndex++])
    }
    _page = () => {
        this.onPageChange(testData.update.page[this._pageIndex++])
    }
    _select = () => {
        this.filterChange(testData.update.select[this._selectIndex++])
    }
    _time = () => {
        this.filterChange(testData.update.time[this._timeIndex++])
    }
    render(){
        return (
            <div>
                <h1 onClick={this._search}></h1>
                <h2 onClick={this._select}></h2>
                <h3 onClick={this._page}></h3>
                <h4 onClick={this._time}></h4>
            </div>
        )
    }
}

const funcMapTag = {  //操作对应点击标签
    search: 'h1',
    select: 'h2',
    time: 'h4',
    page: 'h3',
}

const testData =  //测试数据
    {
        initUrl: [
            {
                path: '/account/members',
                search: ''
            },
            {
                path: '/account/members',
                search: 'end_time=2018-06-14%2023%3A59%3A59'
            },
            {
                path: '/account/members',
                search: 'end_time=2018-06-14%2023%3A59%3A59&page=1&start_time=2018-03-08%2000%3A00%3A00'
            },
            {
                path: '/account/members',
                search: 'end_time=2018-06-14%2023%3A59%3A59&page=2&start_time=2018-03-08%2000%3A00%3A00&locked=2'
            }
        ],
        update: {
            search: ['kkk','ss', ''],   //因为search判断条件都是放在saga里做的，这里只需要简单测试有无值
            time: [
                {
                    slug: 'time',
                    selected: ["2018-03-08 00:00:00", "2018-06-14 23:59:59"]
                },
                {
                    slug: 'time',
                    selected: ["2018-03-08 00:00:00"]
                }
            ],
            select: [
                {
                    slug: 'locked',
                    selected: ['1'], //单选
                },
                {
                    slug: 'locked',
                    selected: ['1', '2'],  //多选
                },
                {
                    slug: 'locked',
                    selected: [],
                },
            ],
            page: [1, 10, 100]    //放在saga里验证
        }
    }