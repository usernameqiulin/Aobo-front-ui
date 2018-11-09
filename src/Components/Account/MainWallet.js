import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Link} from "react-router-dom"

import {amountFormat} from "../../helper"

class MainWallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            processing: !1,
        }
    }

    refresh = (e) => {
        this.props.refresher('MAIN')
    }

    render() {
        const {t, wallet, processing} = this.props, availableArray = amountFormat(wallet.balances.available).split('.'), holdArray = amountFormat(wallet.balances.hold).split('.')
        return (
            <div className={`wallet-funds`}>
                <h2 className="module-header module-header--wallet">
                    {/*<svg className={``}><use xlinkHref={`#icon-bank`}/></svg>*/}
                    {t('main wallet')}
                </h2>
                <div className="wallet-funds-box">
                    <a className={`btn wallet-funds-box__refresh${processing === 'MAIN' ? ' is-spinning' : ''}`} onClick={this.refresh}>
                        <svg className={`wallet-amount__add-icon icon-svg icon-refresh${processing === 'MAIN' ? ' wallet-amount__add-icon--invisible' : ''}`}>
                            <use xlinkHref="#icon-refresh"/>
                        </svg>
                    </a>
                    <div className="wallet-funds-box__amount">
                        <span className="_price">
                            <span>{availableArray[0]}</span>
                            <sup className="wallet-funds-box__tip">{availableArray[1]}</sup>
                        </span>
                    </div>
                    <div className="wallet-funds-box__btns">
                        <div className={`wallet-funds-box__hold`}>
                            {t('Hold')}:{' '}
                            <span className={`_price`}>
                                <span>{holdArray[0]}</span>
                                <sup className="wallet-amount__tip">{holdArray[1]}</sup>
                            </span>
                        </div>
                        <Link to={'/account/deposit'} className="btn">{t('deposit')}</Link>
                        <Link to={'/account/withdraw'} className="btn">{t('withdraw')}</Link>
                        <Link to={'/account/transfer'} className="btn">{t('transfer')}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

MainWallet.propTypes = {
    wallet: PropTypes.object.isRequired,
    refresher: PropTypes.func.isRequired,
    processing: PropTypes.string.isRequired,
}

export default translate()(MainWallet)