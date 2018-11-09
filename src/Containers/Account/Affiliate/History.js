import React,{Component}  from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import GoogleAnalytics from 'react-ga'
import ReactHighcharts from 'react-highcharts';

import './Affiliate.css'
import MyCharts from "./MyCharts"
import i18n from "../../../i18n"
import ABSpinner from "../../../Components/ABSpinner"
import HistoryActions from "../../../Redux/HistoryRedux"



 let config = {}
 class History extends React.Component{
    constructor(props){
        super(props);
        this.shouldChange = false;
    }
    doQuery = () => {
        this.props.getHistory()
    }
    componentDidMount(){
        this.doQuery()    
    }
    componentWillUpdate(){
        console.log('componentWillUpdate')
    }
    emitLegendItemClick=(event)=> {
        // console.log("111",event);
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
        const {history,t} = this.props;
        let mData = history.data.data;
        let mVisitors = [];
        let mRegisters = [];
        let mDeposits = [];
        let mDeposit = [];
        let mWithdraw =[];
        let mBonus= [];
        let mOpeningBalance = [];
        let mClosingBalance = [];
        let mCharge = [];
        let mMonth = [];
        let mCommission = [];
        for (let key in mData) {
            let visitors = mData[key].visitors;
            mVisitors.push(visitors);
            let registers = mData[key].registers;
            mRegisters.push(registers);
            let deposits = mData[key].deposits;
            mDeposits.push(deposits);
            let deposit = mData[key].deposit;
            mDeposit.push(deposit);
            let withdraw = mData[key].withdraw;
            mWithdraw.push(withdraw);
            let bonus = mData[key].bonus;
            mBonus.push(bonus);
            let openingBalance = mData[key].openingBalance;
            mOpeningBalance.push(openingBalance);
            let closingBalance = mData[key].closingBalance;
            mClosingBalance.push(closingBalance);
            let charge = mData[key].charge;
            mCharge.push(charge);
            let month = mData[key].month;
            mMonth.push(month);
            let commission = mData[key].commission;
            mCommission.push(commission);

        }

        return {
            chart:{
                backgroundColor:'rgba(0,0,0,0)'
            },
            title: {
                text: '',
            },
            xAxis: {
                title: {
                    text: `${t('charges.time')}`
                },
                categories: mMonth
            },
            yAxis: {
                title: {
                    text:  `${t('charges.amount')}`
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

            plotOptions: {

                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
            series: [{
                name: `${t('history.visitors')}`,
                data: mVisitors,
                color:'#443731',
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name: `${t('history.registers')}`,
                data: mRegisters,
                color:'#BFA184',
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name: `${t('history.deposits')}`,
                data: mDeposits,
                color:'#054373',
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            },{
                name: `${t('history.deposit')}`,
                data: mDeposit,
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name:  `${t('history.withdraw')}`,
                data: mWithdraw,
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name: `${t('history.bonus')}`,
                data: mBonus,
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            },{
                name: `${t('history.openingBalance')}`,
                data: mOpeningBalance,
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name: `${t('history.closingBalance')}`,
                data: mClosingBalance,
                color:'#732121',
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            }, {
                name: `${t('history.charge')}`,
                data: mCharge,
                events: {
                    legendItemClick:(event) =>{
                        return this.emitLegendItemClick(event);
                    }
                }
            },{
                name:`${t('history.commission')}`,
                data: mCommission,
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
    traversal(data, nextData){
        if(data.length !== nextData.length){
            return true;
        }else{
            for(let item in data){
                if(data[item].bonus !== nextData[item].bonus|| data[item].charge !== nextData[item].charge ||
                    data[item].closingBalance !== nextData[item].closingBalance || data[item].commission !== nextData[item].commission ||
                    data[item].deposit !== nextData[item].deposit || data[item].deposits !== nextData[item].deposits ||
                    data[item].month !== nextData[item].month || data[item].openingBalance !== nextData[item].openingBalance ||
                    data[item].registers !== nextData[item].registers|| data[item].visitors !== nextData[item].visitors||
                    data[item].withdraw !== nextData[item].withdraw){
                    return true;
                }
            }
            return false;
        }
    }
    render(){
        const {history,t} = this.props;
        return (
            <div className={`container`}>
                <div className={`module-header wallet__module-header cf`}>
                    <h1 className={`header__title`}>
                    {t('history.name')}
                    </h1>
                </div>
                <div className={`container list__message${history.error ? '' : ' ng-hide' }`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <ABSpinner hidden={history.show || !history.fetching} size={'big'} /> 
                {
                    history.show && <MyCharts oData={history.data.data} t={t} traversal={this.traversal} setConfig={this.setConfig}/>
                }                        
            </div>
      )
    }
  }

  
History.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getHistory: PropTypes.func.isRequired,
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        history: state.history,
        config: state.config,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHistory: () => dispatch(HistoryActions.historyRequest()),
})


export default connect(mapStateToProps,mapDispatchToProps)(translate()(History))
