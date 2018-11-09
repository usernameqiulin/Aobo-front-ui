import React from 'react'
import PropTypes from 'prop-types'
import {amountFormat} from "../helper"

class ABRank extends React.Component {


    render() {
        const {t, rank, currency} = this.props

        return (
            <div className="rank-wrapper">
                <div className={`rank-header`}>
                    <div className={`rank-header__icon ${rank.code.toLowerCase()}`}/>
                    <div className={`rank-header__menu`}>
                        <span className="rank-header__btn is-active">
                            <span className={`rank-header__text`}>{t(rank.code)}</span>
                        </span>
                    </div>
                </div>
                <div className={`rank-row`}>
                    <div className={`rank-text-content`}>
                        <ul>
                            {rank.conditions[currency].upgrading.map((u, i) => {
                                switch (u.designation) {
                                    case 'deposit':
                                        return <li key={i}>{t('Monthly total deposit amount')}{t(u.comparison)} <span className={`_price highlight`}>{amountFormat(parseFloat(u.value))}</span></li>
                                    case 'bets':
                                        return <li key={i}>{t('Monthly valid bet amount')}{t(u.comparison)} <span className={`_price highlight`}>{amountFormat(parseFloat(u.value))}</span></li>
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className={`rank-row`}>
                    <div className={`rank-text-content`}>
                        <ul>
                            {rank.conditions[currency].grading.map((u, i) => {
                                switch (u.designation) {
                                    case 'deposit':
                                        return <li key={i}>{t('Monthly total deposit amount')}{t(u.comparison)} <span className={`_price highlight`}>{amountFormat(parseFloat(u.value))}</span></li>
                                    case 'bets':
                                        return <li key={i}>{t('Monthly valid bet amount')}{t(u.comparison)} <span className={`_price highlight`}>{amountFormat(parseFloat(u.value))}</span></li>
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className={`rank-row`}>
                    <div className={`rank-text-content`}>
                        <ul>
                            {rank.treatments[currency].map((tt, i) => {
                                let status
                                switch (tt.type) {
                                    case 'boolean':
                                        status = tt.value === 'false' ? ' - ' : <svg className={`stretch-goals__icon stretch-goals__icon--tick`}><use xlinkHref="#icon-tick"/></svg>
                                        break
                                    case 'amount':
                                        status = <span className={`_price`}>{amountFormat(parseFloat(tt.value))}</span>
                                        break
                                    case 'coupon':
                                        status = <span className={`_price`}>{amountFormat(parseFloat(tt.value))}</span>
                                        break
                                    default:
                                        status = t(tt.value)
                                        break
                                }
                                return (
                                    <li key={i}>
                                        {t(tt.designation)}
                                        <span className={`status`}>{status}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

ABRank.propTypes = {
    rank: PropTypes.object.isRequired,
}

export default ABRank