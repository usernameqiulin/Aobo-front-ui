import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import {getName} from "../../helper"
import i18n from '../../i18n'
import CreditCard from "./CreditCard"
import Online from './Online'
import PaymentIcon from "../PaymentIcon"

class Payment extends React.Component {

    onClick = e => {
        !this.props.isDisabled && !this.props.isSelected && this.props.onChange(this.props.Method.code)
    }

    genDetail = () => {
        const method = this.props.Method, code = method.code
        if (code.startsWith('CNY') && code.endsWith('CC')) {
            return <Online extraSetting={method.psps[0].extra_setting} onChange={this.props.onExtraChange} currentExtra={this.props.currentExtra}/>
        }
        if (!code.startsWith('CNY') && code.endsWith('CC')) {
            return <CreditCard extraSetting={method.psps[0].extra_setting} onChange={this.props.onExtraChange} currentExtra={this.props.currentExtra}/>
        }
        const {t} = this.props
        return !!method.description ? (
            <div className="payment-desc">
                {!!method.description.header && <div className="payment-desc__head">
                    {t(method.description.header)}
                </div>}
                {!!method.description.details && <div className="payment-desc__details">
                    {t(method.description.details)}
                </div>}
            </div>
        ) : null
    }

    render() {
        const {t, Method, isSelected, isDisabled} = this.props
        return (
            <React.Fragment>
                <label className={`set__option label form__row form__row--interactive accordion__label${isSelected ? ' is-active is-selected' : ''}${isDisabled ? ' is-disabled' : ''}`}>
                    <input
                        type="radio"
                        name="payment_name"
                        value={Method.code}
                        className="hidden-input"
                        onChange={this.onClick}
                    />
                    <i className="label__icon--radio label__icon"/>
                    <span className="label__img">
                        <PaymentIcon method={Method.code}/>
                    </span>
                    <span className="label__extra-text">{getName(Method.name, i18n.language)}</span>
                </label>
                <div className={`accordion__body${!!Method.message ? ' accordion__body--info' : ''}${this.props.isSelected ? ' is-active' : ''}`}>
                    {/* ng-show="formAdditionalData.giftingRestrictions.ccard && order.data.isGift" */}
                        {/* ng-bind-html="formAdditionalData.paymentMessages.ccard" */}
                    <div className={`accordion__message payment-method-message ng-hide`}>{Method.message}</div>
                    {this.genDetail()}
               </div>
            </React.Fragment>
        )
    }
}

Payment.propTypes = {
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onChange: PropTypes.func,
    Method: PropTypes.object,
    t: PropTypes.func.isRequired,
    currentExtra: PropTypes.object,
}

export default translate()(Payment)