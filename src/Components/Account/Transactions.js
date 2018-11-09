import React from 'react'
import PropTypes from 'prop-types'

import TransactionRecord from "./Record/Transaction"

class Transactions extends React.Component {

    render() {
        const {t, transaction, timezone} = this.props
        return (
            <div className={`wallet-transactions`}>
                <div className={`wallet-transactions__head${transaction.data && transaction.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                    <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                    <div className="wallet-transactions__header wallet-transactions__header--name">{t('transaction name')}</div>
                    <div className="wallet-transactions__header wallet-transactions__header--balance-change">{t('balance change')}</div>
                    <div className="wallet-transactions__header wallet-transactions__header--end-balance">{t('end balance')}</div>
                </div>
                {transaction.data && transaction.data.meta.total > 0 &&
                    transaction.data.data.map((r, i) => {
                        return <TransactionRecord
                            record={r}
                            key={i}
                            timezone={timezone}
                            t={t}
                            wallet={this.props.wallet}
                        />
                    })
                }
            </div>
        )
    }
}

Transactions.propTypes = {
    transaction: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
    wallet: PropTypes.object.isRequired,
}

export default Transactions