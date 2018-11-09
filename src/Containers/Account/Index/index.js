/**
 * Created by darkmoon on 7/7/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {translate} from "react-i18next"
import {Helmet} from "react-helmet"
import {Link} from "react-router-dom"
import GoogleAnalytics from 'react-ga'

import './index.css'

import Transactions from "../../../Components/Account/Transactions"
import TransactionActions from "../../../Redux/TransactionRedux"
import RecentActions from '../../../Redux/RecentRedux'
import {flattenFavorite, getCurrencyDetail} from "../../../helper"
// import ABSpinner from "../../../Components/ABSpinner"
import Recent from "./Recent"

class Index extends Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming')
        })
    }

    componentDidMount() {
        !this.props.transaction.fetching && !this.props.transaction.data && this.props.getTransactions({})
    }

    render() {
        const {t, config, profile} = this.props

        return (
            <div className="wallet">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')}</title>
                </Helmet>
                <section className="wallet-content">
                    <div className="container account">
                        <Recent/>
                        {/* ng-cloak ng-show="transactions.list[wallet.selectedCurrency].length || transactions.processing[wallet.selectedCurrency]"*/}
                        <div className={`${!!this.props.transaction.data && this.props.transaction.data.data !== null && this.props.transaction.data.data.length > 0 ? '' : 'ng-hide'}`}>
                            <div className="module-header wallet__module-header cf">
                                <h1 className={`header__title`}>
                                    {t('Recent transactions')}
                                    {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                                </h1>
                                <i className={`wallet__spinner is-spinning${!this.props.transaction.data && this.props.transaction.fetching ? '' : ' ng-hide'}`}/>
                            </div>
                            {!!config.data && !!profile.data && <Transactions
                                t={t}
                                currency={profile.data.currency}
                                transaction={this.props.transaction}
                                currencySymbolAfter={!!getCurrencyDetail(profile.data.currency, config.data.currencies).symbol_after}
                                timezone={config.data.timezone}
                                wallet={this.props.wallet}
                            
                            />}
                            {/* ng-show="(transactions.count[wallet.selectedCurrency] > transactions.perPage) && (transactions.list[wallet.selectedCurrency].length < transactions.count[wallet.selectedCurrency])" */}
                            {this.props.transaction.data && this.props.transaction.data.meta.last_page > 1 && <div className="wallet-transactions__more">
                                <Link to="/account/transactions" className="wallet-load-more">
                                    {/*<i className={`wallet__spinner is-spinning${this.props.transaction.data && this.props.transaction.fetching ? '' : ' ng-hide'}`}/>*/}
                                    <span className={`${this.props.transaction.data && !this.props.transaction.fetching ? '' : ' ng-hide'}`}>
                                        {t('Load more history')}
                                        {/*<img srcSet={require('../../../images/d-arrow_x1.png') + ", " + require('../../../images/d-arrow_x2.png') + " 2x"} className="wallet-load-more__icon"/>*/}
                                    </span>
                                </Link>
                            </div>}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Index.propTypes = {
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
    recent: PropTypes.object.isRequired,
    wallet: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
    getRecent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        config: state.config,
        profile: state.profile,
        transaction: state.transaction,
        recent: state.recent,
        favorite: state.favorite,
        wallet: state.wallet,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => dispatch(TransactionActions.transactionRequest(params)),
    getRecent: () => dispatch(RecentActions.recentRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Index))