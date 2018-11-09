/**
 * Created by darkmoon on 7/2/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'

import VipActions from '../../Redux/VipRedux'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import ABRank from "../../Components/ABRank"
import Slider from 'react-slick'
import ABVipContact from "../../Components/ABVipContact";

import './index.css'

const slickSettings = {
    // centerMode: true,
    infinite: false,
    centerPadding: 0,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 500,
    arrows: false,
    className: 'ranks-wrapper',
    variableWidth: true,
    accessibility: false,
    dots: false,
    lazyLoad: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
}

class VipPage extends Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('vipPage')
        })
    }

    componentDidMount() {
        !this.props.vip.data && this.props.getVip({})
    }

    render() {
        const {t, config, vip, profile} = this.props

        return (
            <div className="vip-wrapper">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('vipPage')}</title>
                    <meta name="description" content={t('vipPageMetaDescription')}/>
                    <body className={"vip-page"}/>
                </Helmet>
                <ScrollToTopOnMount/>
                <div className="nav-spacer menu-spacer"/>
                <div className="container">
                    <div className="vip-header cf">
                        <div className="vip__title-container">
                            <div className={`vip__title`}>
                                <h1 className={`vip__title-name`}>{t('vipPage')}</h1>
                            </div>
                            <div className="vip__subtitle">{t('vipPageMetaDescription')}</div>
                        </div>
                    </div>
                </div>
                <div className={`container cf`}>
                    <div className={`vip-about cf`}>
                        喜乐会，是由喜乐在线娱乐为尊贵的VIP会员倾力打造的专属会所。
                        在这里，您会体验到喜乐VIP部无微不至的顶级礼遇。喜乐会的宗旨是让每一个VIP会员感受到便捷、尊贵和暖心。
                        不要再犹豫，给喜乐会一个机会，我们将用实际行动回报。成为喜乐会成员之后，我们将会为您办理喜乐会专属VIP卡以及精美小礼物一份。
                        如果您已经是其他网站的VIP，不妨体验下喜乐会的另类服务!欢迎联系我们的VIP客服经理咨询。
                    </div>
                </div>
                <section className="container cf">
                    <ABSpinner hidden={!vip.fetching} color={'light'} size={'big'}/>
                    <div className={`list-inner${vip.fetching ? ' ng-hide' : ''}`}>
                        <div className={`label-wrapper`}>
                            <div className={`rank-header`}>
                                <div className={`rank-header__menu`}>
                                    <span className="rank-header__btn">
                                        <span className={`rank-header__text`}/>
                                    </span>
                                </div>
                            </div>
                            <div className={`rank-row`}>
                                <div className={`__label`}>{t('Upgrading')}</div>
                            </div>
                            <div className={`rank-row`}>
                                <div className={`__label padding-top`} style={{paddingBottom: 10}}>{t('Grading')}</div>
                            </div>
                            <div className={`rank-row`}>
                                <div className={`__label padding-top`}>{t('Benefits')}</div>
                            </div>
                        </div>
                        {!!config.data && !vip.fetching && !!vip.data &&
                        <Slider {...slickSettings}>
                            {vip.data.map((r, i) => !r.isDefault && <ABRank key={i} rank={r} t={t} currency={!!profile.data ? profile.data.currency : config.data.currency}/>)}
                        </Slider>}
                    </div>
                    <div className={`vip-term`}>
                        <div className={`rank-header`}>
                            <div className={`rank-header__menu`}>
                                <span className="rank-header__btn is-active">
                                    <span className={`rank-header__text`}>{t('vip term')}</span>
                                </span>
                            </div>
                        </div>
                        <div className={`vip-term__content`}>
                            <ul>
                                <li>{t('vip term 1')}</li>
                                <li>{t('vip term 2')}</li>
                                <li>{t('vip term 3')}</li>
                                <li>{t('vip term 4')}</li>
                                <li>{t('vip term 5')}</li>
                                <li>{t('vip term 6')}</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div className={`key`}>
                    <h1 className={`vip-contact__title`}>{t('Enter the Club now')}</h1>
                </div>
                <ABVipContact t={t}/>
            </div>
        )
    }
}
VipPage.propTypes = {
    vip: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getVip: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        vip: state.vip,
        profile: state.profile,
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVip: (params) => dispatch(VipActions.vipRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(VipPage))
