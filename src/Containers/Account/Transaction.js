import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from "react-helmet"
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import queryString from "query-string"
import R from "ramda"
import moment from "moment/moment"
import GoogleAnalytics from 'react-ga'

import TransactionActions from "../../Redux/TransactionRedux"
import Transactions from "../../Components/Account/Transactions"
import ABSpinner from "../../Components/ABSpinner"
import Paginate from "../../Components/Paginate"
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import FilterSectionFactory from '../../Components/Filter/FilterSectionFactory'
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import {flattenWallet} from "../../helper"

const FILTER_SLUGS = [
    'service',
    'min_amount',
    'max_amount',
    'start_time',
    'end_time',
    'sort',
    'wallet',
]

const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')

const DEFAULT_PARAMS = {
    page: 1,
    sort: 'created_at.desc',
    start_time: MIN.format(process.env.REACT_APP_TIME_FORMAT),
    end_time: MAX.format(process.env.REACT_APP_TIME_FORMAT),
}

const INPUTRANGES = [
    {
        slug: 'amount',
        title: 'Amount',
    }
]

/**
 * @todo: subtotal, currencySymbolAfter
 */
class Transaction extends React.Component {

    state = {
        params: queryString.parse(this.props.location.search),
    }

    FILTERS = [
        {
            title: 'Category',
            slug: 'service',
            choices: [
                {
                    title: 'deposit',
                    slug: 'deposit',
                },
                {
                    title: 'withdraw',
                    slug: 'withdraw',
                },
                {
                    title: 'transfer',
                    slug: 'transfer',
                },
                {
                    title: 'coupon',
                    slug: 'coupon',
                },
                {
                    title: 'relief',
                    slug: 'relief',
                },
                {
                    title: 'rebate',
                    slug: 'rebate',
                },
                {
                    title: 'bigwin',
                    slug: 'bigwin',
                },
                {
                    title: 'SPORTS',
                    slug: 'nb',
                },
            ],
            is_grouped: false,
            is_multichoice: true,
        },
        {
            title: 'wallet',
            slug: 'wallet',
            choices: flattenWallet(this.props.wallet),
            is_grouped: false,
            is_multichoice: false,
        }
    ]

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('transactions')
        })
    }

    componentDidMount() {
        if (!this.state.params.page || !this.state.params.start_time || !this.state.params.end_time || !this.state.params.sort) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: this.state.params.page ? this.state.params.page : 1,
                    start_time: this.state.params.start_time ? this.state.params.start_time : DEFAULT_PARAMS.start_time,
                    end_time: this.state.params.end_time ? this.state.params.end_time : DEFAULT_PARAMS.end_time,
                    sort: this.state.params.sort ? this.state.params.sort : DEFAULT_PARAMS.sort,
                }
            }, () => {
                this.updateUrl('replace')
            })
        } else {
            !this.props.transaction.fetching && this.doQuery()
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.location.search) {
            this.setState({
                params: DEFAULT_PARAMS,
            }, () => {
                this.updateUrl('replace')
            })
        }
        else if (this.props.location.search !== prevProps.location.search) {
            this.doQuery()
        }
    }

    updateUrl = (type) => {
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params)
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
        }
    }

    onPageChange = (p) => {
        if (p !== parseInt(this.state.params.page) && p > 0) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: p,
                },
            }, () => this.updateUrl())
        }
    }

    clearFilters = () => {
        this.setState({
            params: DEFAULT_PARAMS,
        }, () => {
            this.refs['filter'].reset()
            this.updateUrl()
        })
    }

    isFiltered = () => {
        return FILTER_SLUGS.filter((f) => {
            if (f === 'sort') {
                return !!this.state.params[f] && this.state.params[f] !== 'created_at.desc'
            }
            if (f === 'start_time' || f === 'end_time') {
                return this.state.params[f] && this.state.params[f] !== DEFAULT_PARAMS[f]
            }
            return Object.keys(this.state.params).includes(f)
        }).length > 0
    }

    onFilterChange = (filter) => {
        let params = R.merge(this.state.params, {})

        if (filter.slug === 'amount') {
            if (filter.selected[0]) {
                params['min_' + filter.slug] = filter.selected[0]
            } else {
                delete params['min_' + filter.slug]
            }
            if (filter.selected[1]) {
                params['max_' + filter.slug] = filter.selected[1]
            } else {
                delete params['max_' + filter.slug]
            }
        } else if (filter.slug === 'time') {
            if (filter.selected[0]) {
                params['start_' + filter.slug] = filter.selected[0]
            } else {
                delete params['start_' + filter.slug]
            }
            if (filter.selected[1]) {
                params['end_' + filter.slug] = filter.selected[1]
            } else {
                delete params['end_' + filter.slug]
            }
        } else {
            params[filter.slug] = filter.selected
            filter.selected.length > 0 ? params[filter.slug] = filter.selected.join(',') : delete params[filter.slug]
        }
        params.page = DEFAULT_PARAMS.page
        this.setState({
            params: params,
        }, () => this.updateUrl())
    }

    doQuery = () => {
        window.scrollTo(0, 0)
        this.props.getTransactions(this.state.params)
    }

    render(){
        const {t, transaction, profile} = this.props;
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('transactions')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.FILTERS}
                        inputRanges={INPUTRANGES}
                        timeRange={{
                            slug: 'time',
                            withTime: true,
                            available: [MIN, MAX],
                        }}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this.onFilterChange}
                        ref={'filter'}
                        isLoading={transaction.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf">
                    <h1 className={`header__title`}>
                        {t('transactions')}
                        {!!profile.data &&
                        <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton
                        clearFunc={this.clearFilters}
                        isFiltered={this.isFiltered()}
                    />
                </div>
                <ABSpinner
                    hidden={!((!transaction.data || (!!transaction.data && transaction.data.meta.total === 0)) && transaction.fetching)}
                    size={'big'}
                />
                {
                    !!profile.data &&
                    <Transactions
                        t={t}
                        transaction={transaction}
                        timezone={profile.data.timezone}
                        wallet={this.props.wallet}
                    />
                }
                <div
                    className={`container list__message${!!transaction.data ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={transaction.data ? transaction.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={parseInt(this.state.params.page)}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Transaction.propTypes = {
    auth: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    wallet: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        config: state.config,
        transaction: state.transaction,
        wallet: state.wallet,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => dispatch(TransactionActions.transactionRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Transaction))