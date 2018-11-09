import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import SportsActions from "../../Redux/SportsRedux"

import './index.css'

class SportsPage extends Component {
    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('sportsPage')
        })
    }
    componentWillUnmount(){
        window.NBBet.destory();
    }
    componentDidMount(){
        if (this.sportsIframe.attachEvent){
            this.sportsIframe.attachEvent("onload", () => {
                this.onComplete();
            });
        } else {
            this.sportsIframe.onload = () => {
                this.onComplete();
            };
        }
    }
    onComplete = () => {
        // console.log(this.sportsIframe.contentWindow.document.querySelector('.nb_flexGrow'));
        // console.log(this.sportsIframe.contentWindow.document.getElementsByClassName('nb_flexGrow').length);
        window.NBBet.init({
            selector : "#nb_content",
            unLoginCallback: (successCallback) => {
                //未登录时会触发此函数，
                //在此函数中异步登录验证成功后执行下面代码
                this.props.sportsLogin(successCallback)
            },
            betSuccessCallback : function(){ alert("投注成功");
            },
            complete :() => {
                // console.log('完成')
                // console.log(this.sportsIframe.contentWindow.document.getElementById('index_europe').scrollHeight);

                // this.sportsIframe.height = this.sportsIframe.contentWindow.document.getElementByClassName('nb_flexGrow')[0].;
            //可在此处处理 footer 内容填充 $("#nb_footer").html($("#ag_footer").html());
            }, betFailCallback:function(error_code,callback){
            //去掉平台提示 callback(1);
            } 
        });
    }
    sportsIframe = ele => {
        if(ele){
            this.sportsIframe = ele;
        } 
    }
    render() {
        const {t} = this.props
        return (
            <div className='cf'>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('sportsPage')}</title>
                    <meta name="description" content={t('sportsPageMetaDescription')}/>
                </Helmet>
                <ScrollToTopOnMount/>
                <div className="nav-spacer menu-spacer"/>
                <div className="container cf" style={{width: '100%'}}>
                    <iframe className="sports_iframe" ref={this.sportsIframe} src="/sports.html" width="100%" scrolling="no" frameBorder="0">
                        
                    </iframe>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    sportsLogin: (successCallback) => dispatch(SportsActions.sportsLogin(successCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(SportsPage))