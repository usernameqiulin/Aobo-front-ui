import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import {translate} from 'react-i18next'
import {connect} from "react-redux"
import R from "ramda"

import ABOTP from "./ABOTP"
import TransferActions from "../../Redux/TransferRedux"
import WalletSelector from "../Selector/Wallet"
import i18n from '../../i18n'
import './form.css'
import {amountFormat} from "../../helper";
import CouponSelector from '../Selector/Coupon'
import Paginated from "../Selector/Paginated"
import DepositAndTransfer from './DepositAndTransfer'

class Transfer extends DepositAndTransfer {
    constructor(props){
        super(props);
    }

    _getMaxAmount = (wallet) => {
        if (wallet === 'MAIN') {
            this.maxAmount = this.props.wallet.main.balances.available
        }else{
            this.maxAmount = this.props.wallet.other.find(w => w.wallet.code === wallet).balances.available;
        }
        this.maxAmount = this.maxAmount ? this.maxAmount : 0;
    }

    changeCode = (code) => {
        if (code.length <= 6) {
            this.setState({
                form: {
                    ...this.state.form,
                    code: code,
                }
            })
        } else {
            this.setState({
                error: {
                    ...this.state.error,
                    code: true,
                }
            })
        }
    }

    isValid = () => {
        const amount = parseFloat(this.state.form.amount)
        return (
            !this.state.error.amount
            && !this.state.error.source_wallet
            && !this.state.error.destination_wallet
            && !this.state.error.coupon
            && !this.state.error.code
            && !isNaN(amount)
            && amount !== 0
            && this.state.form.code.length === 6
            && !!this.state.form.source_wallet
            && !!this.state.form.destination_wallet
        )
    }

    selectSourceWallet = (wallet) => {
        this.setState({
            form: {
                ...this.state.form,
                source_wallet: wallet === this.state.form.source_wallet ? '' : wallet,
            }
        }, () => {
            if (this.state.form.source_wallet) {
                this._getMaxAmount(wallet)
            } else {
                this.maxAmount = null
            }
            this.findError(this.state.form.amount)
        })
    }

    onSubmit = e => {
        if (!this.isValid()) return
        let transfer = R.merge(this.state.form, {})
        for (const k in transfer) {
            if (!transfer[k]) {
                delete transfer[k]
            }
        }
        console.log(transfer);
        this.props.addTransfer(transfer)
    }

    render() {
        const {t, profile, transfer, coupon} = this.props;
        return (
            <div className={`modal-form`}>
                <div className={`modal-form__header`}>
                    <div className="modal-form__title">
                        {t('transfer')}
                    </div>
                </div>
                <div className={`modal-form__field${transfer.submitError && transfer.submitError.startsWith('BANK_') ? ' error' : ''}`}>
                    <div>
                        <div className={`modal-form__bank-selector transfer cf`}>
                            <div className="wallet-expl wallet-expl--1">
                                <div className={`wallet-expl__arrow-wrapper`}>
                                    <WalletSelector
                                        wallet={this.props.wallet}
                                        selected={this.state.form.source_wallet}
                                        disabled={this.state.form.destination_wallet}
                                        language={i18n.language}
                                        onSelect={this.selectSourceWallet}
                                        showBrands={true}
                                    />
                                    <svg className="wallet-expl__arrow"><use xlinkHref="#icon-arrow"/></svg>
                                </div>
                            </div>
                            <div className="wallet-expl wallet-expl--2">
                                <WalletSelector
                                    wallet={this.props.wallet}
                                    selected={this.state.form.destination_wallet}
                                    disabled={this.state.form.source_wallet}
                                    language={i18n.language}
                                    onSelect={this.selectDestinationWallet(true)}
                                    showBrands={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-form__field${transfer.submitError && transfer.submitError.startsWith('ACCOUNT_NUMBER_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Amount')}</span>
                    </div>
                    <div className="">
                        <input
                            className="modal-form__input"
                            type="number"
                            placeholder={t('Amount')}
                            onKeyDown={this.onAmountKeyDown}
                            onChange={this.onAmountChange(false)} //大于最大金额时不限制更新
                            value={this.state.form.amount}
                            tabIndex={1}
                        />
                        <div className={`add-review__counter${this.state.error.amount ? ' is-error' : ' ng-hide'}`}>
                            {this.state.error.amount === 'max' && (
                                this.maxAmount > 0
                                    ? <span>{t('Max amount')}: <span className={`_price`}>{amountFormat(this.maxAmount)}</span></span>
                                    : <span>{t('INSUFFICIENT_BALANCE')}</span>
                            )}
                            {this.state.error.amount === 'coupon' && (
                                <span>{t('Coupon required')}: <span className={`_price`}>{amountFormat(this.couponMinAmount)}</span></span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`modal-form__field${transfer.submitError && transfer.submitError.startsWith('ACCOUNT_NUMBER_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('coupon')}</span>
                    </div>
                    <div className="">
                        <input
                            className="modal-form__input"
                            value={this.state.form.coupon}
                            type="text"
                            onFocus={this.onCouponFocus}
                            onBlur={this.onCouponBlur}
                            placeholder={t('coupon')}
                            onChange={this.onCouponChange}
                            disabled={this.state.form.destination_wallet === 'MAIN' || !(profile.data.verifications.name && profile.data.verifications.phone)}
                            tabIndex={2}
                        />
                        <ul className={`coupon-hint ${this.state.couponHint.show ? '' : 'ng-hide'}`}>
                            {
                                this.state.couponHint.data && 
                                this.state.couponHint.data.map(item => <li key={item} onMouseDown={this.onCouponHintMouseDown} onClick={this.onCouponHintClick}>{item}</li>)
                            }
                        </ul>
                    </div>
                </div>

                <div className={`modal-form__field ${!!coupon.data && coupon.data.length ? '' : 'ng-hide'}`}>
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
                </div>


                <div className={`modal-form__field modal-form__field-transparent`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{!!profile.data && t('PROTECTION_' + profile.data.setting.transfer)}</span>
                    </div>
                    <div className={`modal-form__input otp`}>
                        <ABOTP
                            onChange={this.changeCode}
                            isError={
                                (
                                    transfer.submitError
                                    && (
                                        transfer.submitError.startsWith('2FA_CODE_')
                                        || transfer.submitError.startsWith('SMS_CODE_')
                                        || transfer.submitError.startsWith('PASSWORD_CODE_')
                                        || transfer.submitError === 'PASSWORD_NOT_MATCH'
                                    )
                                )
                                || this.state.error.code
                            }
                            maskSwitch={profile.data.setting.transfer === 'password'}
                            eyeClose={profile.data.setting.transfer === 'password'}
                        />
                    </div>
                </div>
                <div className={`modal-form__bottom`}>
                    <span className={`btn btn--green add-review__button _spinner${transfer.submitting ? ' is-spinning' : ''}${this.isValid() ? '' : ' ng-hide'}`} onClick={this.onSubmit}>
                        {t('transfer')}
                    </span>
                    <span className={`btn btn--green add-review__button is-disabled${!this.isValid() ? '' : ' ng-hide'}`}>{t('transfer')}</span>
                </div>
            </div>
        )
    }
}

Transfer.propTypes = {
    t: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const couponFilter = (coupon) => {
        return coupon.filter(item => item.type === 'all' || item.type === 'transfer');
    }
    return {
        profile: state.profile,
        transfer: state.transfer,
        wallet: state.wallet,
        coupon: {...state.coupon, data: state.coupon.data ? couponFilter(state.coupon.data) : state.coupon.data}
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTransfer: (transfer) => dispatch(TransferActions.transferAddRequest(transfer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Transfer))
