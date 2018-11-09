import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {amountFormat, getName} from "../../../helper"
import InlineCoupon from "../../InlineCoupon"

class Transfer extends React.PureComponent {

    getWalletName = (wallet) => {
        return wallet === 'MAIN'
            ? getName(this.props.wallet.main.wallet.name, this.props.language)
            : getName(this.props.wallet.other.find(w => w.wallet.code === wallet).wallet.name, this.props.language)
    }

    render() {
        const {t, timezone, record} = this.props

        return (
            <div className={`wallet-transactions__item`}>
                <div className="wallet-transaction__details wallet-transaction__details--date wallet-rebate__details--date">
                    <span>{moment(record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                </div>
                <div className="wallet-transaction__details wallet-rebate__details--amount">
                    <b className={`wallet-transactions__change`}>
                        <span className="_price">{amountFormat(record.amount)}</span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-rebate__details--name">
                    <span>
                        <svg className="wallets__icon"><use xlinkHref={`#icon-${record.wallets.source === 'MAIN' ? 'bank' : 'wallet'}`}/></svg>
                        {this.getWalletName(record.wallets.source)}
                    </span>
                    <i className={`ic icon-arrow-right`}/>
                    <span>
                        <svg className="wallets__icon"><use xlinkHref={`#icon-${record.wallets.destination === 'MAIN' ? 'bank' : 'wallet'}`}/></svg>
                        {this.getWalletName(record.wallets.destination)}
                    </span>
                    {' '}
                    {!!record.coupon && <InlineCoupon coupon={record.coupon}/>}
                </div>
            </div>
        )
    }
}

Transfer.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    wallet: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
}

export default Transfer