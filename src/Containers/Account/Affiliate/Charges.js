import React  from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import GoogleAnalytics from 'react-ga'
import ReactHighcharts from 'react-highcharts';
import i18n from "../../../i18n"
import moment from "moment/moment"
import R from "ramda";


import './Affiliate.css'
import AccountFather from "./AccountFather"
import MyCharts from "./MyCharts"
import ABSpinner from "../../../Components/ABSpinner"
import ChargesActions from "../../../Redux/ChargesRedux"
import ChargesDetailActions from '../../../Redux/ChargesDetailRedux';
import FilterSectionFactory from '../../../Components/Filter/FilterSectionFactory'

const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')

let config ={};
let tabList = [];
let LAN = ''
let mDay = [];
class Charges extends AccountFather{
    constructor(props){
        super(props);
        this.DEFAULT_PARAMS = {	         
            start_time: moment().subtract(30, 'days').format('YYYY-MM-DD'),	                      
            end_time: moment().format('YYYY-MM-DD'),
            day:""  
        }	         
        this.otherState = {	         
            mData:{},
            summary:{},	    
            isData:false,
            isClick:false
        }
        this.state = this.createState(this.otherState);
        this.shouldChange = false;
        // console.log("1111",this.props)
    }

    doQuery = (params) => {
        this.props.getCharges(params)
    }
    
    emitLegendItemClick=(event)=> {
        let chart =  event.target.chart;
        let container = chart.container;
        let legenedItemIndex = event.target.index;
        if(container.curr_index == "undefined") {
            for (let i = 0; i < chart.series.length; i++) {
                if (i != legenedItemIndex) {
                    chart.series[i].setVisible(false, false);
                }
            }
            container.curr_index = legenedItemIndex;
            return false;
        }
        else if ((container.curr_index ==0 || container.curr_index) && container.curr_index == legenedItemIndex) {
            for (let i = 0; i < chart.series.length; i++) {
                if (i != legenedItemIndex) {
                    let visible = !chart.series[i].visible;
                    chart.series[i].setVisible(visible, false);
                }
            }
            return false;
        } else {
            let curr_series = chart.series[legenedItemIndex];
            for (let i = 0; i < chart.series.length; i++) {
                if (i != legenedItemIndex) {
                    chart.series[i].setVisible(false, false);
                }
            }
            container.curr_index = legenedItemIndex;
            if(curr_series.visible) {
                return false;
            }else {
                return true;
            }
        }
    };
    
