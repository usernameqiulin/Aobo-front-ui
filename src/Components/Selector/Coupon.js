import React from 'react'
import PropTypes from 'prop-types'

import './Coupon.css'
import CouponDropdown from "../Form/CouponDropdown"
import {amountFormat, toUnixTimestamp} from "../../helper"
import ABCountdown from "../ABCountdown"

class Coupon extends React.Component {

    onSelect = (e) => {
        !this.props.isDisabled && this.props.onSelect(this.props.coupon.code)
    }

    render() {
        const {coupon, isSelected, isDisabled} = this.props
        return (
            <div className={`cf module coupon-rectangle${isDisabled ? ' is-disabled' : ' _clickable'}${!coupon.period.to ? ' coupon-rectangle--no-details' : ''}${isSelected ? ' is-selected' : ''}`} onClick={this.onSelect}>
                <svg className={`icon-svg coupon-rectangle__icon`}>
                    <use xlinkHref={`#icon-coupon`}/>
                </svg>
                <div className={`coupon-rectangle__right`}>
                    <CouponDropdown
                        coupon={coupon}
                    />
                </div>
                <p className="coupon-name coupon-rectangle__name">
                    {!!coupon.product && <svg className={`icon-svg`}><use xlinkHref={`#icon-${coupon.product.toLowerCase()}`}/></svg>}
                    {!!coupon.brand && <svg className={`icon-svg`}><use xlinkHref={`#icon-${coupon.brand.toLowerCase()}`}/></svg>}
                    {coupon.treatments[0].value.type === 'amount' && <span className={`_price`}>{amountFormat(coupon.treatments[0].value.value)}</span>}
                    {coupon.treatments[0].value.type === 'times' && <span className={`_percentage`}>{coupon.treatments[0].value.value}</span>}
                    {' '}
                    {coupon.name}
                </p>
                <p className="coupon-rectangle__desc">
                    {!!coupon.period.to && <ABCountdown id={coupon.code} countdownTimestamp={toUnixTimestamp(coupon.period.to)}/>}
                </p>
            </div>
        )
    }
}

Coupon.propTypes = {
    coupon: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
}

export default Coupon