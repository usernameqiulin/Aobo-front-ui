import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './BankCard.css'
import ABOTP from "../Form/ABOTP"

class ABBankAccount extends React.Component {

    state = {
        goingToDelete: false,
        confirmed: false,
        otp: '',
        otpError: false,
    }

    delete = (e) => {
        this.setState({
            goingToDelete: true,
        })
    }

    confirmDelete = (e) => {
        if (this.state.otp.length !== 6) {
            this.setState({
                otpError: true
            })
            return
        }
        this.setState({
            confirmed: true,
        })
        this.props.onDelete(this.props.account.id, {code: this.state.otp})
    }

    cancelDelete = (e) => {
        this.setState({
            goingToDelete: false,
            confirmed: false,
            otp: '',
            otpError: false
        })
        this.props.resetError()
        this.otp.reset()
    }

    otpOnChange = (code) => {
        this.setState({otp: code, otpError: false})
    }

    render() {
        const {t, account, timezone} = this.props, tail = account.account.number.slice(-4).split('')

        return (
            <div className="bank-card bank-card--3d">
                <div className={`bank-card__inner`}>
                    {/* FRONT */}
                    <div className="module card-rectangle">
                        <div className={`bank-logo ${account.bank}`}/>
                        <p className="card-number">
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <span>&nbsp;</span>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <span>&nbsp;</span>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <i className="dot settings-dot"/>
                            <span>&nbsp;</span>
                            {tail.map((n, i) => <span key={i}>{n}</span>)}
                        </p>
                        <div className="card-rectangle__right">
                            <span className={`card-time`}><i
                                className="ic icon-clock"/>{moment(account.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                            <span className="is-contracted card-rectangle__dropdown">
                                <div className={`btn btn--gray card-rectangle__btn`} onClick={this.delete}
                                     title={t('Delete')}>
                                    <i className={`ic icon-close card-rectangle__dropdown-icon`}/>
                                </div>
                            </span>
                        </div>
                    </div>
                    {/* BACK */}
                    <div
                        className={`card-delete--confirm _spinner${this.state.goingToDelete ? '' : ' ng-hide'}${this.state.confirmed && this.props.isDeleting ? ' is-spinning' : ''}`}>
                        <p className={`card-delete--confirm__message${this.props.error && this.props.error.id === account.id ? ' error' : ''}`}>
                            {(!this.props.error || this.props.error.id !== account.id) && t('Are you sure you want to delete this card?') + t(this.props.protection.toUpperCase() + '_CODE_REQUIRED')}
                            {this.props.error && this.props.error.id === account.id && t(this.props.error.error)}
                        </p>
                        <ABOTP
                            ref={r => this.otp = r}
                            onChange={this.otpOnChange}
                            isError={!!(this.props.error && this.props.error.id === account.id) || this.state.otpError}
                            maskSwitch={this.props.protection === 'password'}
                            eyeClose={this.props.protection === 'password'}
                        />
                        <span className={`wallet__disabled-amounts-glow`}>
                            <a className="btn btn--red btn--big" onClick={this.confirmDelete}>
                                {t('Delete')}
                            </a>
                            &nbsp;
                            <a className={`btn btn--gray btn--big`} onClick={this.cancelDelete}>
                                {t('Cancel')}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

ABBankAccount.propTypes = {
    account: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
    isDeleting: PropTypes.bool,
    error: PropTypes.object,
    resetError: PropTypes.func.isRequired,
}

export default ABBankAccount