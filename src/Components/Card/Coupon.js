import React from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from "react-ga"
import {Link} from 'react-router-dom'

import {toUnixTimestamp, selectText, amountFormat} from "../../helper"
import ABCountdown from "../ABCountdown"
import withDropdown from "../withDropdown"

import './Coupon.css'

class Coupon extends React.PureComponent {

    state = {
        isFlipped: !1,
    }

    onClick = () => {
        GoogleAnalytics.event({
            action: 'Flip ' + (!this.state.isFlipped ? 'back' : 'front'),
            category: 'Coupon',
            label: this.props.coupon.name
        })
        this.setState({
            isFlipped: !this.state.isFlipped,
        })
    }

    onApply = (e) => {
        GoogleAnalytics.event({
            action: 'Redeem',
            category: 'Coupon',
            label: this.props.coupon.name
        })
        e.stopPropagation()
        console.log('Redeem clicked')
    }

    onCodeClick = (e) => {
        // selectText(e.target)
        e.stopPropagation()
    }

    render() {
        const {t, coupon, eachRow, buttonLabel,style} = this.props;
        console.log("@@@@@@@@@@@@@@!!!!!!!!!!!********************--------------",style);    
        return (
            <div className={`coupon__container coupon__container--3d coupon__container--${eachRow}`} style={style}>
                <div className={`coupon coupon__highlight is-appliable${this.state.isFlipped ? ' is-flipped' : ''}`} onClick={this.onClick}>
                    {/* Back side */}
                    <div className="coupon__flip-container coupon__flip-container--back">
                        <div className={`coupon__component-position coupon__component-position--center-center coupon__component-position--no-pointer-event coupon__component-position--z-bg`}>
                            <div className={`coupon__align-h-center coupon__align-v-center`}>
                                {coupon.needCertification && <p className={`coupon-info-point`}>
                                    <i className="dot"/>
                                    <b>{t('You must complete account certification')}</b>
                                </p>}
                                {coupon.conditions.map((c, i) => {
                                    return (
                                        <p className={`coupon-info-point`} key={i}>
                                            <i className="dot"/>
                                            {t('coupon_' + c.type)}:{' '}
                                            <b className={`${c.value.type === 'amount' ? '_price' : ''}`}>
                                                {c.value.type === 'amount' ? amountFormat(c.value.value) : null}
                                                {c.value.type === 'times' ? '(' + t('principal+bonus') + ') x ' + c.value.value : null}
                                            </b>
                                        </p>
                                    )
                                })}
                                {coupon.treatments[0].max && <p className={`coupon-info-point`}>
                                    <i className="dot"/>
                                    {t('coupon_bonus_up_to')}:{' '}
                                    <b className={`_price`}>
                                        {amountFormat(coupon.treatments[0].max)}
                                    </b>
                                </p>}
                            </div>
                        </div>
                    </div>
                    {/* Front side */}
                    <div className={`coupon__flip-container coupon__flip-container--front`}>
                        <div className={`coupon__component-position coupon__component-position--left-top coupon__component-position--no-pointer-event coupon__component-position--z-bg`}>
                            {coupon.product && <svg className={`icon-svg`}><use xlinkHref={`#icon-${coupon.product.toLowerCase()}`}/></svg>}
                            {coupon.brand && <svg className={`icon-svg`}><use xlinkHref={`#icon-${coupon.brand.toLowerCase()}`}/></svg>}
                            <h3 className="coupon__title">{coupon.name}</h3>
                        </div>
                        {!!coupon.treatments && <div className={`coupon__component-position coupon__component-position--center-center coupon__component-position--no-pointer-event coupon__component-position--z-bg`}>
                            {coupon.treatments[0].type === 'amount' && <h2 className={`coupon__treatment _price pinata__counter-number`}>{amountFormat(coupon.treatments[0].value)}</h2>}
                            {coupon.treatments[0].type === 'times' && <h2 className={`coupon__treatment _percentage pinata__counter-number`}>{coupon.treatments[0].value}</h2>}
                        </div>}
                        <div className={`coupon__component-position coupon__component-position--left-bottom coupon__component-position--no-pointer-event`}>
                            <div className={`coupon-timer`}>
                                {!!coupon.period.to && <ABCountdown id={coupon.code} countdownTimestamp={toUnixTimestamp(coupon.period.to)}/>}
                            </div>
                        </div>
                        <div className={`coupon-apply-holder coupon__component-position coupon__component-position--right-bottom coupon__component-position--z-fg`}>
                            <div className="coupon-apply">
                                <div className="coupon-apply__code" onClick={this.onCodeClick}>{coupon.code}</div>
                                {/* ng-click="giveaway.claim()" ng-hide="giveaway.isExpired || giveaway.isClaimed" gog-analytics-event="[ 'Promo Element', 'Redeem', 'giveaway - Oxenfree' ]" */}
                                {
                                    coupon.type === 'all' ?

                                    <div className={`coupon-apply__btn${this.props.expanded ? ' is-expanded' : ' is-contracted'}`} style={{position: 'relative'}}
                                        onClick={this.props.toggler}
                                        onMouseLeave={this.props.hider}
                                    >
                                        {buttonLabel}
                                        <span className="_dropdown__pointer-wrapper rebate__pointer-wrapper">
                                            <i className="ic icon-dropdown-down rebate__icon-down"/>
                                            <i className="_dropdown__pointer-up rebate__pointer-up"/>
                                        </span>
                                        <span className="_dropdown__items rebate__dropdown-items" >
                                            <Link to={{pathname: '/account/deposit', hash: '#deposit', state: {couponCode: coupon}}} className="_dropdown__item" style={{padding: '0 17px 0 17px', lineHeight: '35px'}}>
                                                {t('deposit')}
                                            </Link>
                                            <Link to={{pathname: '/account/transfer', hash: '#transfer', state: {couponCode: coupon}}} className="_dropdown__item" style={{padding: '0 17px 0 17px', lineHeight: '35px'}}>
                                                {t('transfer')}
                                            </Link>
                                        </span>
                                    </div>

                                    
                                    :
                                    <Link to={{
                                        pathname: coupon.type === 'deposit' ? '/account/deposit' : '/account/transfer',
                                        hash: coupon.type === 'deposit' ? '#deposit' : '',
                                        state: {couponCode: coupon}
                                    }} className={`coupon-apply__btn`} onClick={this.onApply}>
                                        <div>{buttonLabel}</div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Coupon.propTypes = {
    coupon: PropTypes.object.isRequired,
    buttonLabel: PropTypes.string,
    eachRow: PropTypes.oneOf(['solo', 'duet', 'triplet', 'quartet']).isRequired,
}

export default withDropdown(Coupon)