import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment/moment"

import {amountFormat, getName} from "../../../helper"
import Card from '../../Selector/Card'
import i18n from "../../../i18n"

class Withdraw extends React.Component {

    render() {
        const {t, timezone, record, wallet} = this.props
        return (
            <div className="wallet-transactions__item">
                <div className="wallet-transaction__details wallet-transaction__details--date">
                    <span>{moment(record.timestamps.createdAt).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}</span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--game">
                    <span>
                        <svg className="wallets__icon"><use xlinkHref={`#icon-${wallet.code === 'MAIN' ? 'bank' : 'wallet'}`}/></svg>
                        {getName(wallet.name, i18n.language)}
                        <i className={`ic icon-arrow-right`}/>
                        <Card
                            t={t}
                            selectable={false}
                            bank={record.bank}
                            account={record.account}
                        />
                    </span>
                </div>
                <div className="wallet-transaction__details wallet-records__details--bet">
                    <b className={`wallet-transactions__change`}>
                        <span className="_price">
                            {amountFormat(record.amount)}
                        </span>
                    </b>
                </div>
                <div className="wallet-transaction__details wallet-records__details--payout wallet-deposit__details--status">
                    {(record.status === 'finished' || record.status === 'paid' || record.status === 'approved') && <span className={`wallet-transactions__status--finished`}>
                        <i className={`ic icon-circle-tick`}/>{' ' + t('finished')}
                    </span>}
                    {record.status === 'declined' && <span className={`wallet-transactions__status--declined`}>
                        <i className={`ic icon-cancel`}/>{' ' + t('Canceled')}
                    </span>}
                    {['finished','paid','approved','declined'].indexOf(record.status) === -1 && <span>{t('processing')}</span>}
                </div>
            </div>
        )
    }
}

Withdraw.propTypes = {
    t: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
}

export default Withdraw