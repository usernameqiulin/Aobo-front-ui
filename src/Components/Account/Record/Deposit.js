import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment/moment"

import {amountFormat, getName} from "../../../helper"
import PaymentIcon from "../../PaymentIcon"
import InlineCoupon from "../../InlineCoupon"
import i18n from '../../../i18n'

class Deposit extends React.Component {
    render() {
        const {t, timezone, record, wallet} = this.props
        return (
            <div className="wallet-transactions__item">
                <div className="wallet-transaction__details wallet-transaction__details--date">
                    <span>{moment(record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--game">
                    {!wallet && <p className={`loading-block`}/>}
                    {!!wallet &&
                    <React.Fragment>
                        {!!record.method_code && <PaymentIcon method={record.method_code}/>}
                        {!!record.extra && !!record.extra.bank ? <span className={`bank-logo-small${' ' + record.extra.bank}`}/> : ' '}
                        <span>
                            <i className={`ic icon-arrow-right`}/>
                            <span>
                                <svg className="wallets__icon"><use xlinkHref={`#icon-${wallet.code === 'MAIN' ? 'bank' : 'wallet'}`}/></svg>
                                {getName(wallet.name, i18n.language)}
                            </span>
                        </span>
                    {' '}
                    {record.coupon && <InlineCoupon coupon={record.coupon}/>}
                    </React.Fragment>
                    }
                </div>
                <div className="wallet-transaction__details wallet-records__details--bet">
                    <b className={`wallet-transactions__change`}>
                        <span className="_price">
                            {amountFormat(record.amount)}
                        </span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-records__details--payout wallet-deposit__details--status">
                    {record.status === 'finished' && <span className={`wallet-transactions__status--finished`}>
                        <i className={`ic icon-circle-tick`}/>{' ' + t('finished')}
                    </span>}
                    {/* ng-href="/checkout/5bcb42f2d027" ng-if="orderItem.isPending" hook-test="ordersHistoryCompleteThisOrder" href="/checkout/5bcb42f2d027" */}
                    {record.status !== 'finished' && <a className="order-header-btn btn btn--gray">完成此订单</a>}
                </div>
            </div>
        )
    }
}

Deposit.propTypes = {
    t: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
}

export default Deposit