import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import R from "ramda"
import moment from "moment/moment"
import GoogleAnalytics from "react-ga"

import DepositActions from '../../Redux/DepositRedux'
import i18n from '../../i18n'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import DepositForm from '../../Components/Form/Deposit'
import DepositRecord from '../../Components/Account/Record/Deposit'
import {flattenDepositMethods, flattenWallet} from "../../helper"
import FilterSectionFactory from "../../Components/Filter/FilterSectionFactory"
import ABSpinner from "../../Components/ABSpinner"
import Paginate from "../../Components/Paginate"
import CheckoutActions from '../../Redux/CheckoutRedux'
import PaymentIframe from "../../Components/PaymentIframe"

const FILTER_SLUGS = [
    'min_amount',
    'max_amount',
    'start_time',
    'end_time',
    'method',
    'wallet',
    'sort',
]
const MAX = moment().utcOffset(8).endOf('day'),
    MIN = moment().utcOffset(8).add(-process.env.REACT_APP_RECORD_MAX_DAYS * 4, 'days').startOf('day')

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
class Deposit extends React.Component {
    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('deposit')
        })
    }

    constructor(props) {
        super(props)
        this.couponCode = props.location.state ? props.location.state.couponCode : null;  //Link state传入的coupon对象
        this.state = {
            params: queryString.parse(this.props.location.search),
            isOpen: props.location.hash === '#deposit',
            filters: [
                {
                    title: 'method',
                    slug: 'method',
                    choices: !!this.props.deposit.method ? flattenDepositMethods(this.props.deposit.method, i18n.language) : [],
                    is_grouped: false,
                    is_multichoice: true,
                },
                {
                    title: 'wallet',
                    slug: 'wallet',
                    choices: !!this.props.wallet.main ? flattenWallet(this.props.wallet) : [],
                    is_grouped: false,
                    is_multichoice: true,
                },
            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.deposit.method && nextProps.deposit.method) {
            let filters = R.concat(this.state.filters, [])
            filters[0].choices = flattenDepositMethods(nextProps.deposit.method, i18n.language)
            this.setState({
                filters: filters,
            })
        }
        if (!this.props.wallet.main && nextProps.wallet.main) {
            let filters = R.concat(this.state.filters, [])
            filters[1].choices = flattenWallet(nextProps.wallet, i18n.language)
            this.setState({
                filters: filters,
            })
        }
        if (this.props.deposit.submitting && !nextProps.deposit.submitting && !nextProps.deposit.addError) {
            this.closeModal()
        }
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
            }, () => this.updateUrl('replace'))
        }
        else {
            !!this.state.params.page && !!this.state.params.start_time && !!this.state.params.end_time && !this.props.deposit.fetching && this.doQuery()
        }
        !this.props.deposit.methodFetching && !this.props.deposit.method && this.props.getMethods()
    }

    componentDidUpdate(prevProps) {
        if (!this.props.location.search) {
            this.setState({
                params: DEFAULT_PARAMS,
                isOpen: this.props.location.hash === '#deposit',
            }, () => {
                this.updateUrl('replace')
            })
        }
        else if (this.props.location.search !== prevProps.location.search) {
            this.doQuery()
        }
    }

    updateUrl = (type) => {
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params) + (this.state.isOpen ? '#deposit' : '')
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
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

        this.setState({
            params: params,
        }, () => this.updateUrl())
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

    doQuery = () => {
        this.props.getDeposits(this.state.params)
    }

    getWallet = (code) => {
        if (code === 'MAIN') {
            return this.props.wallet.main.wallet
        }
        return this.props.wallet.other.find(w => w.wallet.code === code)['wallet']
    }

    closeModal = () => {
        this.setState({isOpen: false}, () => this.updateUrl())
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen}, () => {
            this.updateUrl()
            this.state.isOpen && GoogleAnalytics.modalview('/account/deposit')
        })
    }

    closePayment = () => {
        this.props.checkoutSuccess()
    }

    render() {
        const {t, profile, deposit, checkout} = this.props
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('deposit')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                {this.state.isOpen && <DepositForm
                    t={t}
                    isOpen={this.state.isOpen}
                    onClose={this.closeModal}
                    couponCode = {this.couponCode}
                />}
                {!deposit.submitting && checkout.data && <PaymentIframe
                    param={checkout.data}
                    onClose={this.closePayment}
                />}
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.state.filters}
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
                        isLoading={deposit.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf has-btn">
                    <h1 className={`header__title`}>
                        {t('Deposit records')}
                        {!!profile.data &&
                        <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} isFiltered={this.isFiltered()}/>
                    <div className={`btn btn--green relief-button`} onClick={this.toggleModal}>
                        <div className={`ic${this.state.isOpen ? ' icon-close2' : ' icon-thin-plus'}`}/>
                        {' '}
                        {t('deposit')}
                    </div>
                </div>
                <ABSpinner
                    hidden={!((!deposit.data || (!!deposit.data && deposit.data.meta.total === 0)) && deposit.fetching)}
                    size={'big'}
                />
                <div className={`wallet-transactions`}>
                    <div
                        className={`wallet-transactions__head${deposit.data && deposit.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                        <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                        <div
                            className="wallet-transactions__header wallet-records__header--game">{t('transaction name')}</div>
                        <div className="wallet-transactions__header wallet-records__header--bet">{t('Amount')}</div>
                        <div
                            className="wallet-transactions__header wallet-records__header--payout wallet-deposit__header--status">{t('status')}</div>
                    </div>
                    {!!deposit.data && deposit.data.meta.total > 0 && deposit.data.data.map((d, i) => {
                        return <DepositRecord
                            t={t}
                            record={d}
                            key={i}
                            timezone={profile.data.timezone}
                            wallet={!!this.props.wallet.main ? this.getWallet(d.destination) : null}
                        />
                    })}
                </div>
                <div
                    className={`container list__message${deposit.fetching || (!deposit.fetching && !deposit.error && !!deposit.data && deposit.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={deposit.data ? deposit.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={parseInt(this.state.params.page)}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Deposit.propTypes = {
    deposit: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    wallet: PropTypes.object.isRequired,
    getMethods: PropTypes.func.isRequired,
    getDeposits: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        deposit: state.deposit,
        profile: state.profile,
        wallet: state.wallet,
        checkout: state.checkout,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMethods: () => dispatch(DepositActions.methodRequest()),
    getDeposits: (params) => dispatch(DepositActions.depositRequest(params)),
    checkoutSuccess: () => dispatch(CheckoutActions.checkoutSuccess()),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Deposit))