import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import PartHeader from './partHeader';
import AffiliateActions from '../../Redux/AffiliateRedux';

class PartFour extends PureComponent{   //第四部分计划详情
    componentDidMount(){
        // if(this.props.stagesData.data && this.props.stagesData.data.stat !== 'ok'){  //redux-persist未保存
            this.props.loadStages();   //加载数据
        // }
    }
    render(){
        const {stagesData, t} = this.props;
        return (
            <div id="partFour" className="partFour-component">
                <PartHeader title={t('plan.name', '计划详情')}></PartHeader>
                <table>
                    <thead>
                        <tr>
                            <td>{t('plan.content.header.0', '数目')}</td>
                            <td>{t('plan.content.header.1', '活跃用户')}</td>
                            <td>{t('plan.content.header.2', '比率')}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stagesData.data && stagesData.data.data &&
                            stagesData.data.data.stages.map(item=>{
                                return <tr key={item.level}>
                                    <td>{`${item.profit.min} - ${item.profit.max}`}</td>
                                    <td>{`≥${item.activeUsers}`}</td>
                                    <td>{`${item.rate * 100}%`}</td>
                                </tr>
                            })
                        }
                        {
                            !stagesData.data &&
                            [1,2,3,4].map(item=>{
                                return <tr key={item}>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                            }) 
                        }
                    </tbody>
                </table>
                <div className="partFour-footer">
                    <h2>*{t('plan.content.note.0', 'hello')}</h2>
                    <h2>*{t('plan.content.note.1', 'hello')}</h2>
                    <h2>*{t('plan.content.note.2', 'hello')}</h2>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        stagesData: state.affiliate
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadStages(){
            dispatch(AffiliateActions.stagesRequest());   //异步加载表格数据
        }
    }
}

const PartFourCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('affiliate')(PartFour));


export default PartFourCon;