import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment/moment"
import {amountFormat, getName} from "../../../helper"
import {translate} from "react-i18next"

class Bigwin extends React.PureComponent {
    render() {
        const {t, timezone, record, language} = this.props, brand = record.brand.toLowerCase(),
            gameName = getName(record.game.name, language)
        return (
            <div className={`wallet-transactions__item`}>
                <div className="wallet-transaction__details wallet-transaction__details--date">
                    <span>{moment(record.playAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--game">
                    <span>
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${brand}`}/></svg>
                    </span>
                    <span>
                        {gameName}@{record.times}X
                        {' '}
                        {t('Bonus')}
                        {': '}
                        <span className={`_price`}>{record.bonus}</span>
                    </span>
                    <span className={`status ${record.status}`}>{t(record.status)}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--bet">
                    <b className={`wallet-transactions__change wallet-transactions__change--minus`}>
                        <span className="_price">{amountFormat(record.bet)}</span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-records__details--payout wallet-transactions__change--plus">
                    <span className="ng-hide">-</span>
                    <span className="_price">{amountFormat(record.win)}</span>
                </div>
            </div>
        )
    }
}

Bigwin.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
}

export default translate()(Bigwin)