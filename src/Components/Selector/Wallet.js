import React from 'react'
import PropTypes from 'prop-types'

import {amountFormat, getName} from "../../helper"

import './Wallet.css'
import BrandIcon from "../BrandIcon"

class Wallet extends React.Component {

    onSelect = (w) => {
        w !== this.props.disabled && this.props.onSelect(w)
    }

    render() {
        const {wallet, language, showBrands} = this.props
        return (
            <div className="wallets">
                <ul className="module wallets__list">
                    {!!wallet.main &&
                    <li className={`wallets__item${this.props.disabled === 'MAIN' ? ' disabled': ''}${this.props.selected === 'MAIN' ? ' selected' : ''}`}>
                        <a className="wallets__link" onClick={this.onSelect.bind(this, 'MAIN')}>
                            <div className="wallets__icon-holder">
                                <svg className="wallets__icon"><use xlinkHref="#icon-bank"/></svg>
                            </div>
                            <div className="wallets__text">
                                <span className="wallets__title">{getName(wallet.main.wallet.name, language)}</span>
                            </div>
                            <div className={`wallets__balance`}>
                                <span className={`_price`}>{amountFormat(wallet.main.balances.available)}</span>
                            </div>
                        </a>
                    </li>}
                    {!!wallet.other && wallet.other.map(w => <li className={`wallets__item${this.props.disabled === w.wallet.code ? ' disabled': ''}${this.props.selected === w.wallet.code ? ' selected' : ''}`} key={w.wallet.code}>
                        <a className={`wallets__link`} onClick={this.onSelect.bind(this, w.wallet.code)}>
                            <div className="wallets__icon-holder">
                                <svg className="wallets__icon"><use xlinkHref="#icon-wallet"/></svg>
                            </div>
                            <div className="wallets__text">
                                <span className="wallets__title">{getName(w.wallet.name, language)}</span>
                                {!!w.wallet.brands && showBrands && (
                                    <span className={`wallets__brands`}>
                                        {' '}
                                        {w.wallet.brands.map(b => <BrandIcon key={b} code={b}/>)}
                                    </span>
                                )}
                            </div>
                            <div className={`wallets__balance`}>
                                <span className={`_price`}>{amountFormat(w.balances.available)}</span>
                            </div>
                        </a>
                    </li>)}
                </ul>
            </div>
        )
    }
}

Wallet.propTypes = {
    wallet: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    showBrands: PropTypes.bool,
}

export default Wallet