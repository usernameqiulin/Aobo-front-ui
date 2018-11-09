import React from 'react'
import withDropdown from "../withDropdown"
import {translate} from 'react-i18next'
import {amountFormat} from "../../helper"

const CouponDropdown = (props) => (
    <span
        className={`_dropdown coupon-rectangle__dropdown is-active${props.expanded ? ' is-expanded' : ' is-contracted'}`}
        onClick={props.toggler}
        onMouseLeave={props.hider}
    >
        <div className="_dropdown__toggle btn coupon-rectangle__btn">
            <i className="ic icon-dropdown-down coupon-rectangle__dropdown-icon"/>
            <i className="_dropdown__pointer-up coupon-rectangle__pointer"/>
        </div>
        <span className="_dropdown__items coupon-rectangle__items">
            {/* ng-class="{ 'is-spinning-when-expanded': !user.is.present }" */}
            <span className={`_dropdown__item-unobtrusive _spinner coupon-dropdown__spinner-item`}/>
            {!!props.coupon.needCertification &&
            <span className={`_dropdown__item coupon-dropdown__action coupon-dropdown__after-spinner`}>
                <i className="dot"/>
                <b>{props.t('You must complete account certification')}</b>
            </span>}
            {props.coupon.conditions.map((c, i) => {
                return (
                    <span key={i} className={`_dropdown__item coupon-dropdown__action${!props.coupon.needCertification && i === 0 ? ' coupon-dropdown__after-spinner' : ''}`}>
                        <i className="dot"/>
                        {props.t('coupon_' + c.type)}:{' '}
                        <b className={`${c.value.type === 'amount' ? '_price' : ''}`}>
                            {c.value.type === 'amount' ? amountFormat(c.value.value) : null}
                            {c.value.type === 'times' ? '(' + props.t('principal+bonus') + ') x ' + c.value.value : null}
                        </b>
                    </span>
                )
            })}
            {props.coupon.treatments[0].value.max && <span className={`_dropdown__item coupon-dropdown__action`}>
                <i className="dot"/>
                {props.t('coupon_bonus_up_to')}:{' '}
                <b className={`_price`}>
                    {amountFormat(props.coupon.treatments[0].value.max)}
                </b>
            </span>}
        </span>
    </span>
)

export default withDropdown(translate()(CouponDropdown))