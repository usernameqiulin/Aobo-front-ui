import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {amountFormat, getName} from "../../../helper"

class ABGameRecord extends React.PureComponent {

    render() {
        const {timezone, record, language} = this.props
        const product = record.product.toLowerCase(), brand = record.brand.toLowerCase()
        const gameName = getName(record.game.name, language)
        return (
            <div className="wallet-transactions__item">
                <div className="wallet-transaction__details wallet-transaction__details--date">
                    <span>{moment(record.playAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                    <span className={`wallet-transactions__triangle${record.payout - record.bet > 0 ? ' wallet-transactions__triangle--up' : (record.payout - record.bet < 0 ? ' wallet-transactions__triangle--down' : '')}`}/>
                </div>
                <div className="wallet-transaction__details wallet-records__details--game">
                    <span>
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${product}`}/></svg>
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${brand}`}/></svg>
                    </span>
                    <span>{gameName}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--round">
                    <span>{record.round}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--bet">
                    <b className={`wallet-transactions__change wallet-transactions__change--minus`}>
                        <span className="_price">{amountFormat(record.bet)}</span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-records__details--payout wallet-transactions__change--plus">
                    <span className="ng-hide">-</span>
                    <span className="_price">{amountFormat(record.payout)}</span>
                </div>
            </div>
        )
    }
}

ABGameRecord.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
}

export default ABGameRecord