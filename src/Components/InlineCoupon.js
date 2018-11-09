import React from 'react'

const InlineCoupon = ({coupon}) => {
    return (
        <span className={`coupon-wrapper`}>
            <svg className={`icon-svg`}>
                <use xlinkHref={`#icon-coupon`}/>
            </svg>
            <span>{coupon}</span>
        </span>
    )
}

export default InlineCoupon
