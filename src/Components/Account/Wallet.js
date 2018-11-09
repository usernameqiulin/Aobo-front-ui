import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {amountFormat, getName} from '../../helper'

import i18n from '../../i18n'

class Wallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            processing: !1,
        }
    }

    refresh = (e) => {
        this.props.refresher(this.props.wallet.wallet.code)
    }

    render() {
        const {t, wallet, index, processing} = this.props, balanceArray = (amountFormat(wallet.balances.available)).split('.')
        const name = getName(wallet.wallet.name, i18n.language)
        return (
            <div className={`wallet-amount wallet-amount--pile-${index}${processing ? ' is-disabled' : ''}`}>
                <span className="wallet-amount__validation-message wallet-amount__validation-message--faded">
                    {name}
                </span>
                <div className="wallet-amount__value _price">
                    {balanceArray[0]}
                    <sup className="wallet-amount__tip">{balanceArray[1]}</sup>
                </div>
                <span className="wallet-amount__add-text">
                    <svg className="wallet-amount__add-icon icon-svg">
                        <use xlinkHref="#icon-refresh"/>
                    </svg>
                    {t('refresh')}
                </span>
                <div className={`wallet-amount__active-state wallet-amount__active-state--pile-${index}${processing === wallet.wallet.code ? ' is-processed' : ''}`}>
                    <span className="wallet-amount__validation-message">
                        {name}
                    </span>
                    <div className="wallet-amount__value wallet-amount__value--active _price">
                        {balanceArray[0]}
                        <sup className="wallet-amount__tip wallet-amount__tip--active">{balanceArray[1]}</sup>
                    </div>
                    <a className={`btn btn--green btn--wide wallet-amount__add-btn${processing === wallet.wallet.code ? ' is-spinning' : ''}`} onClick={this.refresh}>
                        <svg className={`wallet-amount__add-icon wallet-amount__add-icon--active icon-svg${processing === wallet.wallet.code ? ' wallet-amount__add-icon--invisible' : ''}`}>
                            <use xlinkHref="#icon-refresh"/>
                        </svg>
                        {t('refresh')}
                    </a>
                </div>
            </div>
        )
    }
}

Wallet.propTypes = {
    index: PropTypes.number.isRequired,
    wallet: PropTypes.object.isRequired,
    refresher: PropTypes.func.isRequired,
    processing: PropTypes.string.isRequired,
}

export default translate()(Wallet)