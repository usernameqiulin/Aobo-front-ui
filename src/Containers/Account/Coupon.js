import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'

import CouponActions from '../../Redux/CouponRedux'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import CouponCard from '../../Components/Card/Coupon'

class Coupon extends React.Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('coupon')
        })
    }

    componentDidMount() {
        this.props.getCoupon({})
    }
    
    render() {
        
        let index = this.props.coupon.data.length;
        
        const {t, coupon} = this.props
        return (
            <div>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('coupon')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <div className={`container account cf`}>
                    <div className="module-header wallet__module-header cf">
                        <h1 className={`header__title`}>{t('coupon')}</h1>
                    </div>
                    <ABSpinner hidden={!(!coupon.data && coupon.fetching)} size={'big'}/>
                    <div className={`coupon-list`}>
                        <div className={`wallet__spinner-container${!!coupon.data && coupon.fetching ? '' : ' ng-hide'}`}>
                            <i className="wallet__spinner is-spinning"/>
                        </div>
                        {
                            this.props.coupon.data && this.props.coupon.data.map((c) => {
                                return <CouponCard style = {{zIndex:index--}}eachRow={'triplet'} coupon={c} key={c.code} buttonLabel={t('redeem')} t={t}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

Coupon.propTypes = {
    auth: PropTypes.object.isRequired,
    coupon: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        coupon: state.coupon,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCoupon: (params) => dispatch(CouponActions.couponRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Coupon))