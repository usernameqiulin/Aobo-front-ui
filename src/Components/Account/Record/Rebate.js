import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {amountFormat} from "../../../helper";

class Rebate extends React.PureComponent {

    state = {
        expanded: false,
    }

    toggle = e => this.setState({expanded: !this.state.expanded})

    render() {
        const {t, timezone, record, detailLabel} = this.props
        return (
            <div className={`wallet-transactions__item${this.state.expanded ? ' is-expanded' : ''}`}>
                <div className={`_clickable`} title={detailLabel} onClick={this.toggle}>
                    <div className="wallet-transaction__details wallet-transaction__details--date wallet-rebate__details--date">
                        <span>{moment(record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                        <img srcSet={require('../../../images/d-arrow_x1.png') + ", " + require('../../../images/d-arrow_x2.png') + " 2x"} className="wallet-load-more__icon"/>
                    </div>
                    <div className="wallet-transaction__details wallet-rebate__details--amount">
                        <b className={`wallet-transactions__change wallet-transactions__change--plus`}>
                            <span className="_price">{amountFormat(record.bonus)}</span>
                        </b>
                    </div>
                    <div className="wallet-transaction__details wallet-rebate__details--name">
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${record.product.toLowerCase()}`}/></svg>
                        {' '}
                        <span>{moment(record.period.from).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')} - {moment(record.period.to).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                    </div>
                </div>
                <div className={`details__wrapper`}>
                    <div className={`details__content`}>
                        <div className={`wallet-transactions__head`}>
                            <div className="wallet-transactions__header wallet-transactions__header--date"/>
                            <div className="wallet-transactions__header wallet-transactions__header--balance-change">{t('total bets')}</div>
                            <div className="wallet-transactions__header wallet-rebate__header--name">{t('details')}</div>
                        </div>
                        {!!record.details && record.details.map((d, i) => {
                            return (
                                <div className={`details-item`} key={i}>
                                    <div className="wallet-transaction__details brand">
                                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${d.brand.toLowerCase()}`}/></svg>
                                    </div>
                                    <div className="wallet-transaction__details wallet-transaction__details--balance-change total-bets">
                                        <b className={`bets`}>
                                            <span className={`_price`}>{amountFormat(d.flows.total)}</span>
                                        </b>
                                    </div>
                                    <div className={`wallet-transaction__details wallet-rebate__details--name`}>
                                        <b>
                                            <span className={`_price`}>{amountFormat(d.flows.rebateable)}</span>
                                        </b>
                                        {' '}x{' '}
                                        <span className={`_percentage rate`}>{(d.rate*100).toFixed(2)}</span>
                                        {' '}={' '}
                                        <b className={`wallet-transactions__change`}>
                                            <span className={`_price`}>{amountFormat(d.amount)}</span>
                                        </b>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

Rebate.propTypes = {
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    detailLabel: PropTypes.string.isRequired,
}

export default Rebate