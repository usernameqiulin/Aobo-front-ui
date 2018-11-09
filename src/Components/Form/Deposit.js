import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import R from "ramda"

import {amountFormat, isMobile} from "../../helper"
import DepositActions from "../../Redux/DepositRedux"
import CouponActions from "../../Redux/CouponRedux"

import Payment from "./Payment"
import WalletSelector from '../Selector/Wallet'
import CouponSelector from '../Selector/Coupon'

import './Deposit.css'
import Paginated from "../Selector/Paginated"
import i18n from "../../i18n"
import DepositAndTransfer from './DepositAndTransfer'

class Deposit extends DepositAndTransfer {

    constructor(props) {
        super(props, 'MAIN');
    }

    componentDidMount() {
        !this.props.coupon.fetching && !this.props.coupon.data && this.props.getCoupons();
    }

    isMethodAvailable = (m) => {
        if (m.disabled) {
            return false
        }
        return !!this.props.profile.data.financial.settings.deposit.find(pm => {
            return pm.method === m.code
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.profile.data && nextProps.profile.data) {
            const defaultMethod = this.getDefaultMethod(nextProps.profile.data)
            this.validRange = defaultMethod.range
            this.setState({
                form: {
                    ...this.state.form,
                    method: defaultMethod.method,
                }
            })
        }
    }

    isValid = () => {
        const amount = parseFloat(this.state.form.amount)
        return (
            !this.state.error.amount
            && !this.state.error.method
            && !this.state.error.coupon
            && !isNaN(amount)
            && amount !== 0
            && (this.state.form.method.endsWith('CC') ? !!this.state.form.extra : true)
        )
    }

    onSubmit = e => {
        if (!this.isValid()) return
        let deposit = R.merge(this.state.form, {})
        for (const k in deposit) {
            if (!deposit[k]) {
                delete deposit[k]
            }
        }
        this.props.addDeposit(deposit)
    }

    onMethodChange = method => {
        const m = this.props.profile.data.financial.settings.deposit.find(pm => {
            return pm.method === method
        })
        this.validRange = m.range

        this.setState({
            form: {
                ...this.state.form,
                method: method,
            }
        })
    }

    onExtraChange = o => this.setState({
        form: {
            ...this.state.form,
            extra: o,
        }
    })

    onClose = e => {
        this.props.onClose()
    }

    render() {
        const {t, deposit, profile, checkout, coupon, wallet} = this.props
        return (
            <div className={`deposit-wrapper`}>
                <i className={`ic icon-cancel modal__close`} onClick={this.onClose}/>
                <div className={`l-columns cf${deposit.submitting ? ' is-ui-blocked' : ''}${!deposit.submitting && deposit.checkingOut ? ' is-finished' : ''}`}>
                    <div className={`l-section l-section--primary`}>
                        <section className={`form--part`}>
                            <header className="module-header page-header"><h1 className="header__title">{t('wallet')}</h1></header>
                            <section className={`_spinner${wallet.fetching ? ' is-spinning' : ''}`}>
                                <WalletSelector
                                    wallet={this.props.wallet}
                                    selected={this.state.form.destination_wallet}
                                    language={i18n.language}
                                    onSelect={this.selectDestinationWallet(false)}
                                    showBrands={true}
                                />
                            </section>
                            <header className="module-header page-header">
                                <h1 className="header__title">
                                    <span>{t('coupon')}</span>
                                    {!!profile.data && !(profile.data.verifications.name && profile.data.verifications.phone) &&
                                    <span className={`warning`}>
                                        <svg className={`message__icon`}>
                                            <use xlinkHref={`#icon-error`}/>
                                        </svg>
                                        {t('To use coupon, you need add card & cell phone')}
                                    </span>}
                                </h1>
                            </header>
                            <section className={`_spinner${coupon.fetching ? ' is-spinning' : ''}`}>
                                {!!coupon.data && <Paginated
                                    data={coupon.data}
                                    pageSize={4}
                                    component={CouponSelector}
                                    componentProps={{
                                        isDisabled: !(profile.data.verifications.name && profile.data.verifications.phone),
                                        onSelect: this.onCouponSelect,
                                        selected: this.state.form.coupon,
                                    }}
                                />}
                            </section>
                        </section>
                    </div>
                    <div className={`l-section l-section--secondary`}>
                        <section>
                            <header className="module-header page-header"><h1 className="header__title">{t('details')}</h1></header>
                            <div className={`form form--part module accordion set set--chosen _spinner${(deposit.methodFetching || profile.fetching) ? ' is-spinning' : ''}`}>
                                {!!deposit.method && deposit.method.map(m => {
                                    if ((m.code.endsWith('WAP') && !isMobile()) || (!m.code.endsWith('WAP') && isMobile() && m.currency === 'CNY')) {
                                        return null
                                    }
                                    return (
                                        <Payment
                                            key={m.code}
                                            onChange={this.onMethodChange}
                                            isSelected={this.state.form.method === m.code}
                                            currentExtra={this.state.form.extra}
                                            Method={m}
                                            isDisabled={!this.isMethodAvailable(m)}
                                            onExtraChange={this.onExtraChange}
                                        />
                                    )
                                })}
                            </div>
                        </section>
                        <section className={`form--part`}>
                            <div className={`module form`}>
                                <div className={`form__row inputs`}>
                                    <div className={`fieldset`}>
                                        <div className={`fieldset__field`}>
                                            <label className={`input-element _price${this.state.focus.amount ? ' is-focused' : ''}${this.state.error.amount ? ' error' : ''}`}>
                                                <input
                                                    className={`unfocusable`}
                                                    placeholder={t('Amount')}
                                                    type={`number`}
                                                    onFocus={this.onAmountFocus}
                                                    onBlur={this.onAmountBlur}
                                                    onKeyDown={this.onAmountKeyDown}
                                                    onInput={this.onAmountChange(true)} //大于最大金额再输入不更新
                                                    value={this.state.form.amount}
                                                    tabIndex={1}
                                                />
                                            </label>
                                        </div>
                                        <div className={`fieldset__field`}>
                                            <label style={{position: 'relative'}} className={`input-element${this.state.focus.coupon ? ' is-focused' : ''}`}>
                                                <input
                                                    ref={this.couponInput}
                                                    onChange={this.onCouponChange}
                                                    className={`unfocusable`}
                                                    placeholder={t('coupon')}
                                                    type={`text`}
                                                    onFocus={this.onCouponFocus}
                                                    onBlur={this.onCouponBlur}
                                                    value={this.state.form.coupon}
                                                    tabIndex={2}
                                                    disabled={!!profile.data && !(profile.data.verifications.name && profile.data.verifications.phone)}
                                                />
                                                <i className={`ic icon-circle-percentage input-element__icon`}/>
                                                <ul className={`coupon-hint ${this.state.couponHint.show ? '' : 'ng-hide'}`}>
                                                    {
                                                        this.state.couponHint.data && 
                                                        this.state.couponHint.data.map(item => <li key={item} onMouseDown={this.onCouponHintMouseDown} onClick={this.onCouponHintClick}>{item}</li>)
                                                    }
                                                </ul>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className={`form--part`}>
                            <div className={`module form`}>
                                <div className="form__row form__row--summary form__row--key-value">
                                    <div className="form__row-key form__row-key--small-print">
                                        <div className={`form__small-print${this.state.info.amount === 'min' ? (this.state.error.amount === 'min' ? ' error' : '') : ' ng-hide'}`}>
                                            {t('Min amount')}: <span className={`_price`}>{amountFormat(this.validRange.min)}</span>
                                        </div>
                                        <div className={`form__small-print${this.state.info.amount === 'max' ? (this.state.error.amount === 'max' ? ' error' : '') : ' ng-hide'}`}>
                                            {t('Max amount')}: <span className={`_price`}>{amountFormat(this.validRange.max)}</span>
                                        </div>
                                        <div className={`form__small-print${this.state.error.amount === 'coupon' ? ' error' : ' ng-hide'}`}>
                                            {t('Coupon required')}: <span className={`_price`}>{amountFormat(this.couponMinAmount)}</span>
                                        </div>
                                    </div>
                                    <div className="form__row-value">
                                        <p className="form__sheet-row form__price form_price--total">
                                            <strong className="form__sheet-cell form__sheet-cell--label">{t('Total balance')}：</strong>
                                            <strong className="form__sheet-cell">
                                                {!!profile.data && <span className={`_price`}>{amountFormat(profile.data.financial.limitations.balance.total)}</span>}
                                            </strong>
                                        </p>
                                        <p className="form__sheet-row form__price form_price--total">
                                            <strong className="form__sheet-cell form__sheet-cell--label">{t('Daily deposit')}：</strong>
                                            <strong className="form__sheet-cell">
                                                {!!profile.data && <span className={`_price`}>{amountFormat(profile.data.financial.limitations.deposit.daily)}</span>}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="module form--part form__submit">
                            {/* ng-class="{ 'has-additional-info': order.useStoreCredit }" */}
                            <strong className="form__summary">
                                <span>
                                    <span className="_price">{this.state.form.amount ? amountFormat(this.state.form.amount) : amountFormat(0)}</span>
                                </span>
                            </strong>
                            <button className={`form__btn btn btn--green _spinner${deposit.submitting ? ' is-spinning' : ''}`} type="button" disabled={!this.isValid()} onClick={this.onSubmit}>
                                <span>
                                    {t('Pay for your order now')}
                                </span>
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

Deposit.propTypes = {
    t: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deposit: PropTypes.object.isRequired,
    checkout: PropTypes.object.isRequired,
    coupon: PropTypes.object.isRequired,
    wallet: PropTypes.object.isRequired,
    addDeposit: PropTypes.func.isRequired,
    getCoupons: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const couponFilter = (coupon) => {
        return coupon.filter(item => item.type === 'all' || item.type === 'deposit');
    }
    return {
        deposit: state.deposit,
        profile: state.profile,
        coupon: {...state.coupon, data: state.coupon.data ? couponFilter(state.coupon.data) : state.coupon.data},
        checkout: state.checkout,
        wallet: state.wallet,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addDeposit: (deposit) => dispatch(DepositActions.depositAddRequest(deposit)),
    getCoupons: () => dispatch(CouponActions.couponRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Deposit)