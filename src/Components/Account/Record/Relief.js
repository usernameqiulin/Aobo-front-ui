import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment/moment"
import {amountFormat} from "../../../helper";

class Relief extends React.PureComponent {
    render() {
        const {t, timezone, record} = this.props
        return (
            <div className={`wallet-transactions__item`}>
                <div className="wallet-transaction__details wallet-transaction__details--date wallet-rebate__details--date">
                    <span>{moment(record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                </div>
                <div className="wallet-transaction__details wallet-rebate__details--amount">
                    <b className={`wallet-transactions__change wallet-transactions__change--plus`}>
                        <span className="_price">{amountFormat(record.amount)}</span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-rebate__details--name">
                    <svg className={`icon-svg`}><use xlinkHref={`#icon-${record.product.toLowerCase()}`}/></svg>
                    {' '}
                    <span className={`_price`}>{amountFormat(record.detail.deposit)}</span>
                    {' '}
                    x
                    {' '}
                    <span className={`_percentage`}>{record.detail.rate * 100}</span>
                </div>
            </div>
        )
    }
}

Relief.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
}

export default Relief