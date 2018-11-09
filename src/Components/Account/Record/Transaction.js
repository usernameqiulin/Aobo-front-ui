import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {amountFormat, getName} from "../../../helper"
import i18n from '../../../i18n'
import Card from '../../Selector/Card'
import PaymentIcon from "../../PaymentIcon";
import InlineCoupon from "../../InlineCoupon";

class TransactionRecord extends React.Component {

    genDescription = (record, t) => {
        let desc = t(record.service)
        switch (record.service) {
            case 'transfer':
                let main = '<svg class="wallets__icon"><use xlink:href="#icon-bank"></use></svg>' + getName(this.props.wallet.main.wallet.name, i18n.language),
                    other = '<svg class="wallets__icon"><use xlink:href="#icon-wallet"></use></svg>' + getName(this.props.wallet.other.find(w => w.wallet.code === record.walletCode).wallet.name, i18n.language)
                return <span dangerouslySetInnerHTML={{__html: desc + ': ' + (record.amount > 0 ? other : main) + ' <i class="ic icon-arrow-right"/> ' + (record.amount > 0 ? main : other)}}/>
            case 'coupon':
                return <span>{desc + ' '}<InlineCoupon coupon={record.description.coupon}/></span>
            case 'rebate':
                return <span>{t(record.description.product) + desc}</span>
            case 'withdraw':
                return <span>{desc}: <i className={`ic icon-arrow-right`}/><Card
                    t={t}
                    selectable={false}
                    bank={record.description.bank}
                    account={record.description.account}
                /></span>
            case 'deposit':
                return (
                    <React.Fragment>
                        <PaymentIcon method={record.description.method}/>
                        {record.description.bank ? <span className={`bank-logo-small${' ' + record.description.bank}`}/> : ' '}
                        <span>{desc}</span>
                    </React.Fragment>
                )
            case 'nb':
                let label
                if (!!record.description && record.description.hasOwnProperty('action')) {
                    switch (record.description.action) {
                        case 'booking':
                            label = t('sports bet')
                            break
                        case 'cancel-booking':
                            label = t('cancel sports bet')
                            break
                        case 'order':
                            label = t('sports bet')
                            break
                        case 'cancel-order':
                            label = t('cancel sports bet')
                            break
                        case 'settlement':
                            label = t('sports settlement')
                            break
                        case 'cancel-settlement':
                            label = t('cancel sports settlement')
                            break
                    }
                }
                return <span>{label} <span className={`coupon-wrapper`}>{record.description.order}</span></span>
        }
        return <span>{desc}</span>
    }

    render() {
        // console.log(formatTime(this.props.record.timestamps.createdAt, timezone))
        const {t, timezone} = this.props
        return (
            <div className="wallet-transactions__item">
                <div className="wallet-transaction__details wallet-transaction__details--date">
                    <span>{moment(this.props.record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                    <span className={`wallet-transactions__triangle${this.props.record.amount > 0 ? ' wallet-transactions__triangle--up' : ' wallet-transactions__triangle--down'}`}/>
                </div>
                <div className="wallet-transaction__details wallet-transaction__details--name">
                    {this.props.wallet.main ? this.genDescription(this.props.record, t) : <p className={`loading-block`}/> }
                </div>
                <div className="wallet-transaction__details wallet-transaction__details--balance-change">
                    <b className={`wallet-transactions__change${this.props.record.amount > 0 ? ' wallet-transactions__change--plus' : ' wallet-transactions__change--minus'}`}>
                        <span className="_price">{amountFormat(Math.abs(this.props.record.amount))}</span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-transaction__details--end-balance">
                    <span className="ng-hide">-</span>
                    {/* ng-bind="transaction.endBalance.formattedAbsoluteAmount" */}
                    <span className="_price">{amountFormat(this.props.record.postBalance)}</span>
                </div>
            </div>
        )
    }
}

TransactionRecord.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    wallet: PropTypes.object.isRequired,
}

export default TransactionRecord