import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import {translate} from "react-i18next"

import './form.css'

import ABBankSelector from "../Selector/Bank"
import CardActions from "../../Redux/CardRedux"
import ABOTP from "./ABOTP"
import ABScroll from "../ABScroll"

const MAX_NUMBERS = 19
const MIN_NUMBERS = 16
const SPECIAL_CHARACTS = /[`~!@#$%^&*()+={}\[\]\/<>?,;:'"]/


class ABBankAccount extends React.Component {

    state = {
        account_name: !!this.props.profile.data.name ? this.props.profile.data.name : '',
        account_number: null,
        bank: null,
        branch: null,
        code: '',
        otpError: false,
    }

    componentWillUnmount() {
        this.setState({
            account_number: null,
            bank: null,
            branch: null,
            code: '',
            otpError: false,
        })
    }

    isValid = () => {
        return (
            this.verifyNo()
            && this.state.account_name !== null
            && this.state.bank !== null
            && this.state.branch !== null
            && this.state.code.length === 6
        )
    }

    selectBank = code => {
        code !== this.state.bank && this.setState({bank: code})
    }

    inputNo = event => {
        if (event.target.value.length >= MAX_NUMBERS) {
            event.preventDefault()
        }
    }

    onNumberChange = e => {
        this.setAccountNumber(e.target.value)
    }

    verifyNo = () => {
        return /^\d+$/.test(this.state.account_number) && this.state.account_number.length >= MIN_NUMBERS && this.state.account_number.length <= MAX_NUMBERS
    }

    inputName = event => {
        const keyCode = event.keyCode || event.which
        const keyValue = String.fromCharCode(keyCode)
        if (SPECIAL_CHARACTS.test(keyValue) || /\d*/.test(keyValue)) {
            event.preventDefault()
        }
    }

    onNameChange = e => {
        this.setState({account_name: e.target.value})
    }

    inputBranch = event => {
        const keyCode = event.keyCode || event.which
        const keyValue = String.fromCharCode(keyCode)
        // console.log(keyValue, SPECIAL_CHARACTS.test(keyValue))
        if (SPECIAL_CHARACTS.test(keyValue)) {
            event.preventDefault()
        }
    }

    onBranchChange = e => {
        e.persist()
        this.setBranch(e.target.value)
    }

    setAccountNumber = number => this.setState({account_number: number})

    setBranch = debounce(branch => {
        this.setState({branch: branch})
    }, 500)

    onSubmit = e => {
        if (this.state.code.length !== 6) {
            this.setState({otpError: !0})
            return
        }
        this.props.addCard(this.state)
    }

    changeCode = (code) => {
        let obj = {code: code}
        if (code.length < 6) {
            // obj.otpError = !0
        } else {
            obj.otpError = !1
        }
        this.setState(obj)
    }

    render() {
        const {t, profile} = this.props, verified = profile.data.verifications.name
        return (
            <div className={`modal-form _spinner${this.props.card.adding ? ' is-spinning' : ''}`}>
                <div className={`modal-form__header`}>
                    <div className="modal-form__title">
                        {t('Add Debit card')}
                    </div>
                </div>
                <div className={`modal-form__field${this.props.card.addError && this.props.card.addError.startsWith('BANK_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Bank')}</span>
                    </div>
                    <div>
                        <div className={`modal-form__bank-selector`}>
                            <ABScroll>
                            {this.props.profile.data.financial.settings.withdraw.map((b, i) => {
                                return <ABBankSelector
                                    selectable
                                    selected={this.state.bank}
                                    onSelect={this.selectBank}
                                    code={b.bank.code}
                                    name={b.bank.name}
                                    key={i}
                                />
                            })}
                            </ABScroll>
                        </div>
                    </div>
                </div>
                <div className={`modal-form__field${this.props.card.addError && this.props.card.addError.startsWith('ACCOUNT_NAME_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Account name')}</span>
                    </div>
                    <div>
                        <input
                            className="modal-form__input"
                            type="text"
                            placeholder={t('Account name')}
                            value={this.state.account_name}
                            disabled={verified}
                            onKeyPress={this.inputName}
                            onChange={this.onNameChange}
                        />
                        {verified && <div className="modal-form__counter">
                            <svg className="icon-lock"><use xlinkHref="#icon-padlock"/></svg>
                        </div>}
                    </div>
                </div>
                <div className={`modal-form__field${this.props.card.addError && this.props.card.addError.startsWith('BRANCH_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Branch')}</span>
                    </div>
                    <div className="">
                        <input
                            className="modal-form__input"
                            type="text"
                            placeholder={t('Branch')}
                            onKeyPress={this.inputBranch}
                            onChange={this.onBranchChange}
                        />
                    </div>
                </div>
                <div className={`modal-form__field${this.props.card.addError && this.props.card.addError.startsWith('ACCOUNT_NUMBER_') ? ' error' : ''}`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{t('Account number')}</span>
                    </div>
                    <div>
                        <input
                            className="modal-form__input"
                            type="tel"
                            placeholder={t('Account number')}
                            onKeyPress={this.inputNo}
                            onChange={this.onNumberChange}
                            onBlur={this.verifyNo}
                        />
                    </div>
                </div>
                <div className={`modal-form__field modal-form__field-transparent`}>
                    <div className="modal-form__item">
                        <span className="modal-form__label">{!!profile.data && t('PROTECTION_' + profile.data.setting.card)}</span>
                    </div>
                    <div className={`modal-form__input otp`}>
                        <ABOTP
                            onChange={this.changeCode}
                            isError={
                                (this.props.card.addError && (this.props.card.addError.startsWith('2FA_CODE_') || this.props.card.addError.startsWith('SMS_CODE_') || this.props.card.addError.startsWith('PASSWORD_CODE_')))
                                || this.state.otpError
                            }
                            maskSwitch={profile.data.setting.card === 'password'}
                            eyeClose={profile.data.setting.card === 'password'}
                        />
                    </div>
                </div>
                <div className={`modal-form__bottom`}>
                    <span className={`btn btn--gray add-review__button${this.isValid() ? '' : ' ng-hide'}`} onClick={this.onSubmit}>
                        {t('Add Debit card')}
                    </span>
                    <span className={`btn btn--gray add-review__button is-disabled${!this.isValid() ? '' : ' ng-hide'}`}>{t('Add Debit card')}</span>
                </div>
            </div>
        )
    }
}

ABBankAccount.propTypes = {
    t: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        card: state.card,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCard: (card) => dispatch(CardActions.cardAddRequest(card)),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ABBankAccount))