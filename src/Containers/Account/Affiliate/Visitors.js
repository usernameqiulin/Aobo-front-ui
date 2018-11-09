import React,{Component}  from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import ReactHighcharts from 'react-highcharts';
import GoogleAnalytics from 'react-ga'
import i18n from "../../../i18n"
import moment from "moment/moment"
import R from "ramda";

import './Affiliate.css'
import MyCharts from "./MyCharts"
import AccountFather from "./AccountFather"
import ABSpinner from "../../../Components/ABSpinner"
import VisitorsActions from "../../../Redux/VisitorsRedux"
import {amountFormat} from "../../../helper";
import FilterSectionFactory from '../../../Components/Filter/FilterSectionFactory'


 const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')

 let config ={};
 class Visitors extends AccountFather{

    constructor(props) {
        super(props)
        this.DEFAULT_PARAMS = {	         
            start_time: moment().subtract(30, 'days').format('YYYY-MM-DD'),	                      
            end_time: moment().format('YYYY-MM-DD'),
        }	         
        this.otherState = {	         
            mData:{},          
        }
        this.state = this.createState(this.otherState);
        this.shouldChange = false;
        
    }
    doQuery = (params) => {
        this.props.getVisitors(this.state.params)
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
    // languageChanged = ()=>{
    //     // console.log('languageChanged');
    //    // this.updateChartsConfig();
    //     this.shouldChange = true;
    //     this.setState(prevState => ({
    //         mData: {...prevState.mData}
    //     }))
    // }
    // lanChange = () => {
    //     // console.log('ssss');
    //     // console.log(this.shouldChange)
    //     if(this.shouldChange){
    //         this.shouldChange = false;
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    setConfig = () => {   
        const {visitors,t} = this.props;
        if(visitors.show){
            let mData = visitors.data.data||'';
            let mDay = [];
            let mVisitors = [];
            let mRegisters = [];
            for (let key in mData) {
                let day = mData[key].day;
                mDay.push(day);
                let visitor = mData[key].visitors;
                mVisitors.push(visitor);
                let registers =mData[key].registers;
                mRegisters.push(registers);
            }

            return {
                chart: {
                    backgroundColor:'rgba(0,0,0,0)',
                    zoomType: 'x',
                },
                title: {
                    text: '',
                },
                xAxis: {
                    title: {
                        text: `${t('visitors.time')}`
                    },
                    categories: mDay
                },
                yAxis: {
                    title: {
                        text: `${t('visitors.amount')}`
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
                series: [{
                    name: `${t('visitors.name')}`,
                    data: mVisitors,
                    color:'#BFA184',
                    events: {
                        legendItemClick:(event) =>{
                            return this.emitLegendItemClick(event);
                        }
                    }
                }, {
                    name: `${t('visitors.rname')}`,
                    data: mRegisters,
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
    }
    traversal(data, nextData){
        if(data.length !== nextData.length){
            return true;
        }else{
            for(let item in data){
                if(data[item].day !== nextData[item].day || data[item].registers !== nextData[item].registers ||
                   data[item].visitors !== nextData[item].visitors){
                    return true;
                }
            }
            return false;
        }
    }
   
    render(){
        const {visitors,t} = this.props;
        return (
            <div className={`container`}>
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
                        isLoading={visitors.fetching}
                    />
                </section>
                <div className={`module-header wallet__module-header cf`}>
                    <h1 className={`header__title`}>
                       {t('visitors.name')}
                    </h1>
                </div>
                <div className={`container list__message${visitors.error ? '' : ' ng-hide' }`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <ABSpinner
                    hidden={visitors.show || !visitors.fetching} size={'big'} />
                {
                    (visitors.show) &&
                    <MyCharts oData={visitors.data.data} t={t} traversal={this.traversal} setConfig={this.setConfig}/>
                }           
            </div>
        )
    }
}
  
Visitors.propTypes = {
    auth: PropTypes.object.isRequired,
    visitors: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getVisitors: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        visitors: state.visitors,
        config: state.config,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVisitors: (params) => dispatch(VisitorsActions.visitorsRequest(params)),
    fetching: ()=>dispatch(VisitorsActions.visitorsFetching())
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Visitors))