    setConfig = () => {
        const {charges,t,auth,chargesDetail,day} = this.props;  
        let key2 = `${[t(`charges.charge`),t(`charges.payout`),t(`charges.deposit`),t(`charges.withdraw`),
                       t(`charges.amount`),t(`charges.bet`)]}`;     
        if(charges.show){
            let mData = charges.data.data||'';
            let summary = charges.data.summary||'';
            let $this =this;

            var mDay = [];
            var mBrand = [];
            var mFinancial = [];
            var mBonus = [];
            for (var key in mData) {
                let day = mData[key].day;
                mDay.push(day);
                var brand =  mData[key].brand;
                mBrand.push(brand.charge);
                var financial = mData[key].financial;
                mFinancial.push(financial.charge);
                var bonus =  mData[key].bonus;
                mBonus.push(bonus.charge);
            }
            return {
                chart:{
                    backgroundColor:'rgba(0,0,0,0)',
                },
                title: {
                    text: '',
                },
                xAxis: {
                    title: {
                        text: `${t('charges.time')}`
                    },
                    categories: mDay
                },
                yAxis: {
                    title: {
                        text: `${t('charges.amount')}`
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    itemHiddenStyle: {
                        color: 'gray'
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormatter: function() {
                        let content = '';
                        for (let i = 0; i < mData.length; i++) {
                            if (i === this.x) {
                                let data1 = mData[i];
                                for (let key1 in data1) {
                                    if (`${t(`charges.${key1}`)}` === `${t(this.series.name)}`) {
                                        let data2 = data1[key1];
                                        // console.log("data2=====",data2)
                                        // console.log("key1=====",key1)
                                        for ( key2 in data2) {
                                            content += `<span>${t(`charges.${key2}`)}</span>:${data2[key2]}<br/>`;
                                        }
                                    }
                                }
                            }
                        };
                        return content;
                    },
                },
                plotOptions: {

                    series: {
                        cursor: 'pointer',                        
                        label: {
                            connectorAllowed: false
                        },
                        point: {
                            events: {
                                //数据点点击事件
                                click: function (e) {
                                    if( (e.point.series.name == `${t('charges.brand')}`) && (mData[this.x].brand.charge != 0) && (mData[this.x].brand.bet != 0)&& (mData[this.x].brand.payout != 0) ){
                                        let day = mDay[this.x];
                                        //$this.props.dispatch({type: 'getDetail', payload: { day}})
                                        $this.props.getChargesDetail({ day });
                                        $this.setState({
                                            day,
                                            isData:true,
                                            isClick:true
                                        })     
                                    }else{
                                        let day = mDay[this.x];
                                        $this.setState({
                                            day,
                                            isData:false,
                                            isClick:true
                                         })   
                                    }
                                }}
                        },
                    }
                },
                series: [{
                    name: `${t('charges.brand')}`,
                    data: mBrand,
                    color:'#BFA184',
                    events: {
                        legendItemClick:(event) =>{
                            return this.emitLegendItemClick(event);
                        },
                    }
                }, {
                    name:`${t('charges.financial')}`,
                    data: mFinancial,
                    color:'#054373',
                    events: {
                        legendItemClick:(event) =>{
                            return this.emitLegendItemClick(event);
                        }
                    }
                }, {
                    name: `${t('charges.bonus')}`,
                    data: mBonus,
                    color:'#443731',
                    events: {
                        legendItemClick:(event) =>{
                            return this.emitLegendItemClick(event);
                        }
                    }
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            };
        }
        return {}
    }
    
    traversal = (data, nextData) => {
        if(data.length !== nextData.length){
            return true;
        }else{
            for(let item in data){
                if(data[item].bonus.amount !== nextData[item].bonus.amount || data[item].bonus.charge !== nextData[item].bonus.charge ||
                    data[item].brand.bet !== nextData[item].brand.bet || data[item].brand.charge !== nextData[item].brand.charge ||
                    data[item].brand.payout !== nextData[item].brand.payout || data[item].day !== nextData[item].day ||
                    data[item].financial.charge !== nextData[item].financial.charge || data[item].financial.deposit !== nextData[item].financial.deposit ||
                    data[item].financial.withdraw !== nextData[item].financial.withdraw){
                    return true;
                }
            }
            return false;
        }
    }
    

   
    render(){
        const {charges, t,chargesDetail} = this.props;        
        const config = this.setConfig()
        return (
            <div className={`container account cf`}>       
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        timeRange={{
                            slug: 'time',
                            withTime: false,
                            available: [MIN, MAX],
                        }}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this.filterChange}
                        isLoading={charges.fetching}
                    />
                </section>
                <div className={`module-header wallet__module-header cf`}>
                    <h1 className={`header__title`}>
                    {t('charges.name')}
                    </h1>
                </div>
                <div className={`container list__message${!charges.error ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <ABSpinner hidden={charges.show || !charges.fetching} size={'big'} /> 
                { 
                    (charges.show) &&
                    <div>
                        <MyCharts oData={charges.data.data} t={t} traversal={this.traversal} setConfig={this.setConfig}/>
                        <div className={`charge`}>
                        {
                            charges.data.data.length ?
                            <div >
                                <div>{t('charges.brandsum')}: <span className="_price">{charges.data.summary.brand.charge.toFixed(2)}</span></div>
                                <div>{t('charges.finsum')}: <span className="_price">{charges.data.summary.financial.charge.toFixed(2)}</span></div>
                                <div>{t('charges.bonussum')}: <span className="_price">{charges.data.summary.bonus.charge.toFixed(2)}</span></div>
                            </div>
                            :
                            <div>
                            </div> 
                        }
                        </div>
                    
                                          
                    <ABSpinner hidden={!chargesDetail.fetching } size={'big'} />
                    {
                        !this.state.isClick && (
                        <div key={-3} className={`container list__message`}>
                            <span className="list__message-in">{t('charges.noData')}</span>
                        </div>
                        )
                    }  
                    {
                        this.state.isClick && !this.state.isData &&(
                        <div key={-2} className={`container list__message`}>
                            <span className="list__message-in">{this.state.day+t('No results found')}</span>
                        </div>
                        )
                   }
                    { this.state.isData && !chargesDetail.fetching && chargesDetail.data && chargesDetail.data.data && chargesDetail.data.data.length !== 0 &&
                    <div> 
                        <div>{this.state.day}</div> 
                        <div className={`wallet-transactions`}> 
                            <div className={`wallet-transactions__head`}>
                                <div className="wallet-transactions__header charges__header--items">{t('charges.brand')}</div>
                                <div className="wallet-transactions__header charges__header--items">{t('charges.bet')}</div>
                                <div className="wallet-transactions__header charges__header--items">{t('charges.payout')}</div>
                                <div className="wallet-transactions__header charges__header--items">{t('charges.charge')}</div>
                            </div>  
                        </div> 
                        {
                            chargesDetail.data.data.map((it,i) => (  
                                <div key={i}>
                                    <div className="wallet-transactions__item">
                                        <div className="wallet-transaction__details  wallet-transaction__details charges__header--items">{it.brand}</div>
                                        <div className="wallet-transaction__details  wallet-transaction__details charges__header--items"><span className="_price">{it.bet.toFixed(2)}</span></div>
                                        <div className="wallet-transaction__details  wallet-transaction__details charges__header--items"><span className="_price">{it.payout.toFixed(2)}</span></div>
                                        <div className="wallet-transaction__details  wallet-transaction__details charges__header--items"><span className="_price">{it.charge.toFixed(2)}</span></div>
                                    </div> 
                                </div>
                            ))
                        }                    
                    </div>
                    }        
                    </div>
                }        
            </div>
        )
    }              
}
    
Charges.propTypes = {
    auth: PropTypes.object.isRequired,
    charges: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCharges: PropTypes.func.isRequired,
    getChargesDetail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        charges: state.charges,
        config: state.config,
        profile: state.profile,
        chargesDetail: state.chargesDetail
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    getCharges: (params) => dispatch(ChargesActions.chargesRequest(params)),
    getChargesDetail: (params) => dispatch(ChargesDetailActions.chargesDetailRequest(params)),
    fetching: ()=>dispatch(ChargesActions.chargesFetching())
})

export default connect(mapStateToProps,mapDispatchToProps)(translate()(Charges))
