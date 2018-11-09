import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import moment from "moment/moment"
import R from "ramda"
import GoogleAnalytics from "react-ga"

import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import TransferForm from '../../Components/Form/Transfer'
import TransferActions from '../../Redux/TransferRedux'
import ABModal from "../../Components/ABModal"
import FilterSectionFactory from "../../Components/Filter/FilterSectionFactory"
import {flattenWallet} from "../../helper"
import i18n from "../../i18n"
import ABSpinner from "../../Components/ABSpinner"
import TransferRecord from '../../Components/Account/Record/Transfer'
import Paginate from "../../Components/Paginate"

const FILTER_SLUGS = [
    'min_amount',
    'max_amount',
    'start_time',
    'end_time',
    'source_wallet',
    'destination_wallet',
    'sort',
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

class Transfer extends React.Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('transfer')
        })
    }

    constructor(props) {
        super(props);
        this.couponCode = props.location.state ? props.location.state.couponCode : null;   //Link state 传入的coupon对象
        this.state = {
            params: queryString.parse(props.location.search),
            isOpen: props.location.hash === '#transfer',
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
            !!this.state.params.page && !!this.state.params.start_time && !!this.state.params.end_time && !this.props.transfer.fetching && this.doQuery()
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.location.search) {
            this.setState({
                params: DEFAULT_PARAMS,
                isOpen: this.props.location.hash === '#transfer',
            }, () => {
                this.updateUrl('replace')
            })
        }
        else if (this.props.location.search !== prevProps.location.search) {
            this.doQuery()
        }
    }

    FILTERS = [
        {
            title: 'Source wallet',
            slug: 'source_wallet',
            choices: flattenWallet(this.props.wallet, i18n.language),
            is_grouped: false,
            is_multichoice: false,
        },
        {
            title: 'Destination wallet',
            slug: 'destination_wallet',
            choices: flattenWallet(this.props.wallet, i18n.language),
            is_grouped: false,
            is_multichoice: false,
        },
    ]

    updateUrl = (type) => {
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params) + (this.state.isOpen ? '#transfer' : '')
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
        // window.scrollTo(0, 0)
        this.props.getTransfers(this.state.params)
    }

    closeModal = () => {
        this.setState({isOpen: false}, ()=>this.updateUrl())
    }

    openModal = () => {
        this.setState({isOpen: true}, ()=>{
            this.updateUrl()
            GoogleAnalytics.modalview('/account/transfer')
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.transfer.submitting && !nextProps.transfer.submitting && !nextProps.transfer.submitError) {
            this.closeModal()
        }
    }

    render() {
        const {t, profile, transfer} = this.props
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('transfer')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <ABModal
                    onClose={this.closeModal}
                    closeOnEsc={true}
                    open={this.state.isOpen}
                    classes={{modal: 'modal-overlay', overlay: 'dim'}}
                    closeOnOverlayClick={true}
                    dark
                >
                    <TransferForm couponCode={this.couponCode}/>
                </ABModal>
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
                        isLoading={transfer.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf has-btn">
                    <h1 className={`header__title`}>
                        {t('Transfer records')}
                        {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} isFiltered={this.isFiltered()}/>
                    <div className={`btn btn--green relief-button`} onClick={this.openModal}>
                        <div className="ic icon-thin-plus"/>
                        {' '}
                        {t('transfer')}
                    </div>
                </div>
                <ABSpinner hidden={!((!transfer.data || (!!transfer.data && transfer.data.meta.total === 0)) && transfer.fetching)} size={'big'}/>
                <div className={`wallet-transactions${!!transfer.data && transfer.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                    <div className={`wallet-transactions__head`}>
                        <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--balance-change">{t('Amount')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--name">{t('transaction name')}</div>
                    </div>
                    {
                        transfer.data && transfer.data.meta.total > 0 && transfer.data.data.map((r, i) => {
                            return <TransferRecord
                                record={r}
                                key={i}
                                timezone={profile.data.timezone}
                                language={i18n.language}
                                wallet={this.props.wallet}
                            />
                        })
                    }
                </div>
                <div className={`container list__message${transfer.fetching || (!transfer.fetching && !transfer.error && !!transfer.data && transfer.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={transfer.data ? transfer.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={parseInt(this.state.params.page)}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Transfer.propTypes = {
    profile: PropTypes.object.isRequired,
    transfer: PropTypes.object.isRequired,
    wallet: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        transfer: state.transfer,
        wallet: state.wallet,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTransfers: (params) => dispatch(TransferActions.transferRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Transfer))