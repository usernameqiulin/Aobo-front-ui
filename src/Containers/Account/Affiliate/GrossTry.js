import React,{Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import moment from "moment/moment";
import {Helmet} from "react-helmet";
import { Scrollbars } from 'react-custom-scrollbars';

import GrossActions from '../../../Redux/GrossRedux';
import GrossDetailActions from '../../../Redux/GrossDetailRedux';
import FilterSectionFactory from '../../../Components/Filter/FilterSectionFactory';
import ScrollToTopOnMount from "../../../Components/ScrollToTopOnMount";
import ABSpinner from "../../../Components/ABSpinner";
import Paginate from "../../../Components/Paginate";
import AccountFather from './AccountFather';
import i18n from '../../../i18n';

import './Gross.css';

const MAX = moment().subtract(1, 'days'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')

class Gross extends AccountFather{
    constructor(props){
        super(props);
        this.searchSlug = 'username';
        this.DEFAULT_PARAMS = {
            start_time: moment().subtract(90, 'days').format('YYYY-MM-DD'),
            end_time: MAX.format('YYYY-MM-DD'),
            page: 1,
        };
        this.state = this.createState({});
    }
    pageDidChange(){
        this.props.clearGrossDetail();
    }
    doQuery(params){
        this.props.getGross(params);
    }
    getGrossDetail = (userId) => {
        this.props.getGrossDetail({userId, start_time: this.state.params.start_time, end_time: this.state.params.end_time});
    }
    render(){
        const {t, gross, grossDetail} = this.props;
        return (
            <div className="container account cf gross-component">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('gross.title')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        params = {
                            this.state.params
                        }
                        timeRange = {
                            {
                                slug: 'time',
                                withTime: false,
                                available: [MIN, MAX],
                            }
                        }
                        isLoading={gross.fetching}
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
                    <h1 className={`header__title`}>
                        {t('gross.title')}
                    </h1>
                </div>
                <ABSpinner hidden={!(gross.fetching && !gross.show)} size={'big'}/>
                {
                    gross.error &&
                    <div className="container list__message">
                        <span className="list__message-in">{t(gross.error)}</span>
                    </div>
                }
                { 
                    gross.show &&
                    <GrossList grossData={gross.data.data} grossDetail={grossDetail} getGrossDetail={this.getGrossDetail} t={t}></GrossList>
                }
                {
                    gross.show &&
                    <Paginate
                        totalPages={gross.data ? gross.data.meta.last_page : 1}
                        change={this.onPageChange}
                        currentPage={parseInt(this.state.params.page)}
                        extraClasses="list__pagination no-hl"
                    />
                }
            </div>
        )
    }
}

class GrossList extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailsOpen: {}
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
            detailsOpen: {...prevState.detailsOpen}
        }))
    }
    getDetail = (userId, index) => {
        this.setState(prevState=>{
            prevState.detailsOpen[index] = !prevState.detailsOpen[index];
            return {
                detailsOpen: {...prevState.detailsOpen}
            }
        },()=>{
            if(this.state.detailsOpen[index]){  //如果是打开details 那就要发起请求
                this.props.getGrossDetail(userId);
            }
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.grossData !== this.props.grossData || nextProps.grossDetail !== this.props.grossDetail || nextState.detailsOpen !== this.state.detailsOpen){
            return true;
        }else{
            return false;
        }
    }
    render(){
        const {grossData, grossDetail, getGrossDetail, t} = this.props;
        return (
            <ul className="gross-list wallet-transactions">
                <Scrollbars style={{width: "100%"}} autoHeight autoHeightMax={1000}>
                    <div style={{minWidth: '882px'}}>
                        <li className="clearfix wallet-transactions__head" style={{display: 'block'}}>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('username')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('deposit')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('withdraw')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('gross.balancesOpening')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('gross.balancesClosing')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('gross.charges')}</div>
                            <div className="wallet-transactions__header gross-prop gross-1">{t('gross.profit')}</div>
                        </li>
                        {
                            grossData.map((item,index)=>{
                                const userId = item.user.id;
                                return (
                                    <div key={index}>
                                        <li className={`${this.state.detailsOpen[index] ? 'is-expanded' : ''} clearfix wallet-transactions__item gross-details-open`} onClick={this.getDetail.bind(null, userId, index)}>
                                            <div className="cf">
                                                <div className="wallet-transaction__details gross-prop gross-1" style={{color: 'red'}}>{item.user.username}
                                                <img srcSet={require('../../../images/d-arrow_x1.png') + ", " + require('../../../images/d-arrow_x2.png') + " 2x"} className="wallet-load-more__icon"/>
                                                <span className={`_spinner ${(this.state.detailsOpen[index] && (!grossDetail[userId] || grossDetail[userId].fetching)) ? 'is-spinning' : ''}`}></span>
                                                </div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{item.deposit.amount.toFixed(2)}</span></div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{item.withdraw.toFixed(2)}</span></div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{item.balances.opening.toFixed(2)}</span></div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{item.balances.closing.toFixed(2)}</span></div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{(item.charges.brand + item.charges.financial + item.charges.bonus).toFixed(2)}</span></div>
                                                <div className="wallet-transaction__details gross-prop gross-1"><span className="_price">{item.profit.toFixed(2)}</span></div>
                                            </div>
                                            <div className="details__wrapper">        
                                                <div className="details__content">
                                                {
                                                    grossDetail[userId] && grossDetail[userId].error &&
                                                    <div className="list__message">
                                                        <span className="list__message-in">{t(grossDetail[userId].error)}</span>
                                                    </div>
                                                }
                                                {
                                                    grossDetail[userId] && grossDetail[userId].show &&
                                                    <ul className="gross-list wallet-transactions">
                                                        <li className="clearfix wallet-transactions__head" style={{display: 'block'}}>
                                                            <div className="wallet-transactions__header gross-prop gross-2">{t('brand')}</div>
                                                            <div className="wallet-transactions__header gross-prop gross-2">{t('bet')}</div>
                                                            <div className="wallet-transactions__header gross-prop gross-2">{t('payout')}</div>
                                                            <div className="wallet-transactions__header gross-prop gross-2">{t('gross.charges')}</div>
                                                        </li>
                                                        {
                                                            grossDetail[userId].data.data.map((item,index)=>{
                                                                return <li key={index} className="clearfix details-item">
                                                                    <div className="wallet-transaction__details gross-prop gross-2"><svg className="icon-svg"><use xlinkHref={`#icon-${item.brand.toLowerCase()}`}></use></svg>{item.brand}</div>
                                                                    <div className="wallet-transaction__details gross-prop gross-2"><span className="_price">{item.bet.toFixed(2)}</span></div>
                                                                    <div className="wallet-transaction__details gross-prop gross-2"><span className="_price">{item.payout.toFixed(2)}</span></div>
                                                                    <div className="wallet-transaction__details gross-prop gross-2"><span className="_price">{item.charge.toFixed(2)}</span></div>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                }
                                                <ABSpinner hidden={!(!grossDetail[userId] || (grossDetail[userId].fetching && !grossDetail[userId].show))} size={'big'}/>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                </Scrollbars>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gross: state.gross,
        grossDetail: state.grossDetail
    }
}

const mapDispatchToProps = (dispatch) => ({
    getGross: params => dispatch(GrossActions.grossRequest(params)),
    getGrossDetail: params => dispatch(GrossDetailActions.grossDetailRequest(params)),
    clearGrossDetail: params => dispatch(GrossDetailActions.clearGrossDetail())
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Gross));