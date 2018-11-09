import React,{Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Helmet} from "react-helmet";
import moment from "moment/moment";
import PropTypes from 'prop-types'

import MembersActions from "../../../Redux/MembersRedux";
import ScrollToTopOnMount from "../../../Components/ScrollToTopOnMount"
import FilterSectionFactory from '../../../Components/Filter/FilterSectionFactory'
import ABSpinner from "../../../Components/ABSpinner";
import i18n from '../../../i18n';
import AccountFather from './AccountFather';

import './Members.css';

const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')


export class Members extends AccountFather{
    constructor(props){
        super(props);
        console.log(props.location);
        this.DEFAULT_PARAMS = {
            start_time: MIN.format(process.env.REACT_APP_TIME_FORMAT),
            end_time: MAX.format(process.env.REACT_APP_TIME_FORMAT),
        }
        this.searchSlug = 'username';
        this.state = this.createState({});
        this.filters = this.createFilters(this.props.t);
        
    }
    createFilters(t){
        return [{
            title: t('members.state'),
                slug: 'locked',
                choices: [
                    {
                        title: t('members.locked'),
                        slug: '1',
                    },
                    {
                        title: t('members.unlocked'),
                        slug: '0',
                    },
                ],
                is_grouped: false,
                is_multichoice: false,
        }]
    }
    doQuery(params){
        this.props.getMembers(params)
    }
    languageChanged = () => {
        this.filters = this.createFilters(this.props.t);
    }
    render(){
        const {t, members, profile} = this.props;
        return (
            <div className="container account cf members-component">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('members.title')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.filters}
                        params = {
                            this.state.params
                        }
                        timeRange = {
                            {
                                slug: 'time',
                                withTime: true,
                                available: [MIN, MAX],
                            }
                        }
                        isLoading={members.fetching}
                        t = {t}
                        search = {
                            {
                                onChange: this.searchChange,
                                keyword: this.state.params[this.searchSlug]
                            }
                        }
                        onSelectChange = {this.filterChange}
                    />
                </section>
                <div className="module-header wallet__module-header cf">
                    <h1 className={`header__title `}>
                        {t('members.title')}
                    </h1>
                </div>
                <ABSpinner hidden={!(members.fetching && !members.show)} size={'big'}/>
                {
                    members.error &&
                    <div className="container list__message">
                        <span className="list__message-in">{t(members.error)}</span>
                    </div>
                }
                {
                    members.show &&
                    <ul className={`members-list wallet-transactions`}>
                        <li className="clearfix wallet-transactions__head">
                            <div className="wallet-transactions__header members-prop members-username">{t('members.username')}</div>
                            <div className="wallet-transactions__header members-prop members-dateTime">{t('members.date')}</div>
                            <div className="wallet-transactions__header members-prop members-locked">{t('members.state')}</div>
                        </li>
                        <MembersList members={members.data.data} t={t} timezone={profile.data.timezone}></MembersList>
                    </ul>
                }
                
            </div>
        )
    }
}

Members.propTypes = {
    members: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getMembers: PropTypes.func.isRequired
}

export class MembersList extends Component{
    constructor(props){
        super(props);
        this.color = [
            '#737373', 'green', 'blue', 'red', 'yellow'
        ];
        this.state = {
            childrenOpen: {}
        }
    }
    componentDidMount(){
        i18n.on('languageChanged', this.languageChanged);
    }
    componentWillUnmount(){
        i18n.off('languageChanged', this.languageChanged);
    }
    languageChanged = () => {
        this.setState(prevState=>({
            childrenOpen: {...prevState.childrenOpen}
        }))
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.members !== this.props.members || nextState.childrenOpen !== this.state.childrenOpen){
            return true;
        }else{
            return false;
        }
    }
    openChildren = (item)=>{
        if(!item.children.length){
            return;
        }
        this.setState(prevState=>{
            prevState.childrenOpen[item.username] = !prevState.childrenOpen[item.username];
            return {
                childrenOpen: {...prevState.childrenOpen}
            }
        })
    }
    displayMembers = (members) => {
        let display = [];
        let index = -1;
        function reSort(members, prevArr) {   //重新排列
            index++;
            let array = [];
            for(let item of members){
                array.push(
                    <li style={{color: this.color[index]}}
                    key={item.username} 
                    className={`clearfix wallet-transactions__item ${item.children.length ? 'members-father' : ''} ${this.state.childrenOpen[item.username] ? 'children-open' : ''} `} 
                    onClick={this.openChildren.bind(null, item)}>
                        <div className="wallet-transaction__details members-prop members-username">{item.username}</div>
                        <div className="wallet-transaction__details members-prop members-dateTime">{moment(item.timestamps.createdAt).utcOffset(this.props.timezone).format('YYYY-MM-DD hh:mm:ss')}</div>
                        <div className="wallet-transaction__details members-prop members-locked">{item.locked ? this.props.t('members.locked') : this.props.t('members.unlocked')}</div>
                    </li>
                );
                item.children.length && reSort.call(this, item.children, array);
            }
            if(index === 0){
                prevArr.push(<div key="uiroot">{array}</div>) 
            }else{
                let prevName = this.state.childrenOpen[prevArr[prevArr.length - 1].key];
                prevArr.push(<div key={`${prevArr[prevArr.length - 1].key}-children`} className={`details__wrapper ${prevName === undefined ? '' : prevName ? 'zp-show' : ''}`}>{array}</div>);  //可以做动画
            }
            index--;
        }
        reSort.call(this, members, display);
        return display;
    }
    render(){
        const {members, t} = this.props;
        return (
            <React.Fragment>
                {this.displayMembers(members)}
            </React.Fragment>
        )
    }
}

MembersList.propTypes = {
    members: PropTypes.array.isRequired,
    timezone: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        members: state.members,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMembers: (params) => dispatch(MembersActions.membersRequest(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Members));