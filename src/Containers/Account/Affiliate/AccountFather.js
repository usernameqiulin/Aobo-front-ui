import {PureComponent} from 'react';
import queryString from "query-string";
import R from "ramda";
import i18n from "../../../i18n";

class AccountFather extends PureComponent{
    constructor(props){
        super(props);  
        this.createState = this.createState.bind(this);
        this.updateUrl = this.updateUrl.bind(this);  
        this.searchChange = this.searchChange.bind(this); 
        this.filterChange = this.filterChange.bind(this);
        this.shouldQuery = this.shouldQuery.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }
    createState(state){ //创建state，由子类调用, 父类管理params
        return {
            ...state,
            params: {...this.DEFAULT_PARAMS, ...queryString.parse(this.props.location.search)}
        }
    }
    updateUrl(type){  //更新url
        // console.log('updateUrl');
        // console.log(this.state.params);
        let url = this.props.match.path + '?' + queryString.stringify(this.state.params)
        if (type && type === 'replace') {
            this.props.history.replace(url) 
        } else {
            this.props.history.push(url)
        }
    }
    searchChange(data){   //搜索内容变化
        // console.log(data);
        let params = R.merge(this.state.params, {});
        if(data === ""){ //搜索条件为空
            delete params[this.searchSlug];
            this.setState({
                params: params
            }, () => this.updateUrl('replace'));
            return;
        }
        params[this.searchSlug] = data;  //子组件里定义好searchSlug
        this.setState({
            params: params,
        }, () => this.updateUrl())
    }
    filterChange(data){  //选择条件变化
        let params = R.merge(this.state.params, {});
        if(data.slug === 'time'){  //时间
            if (data.selected[0]) {
                params['start_' + data.slug] = data.selected[0]
            } else {
                delete params['start_' + data.slug]
            }
            if (data.selected[1]) {
                params['end_' + data.slug] = data.selected[1]
            } else {
                delete params['end_' + data.slug]
            }
        }else{ //单选或者多选
            params[data.slug] = data.selected;
            data.selected.length > 0 ? params[data.slug] = data.selected.join(',') : delete params[data.slug]
        }
        this.setState({
            params: params,
        }, () => this.updateUrl())
    }
    onPageChange(p){ //页数变化
        if (p !== parseInt(this.state.params.page) && p > 0) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: p,
                },
            }, () => {
                this.updateUrl();
                this.pageDidChange && this.pageDidChange();
            })
        }
    }
    shouldQuery(){  //调用子类的doQuery
        this.doQuery(this.state.params);
    }
    componentDidMount(){  //处理url进入 及第一次点击进入组件        
        const url = queryString.parse(this.props.location.search);
        if(this.props.location.search){  //如果不为空，也就是url进入
            let should = true;
            for(let item in this.DEFAULT_PARAMS){
                if(!url[item]){   //url与state不同步
                    this.updateUrl('replace');
                    should = false;
                    break;
                }
            }
            should && this.shouldQuery();
        }else{
            if(JSON.stringify(this.state.params) === '{}'){   //空对象
                this.shouldQuery();
            }else{
                this.updateUrl('replace');   //更新url，会触发组件更新
            }
        }
        this.languageChanged && i18n.on('languageChanged', this.languageChanged);
    }
    componentWillUnmount(){
        this.languageChanged && i18n.off('languageChanged', this.languageChanged);
    }
    componentDidUpdate(prevProps){
        // console.log('didupdate');
        // console.log(prevProps.location.search);
        // console.log(this.props.location.search);
        if(this.props.location.search === prevProps.location.search){
            return;
        }

        //url变了

        if (!this.props.location.search) {  //url变了，且新的查询为空   点击了link标签
            if(JSON.stringify(this.state.params) === '{}'){  // 同步
                this.shouldQuery();
            }else{
                this.setState({
                    params: this.DEFAULT_PARAMS,
                }, () => {

                    JSON.stringify(this.state.params) === '{}' ? this.shouldQuery() : this.updateUrl('replace')
                })   
            }


                    
        }
        else{   
            this.shouldQuery()
        }
    }
}

export default AccountFather;


//保证组件能够有正确的url和发出正确的action

/*
    readme
    创建React类继承自AccountFather
    如：
    class Zp extends AccountFather{
        constructor(props){
            super(props);
            this.DEFAULT_PARAMS = {
                start_time: '2018-01-01',
                end_time: '2018-06-01',
                page: 1,
            }
            this.searchSlug = 'username'  //搜索的key
            this.state = this.createState(otherState)
        }
        doQuery(params){
            this.props.getData(params) 
            //查询数据,getData自定义
        }
        render(){
            return (
                <FilterSectionFactory
                    params = {this.state.params}  //必须
                    search = {
                        onChange: this.selectChange,
                        keyword: this.state.params[this.searchSlug]
                    }
                    onSelectChange = {this.filterChange}
                >
                </FilterSectionFactory>
            )
        }
    }
*/