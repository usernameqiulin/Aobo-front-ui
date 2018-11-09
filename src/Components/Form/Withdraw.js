import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import debounce from 'lodash/debounce'
import {connect} from 'react-redux'
import R from "ramda"

import WithdrawActions from '../../Redux/WithdrawRedux'
import CardActions from "../../Redux/CardRedux"
import CardSelector from "../Selector/Card"
import i18n from "../../i18n"
import ABOTP from "./ABOTP"
import WalletSelector from "../Selector/Wallet"

import './form.css'
import {amountFormat} from "../../helper"

class Withdraw extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            withdraw: {
                amount: '',
                wallet: 'MAIN',
                card: '',
                code: '',
            },
            error: {
                card: null,
                amount: '',
                wallet: null,
                code: null,
            },
        }
        this.validRange = !!props.profile.data ? this.getRange(props.profile.data) : {min:0, max:0}
    }

    getRange = (profile) => {
        const withdrawSetting = profile.financial.limitations.withdraw
        return {min: withdrawSetting.min, max: withdrawSetting.max}
    }

    componentDidMount() {
        !this.props.card.fetching && !this.props.card.data && this.props.getCard()
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.profile.data && nextProps.profile.data) {
            this.validRange = this.getRange(nextProps.profile.data)
        }
    }

    changeCode = (code) => {
        if (code.length <= 6) {
            this.setState({
                withdraw: {
                    ...this.state.withdraw,
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
        const amount = parseFloat(this.state.withdraw.amount)
        return (
            !this.state.error.amount
            && !this.state.error.card
            && !this.state.error.wallet
            && !this.state.error.code
            && !isNaN(amount)
            && amount !== 0
            && this.state.withdraw.code.length === 6
            && this.state.withdraw.card.length === 36
        )
    }

    onAmountKeyDown = e => {
        const string = e.target.value
        string.indexOf('.') !== -1 && string.split('.')[1].length >= 2 && e.which !== 8 && e.preventDefault()
    }

    onAmountChange = e => {
        const amountString = e.target.value
        if (amountString.indexOf('.') !== -1 && amountString.split('.')[1].length > 2) {
            return false
        }
        const amount = parseFloat(amountString)
        if (isNaN(amount)) {
            this.setState({
                withdraw: {
                    ...this.state.withdraw,
                    amount: '',
                },
            })
            return
        }
        this.validateAmount(amount)
        this.setState({
            withdraw: {
                ...this.state.withdraw,
                amount,
            },
        })
    }

    validateAmount = (amount) => {
        let error = null;
        if (amount < this.validRange.min && amount !== 0) {
            error = 'min'
        }
        if (amount > this.validRange.max) {
            error = 'max'
        }
        this.setState({
            error: {
                ...this.state.error,
                amount: error
            }
        })
    }

    selectCard = (card) => {
        this.setState({
            withdraw: {
                ...this.state.withdraw,
                card,
            }
        })
    }

    selectWallet = (wallet) => this.setState({
        withdraw: {
            ...this.state.withdraw,
            wallet: wallet,
        }
    })

    onSubmit = e => {
        if (!this.isValid()) return
        let withdraw = R.merge(this.state.withdraw, {})
        for (const k in withdraw) {
            if (!withdraw[k]) {
                delete withdraw[k]
            }
        }
        console.log(this.state.withdraw)
        this.props.addWithdraw(withdraw)
    }

    render() {
        const {t, profile} = this.props
        return (
            <div className={`modal-form`}>
                <div className={`modal-form__header`}>
                    <div className="modal-form__title">
                        {t('withdraw')}
                    </div>
                </div>
                <div className={`modal-form__field`}>
                    <div className={`modal-form__item`}>
                        <span className={`modal-form__label`}>{t('wallet')}</span>
                    </div>
                    <div>
                        <WalletSelector
                            wallet={this.props.wallet}
                            selected={this.state.withdraw.wallet}
                            language={i18n.language}
                            onSelect={this.selectWallet}
                        />
                    </div>
                </div>
                <div className={`modal-form__field${this.props.withdraw.submitError && this.props.withdraw.submitError.startsWith('CARD_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Beneficiary')}</span>
                    </div>
                    <div>
                        <div className={`modal-form__bank-selector _spinner${this.props.card.fetching ? ' is-spinning' : ''}`}>
                            {!!this.props.card.data && this.props.card.data.map(c => {
                                return <CardSelector
                                    t={t}
                                    selectable
                                    selected={this.state.withdraw.card}
                                    onSelect={this.selectCard}
                                    key={c.id}
                                    bank={c.bank}
                                    account={c.account}
                                    id={c.id}
                                />
                            })}
                        </div>
                    </div>
                </div>
                <div className={`modal-form__field${this.props.withdraw.submitError && this.props.withdraw.submitError.startsWith('AMOUNT_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Amount')}</span>
                    </div>
                    <div className="">
                        <input
                            className="modal-form__input"
                            type="number"
                            placeholder={t('Amount')}
                            onKeyDown={this.onAmountKeyDown}
                            onChange={this.onAmountChange}
                            value={this.state.withdraw.amount}
                            tabIndex={1}
                        />
                        <div className={`add-review__counter${this.state.error.amount ? ' is-error' : ' ng-hide'}`}>
                            {this.state.error.amount === 'min' && <span>{t('Min amount')}: <span className={`_price`}>{amountFormat(this.validRange.min)}</span></span>}
                            {this.state.error.amount === 'max' && <span>{t('Max amount')}: <span className={`_price`}>{amountFormat(this.validRange.max)}</span></span>}
                        </div>
                    </div>
                </div>
                <div className={`modal-form__field modal-form__field-transparent`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{!!profile.data && t('PROTECTION_' + profile.data.setting.withdraw)}</span>
                    </div>
                    <div className={`modal-form__input otp`}>
                        <ABOTP
                            onChange={this.changeCode}
                            isError={
                                (
                                    this.props.withdraw.submitError
                                    && (
                                        this.props.withdraw.submitError.startsWith('2FA_CODE_')
                                        || this.props.withdraw.submitError.startsWith('SMS_CODE_')
                                        || this.props.withdraw.submitError.startsWith('PASSWORD_CODE_')
                                        || this.props.withdraw.submitError === 'PASSWORD_NOT_MATCH'
                                    )
                                )
                                || this.state.error.code
                            }
                            maskSwitch={profile.data.setting.withdraw === 'password'}
                            eyeClose={profile.data.setting.withdraw === 'password'}
                        />
                    </div>
                </div>
                <div className={`modal-form__bottom`}>
                    <span className={`btn btn--green add-review__button _spinner${this.isValid() ? '' : ' ng-hide'}${this.props.withdraw.submitting ? ' is-spinning' : ''}`} onClick={this.onSubmit}>
                        {t('withdraw')}
                    </span>
                    <span className={`btn btn--green add-review__button is-disabled${!this.isValid() ? '' : ' ng-hide'}`}>{t('withdraw')}</span>
                </div>
            </div>
        )
    }
}

Withdraw.propTypes = {
    t: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        card: state.card,
        withdraw: state.withdraw,
        wallet: state.wallet,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addWithdraw: (withdraw) => dispatch(WithdrawActions.withdrawAddRequest(withdraw)),
    getCard: () => dispatch(CardActions.cardRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Withdraw))